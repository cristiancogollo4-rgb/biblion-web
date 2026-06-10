import { NextResponse } from "next/server";

type WaitlistPayload = {
  fullName?: string;
  email?: string;
  whatsapp?: string;
  city?: string;
  role?: string;
  community?: string;
  reason?: string;
  consent?: boolean;
  source?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as WaitlistPayload;
    const requiredFields = [
      payload.fullName,
      payload.email,
      payload.role,
      payload.reason,
    ];

    if (
      requiredFields.some((value) => !value || !String(value).trim()) ||
      payload.consent !== true
    ) {
      return NextResponse.json(
        { message: "Completa los campos requeridos antes de enviar." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        {
          message:
            "El formulario está listo, pero todavía falta conectar Google Sheets.",
        },
        { status: 503 }
      );
    }

    const submission = {
      submittedAt: new Date().toISOString(),
      fullName: payload.fullName?.trim(),
      email: payload.email?.trim().toLowerCase(),
      whatsapp: payload.whatsapp?.trim() ?? "",
      city: payload.city?.trim() ?? "",
      role: payload.role?.trim(),
      community: payload.community?.trim() ?? "",
      reason: payload.reason?.trim(),
      source: payload.source?.trim() ?? "unknown",
      userAgent: request.headers.get("user-agent") ?? "",
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "No pudimos guardar tu solicitud en la lista de espera." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "No pudimos procesar tu solicitud." },
      { status: 500 }
    );
  }
}
