import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/waitlist/route";

const endpoint = "http://localhost:3000/api/waitlist";

function request(payload: object, headers: HeadersInit = {}) {
  return new Request(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `test-${Math.random()}`,
      ...headers,
    },
    body: JSON.stringify(payload),
  });
}

const validPayload = {
  fullName: "Lector BIBLION",
  email: "lector@example.com",
  androidDevice: "Android 15",
  role: "lectura-devocional",
  motivation: "Leo la Biblia a diario y quiero evaluar la experiencia sin conexión.",
  source: "api-tests",
  consent: true,
  website: "",
};

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    process.env.GOOGLE_SHEETS_WEBHOOK_URL = "https://example.com/webhook";
    delete process.env.GOOGLE_CHAT_WEBHOOK_URL;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 200 })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("rechaza correos inválidos sin llamar al webhook", async () => {
    const response = await POST(request({ ...validPayload, email: "no-es-email" }));
    expect(response.status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("rechaza solicitudes desde otro origen", async () => {
    const response = await POST(
      request(validPayload, { Origin: "https://sitio-malicioso.example" }),
    );
    expect(response.status).toBe(403);
  });

  it("ignora silenciosamente el honeypot", async () => {
    const response = await POST(request({ ...validPayload, website: "spam.example" }));
    expect(response.status).toBe(200);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("envía un registro válido normalizado", async () => {
    const response = await POST(request({ ...validPayload, email: "LECTOR@EXAMPLE.COM" }));
    expect(response.status).toBe(200);
    expect(fetch).toHaveBeenCalledOnce();

    const options = vi.mocked(fetch).mock.calls[0][1];
    const body = JSON.parse(String(options?.body)) as { email: string; motivation: string };
    expect(body.email).toBe("lector@example.com");
    expect(body.motivation).toContain("experiencia sin conexión");
  });

  it("envía al webhook directo de Google Chat un mensaje de texto completo", async () => {
    delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    process.env.GOOGLE_CHAT_WEBHOOK_URL = "https://chat.googleapis.com/v1/spaces/test/messages";

    const response = await POST(request(validPayload));
    expect(response.status).toBe(200);
    expect(fetch).toHaveBeenCalledOnce();

    const [url, options] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe(process.env.GOOGLE_CHAT_WEBHOOK_URL);
    const body = JSON.parse(String(options?.body)) as { text: string };
    expect(body.text).toContain("Nombre: Lector BIBLION");
    expect(body.text).toContain("Correo: lector@example.com");
    expect(body.text).toContain("Uso principal: Lectura devocional");
    expect(body.text).toContain("Perfil y motivación:");
  });

  it("informa cuando el webhook no está disponible", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("timeout"));
    const response = await POST(request(validPayload));
    expect(response.status).toBe(504);
  });
});
