import { NextResponse } from "next/server";
import {
  createWaitlistSubmission,
  createGoogleChatMessage,
  type WaitlistPayload,
  validateWaitlistPayload,
} from "@/lib/waitlist";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8_192;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_REQUESTS = 5;
const localRateLimit = new Map<string, { count: number; expiresAt: number }>();

const json = (body: object, status = 200, headers?: HeadersInit) =>
  NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

async function checkDistributedRateLimit(key: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const redisKey = `biblion:waitlist:${key}`;
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", redisKey],
      ["EXPIRE", redisKey, Math.ceil(RATE_LIMIT_WINDOW_MS / 1_000), "NX"],
    ]),
    signal: AbortSignal.timeout(3_000),
    cache: "no-store",
  });

  if (!response.ok) return null;
  const result = (await response.json()) as Array<{ result?: number }>;
  return Number(result[0]?.result ?? 0) <= RATE_LIMIT_REQUESTS;
}

async function isRateLimitAllowed(key: string) {
  try {
    const distributedResult = await checkDistributedRateLimit(key);
    if (distributedResult !== null) return distributedResult;
  } catch {
    // The local limiter remains available if the optional remote store is down.
  }

  const now = Date.now();
  const current = localRateLimit.get(key);
  if (!current || current.expiresAt <= now) {
    localRateLimit.set(key, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  current.count += 1;
  return current.count <= RATE_LIMIT_REQUESTS;
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return origin === new URL(request.url).origin;
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return json({ message: "Origen de solicitud no permitido." }, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ message: "El contenido debe enviarse como JSON." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ message: "La solicitud supera el tamaño permitido." }, 413);
  }

  let payload: WaitlistPayload;
  try {
    payload = (await request.json()) as WaitlistPayload;
  } catch {
    return json({ message: "La solicitud contiene datos inválidos." }, 400);
  }

  const validation = validateWaitlistPayload(payload);
  if (!validation.ok) {
    return json({ message: validation.message }, 400);
  }

  if (validation.data.website) {
    return json({ ok: true });
  }

  const clientIp = getClientIp(request);
  if (!(await isRateLimitAllowed(clientIp))) {
    return json(
      { message: "Has enviado varias solicitudes. Intenta nuevamente más tarde." },
      429,
      { "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1_000)) },
    );
  }

  const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const chatWebhookUrl = process.env.GOOGLE_CHAT_WEBHOOK_URL;
  if (!sheetsWebhookUrl && !chatWebhookUrl) {
    return json(
      { message: "El registro está temporalmente fuera de servicio." },
      503,
    );
  }

  const submission = createWaitlistSubmission(
    validation.data,
    request.headers.get("user-agent") ?? "",
  );

  try {
    const deliveries: Promise<Response>[] = [];

    if (sheetsWebhookUrl) {
      deliveries.push(
        fetch(sheetsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submission),
          signal: AbortSignal.timeout(8_000),
          cache: "no-store",
        }),
      );
    }

    if (chatWebhookUrl) {
      deliveries.push(
        fetch(chatWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify(createGoogleChatMessage(submission)),
          signal: AbortSignal.timeout(8_000),
          cache: "no-store",
        }),
      );
    }

    const responses = await Promise.all(deliveries);
    if (responses.some((response) => !response.ok)) {
      return json(
        { message: "No pudimos guardar tu solicitud en este momento." },
        502,
      );
    }

    return json({ ok: true });
  } catch {
    return json(
      { message: "El registro tardó demasiado. Intenta nuevamente." },
      504,
    );
  }
}
