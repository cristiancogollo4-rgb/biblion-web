export const WAITLIST_LIMITS = {
  fullName: 80,
  email: 254,
  androidDevice: 80,
  role: 40,
  source: 80,
  userAgent: 240,
} as const;

const allowedRoles = new Set([
  "",
  "lectura-devocional",
  "estudio-profundo",
  "ensenanza",
  "otro",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

export type WaitlistPayload = {
  fullName?: unknown;
  email?: unknown;
  androidDevice?: unknown;
  role?: unknown;
  consent?: unknown;
  source?: unknown;
  website?: unknown;
};

export type ValidWaitlistPayload = {
  fullName: string;
  email: string;
  androidDevice: string;
  role: string;
  source: string;
  website: string;
};

export type WaitlistValidation =
  | { ok: true; data: ValidWaitlistPayload }
  | { ok: false; message: string };

const toTrimmedString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export function validateWaitlistPayload(payload: WaitlistPayload): WaitlistValidation {
  const fullName = toTrimmedString(payload.fullName);
  const email = toTrimmedString(payload.email).toLowerCase();
  const androidDevice = toTrimmedString(payload.androidDevice);
  const role = toTrimmedString(payload.role);
  const source = toTrimmedString(payload.source) || "unknown";
  const website = toTrimmedString(payload.website);

  if (fullName.length < 2 || fullName.length > WAITLIST_LIMITS.fullName) {
    return { ok: false, message: "Escribe un nombre o alias válido." };
  }

  if (email.length > WAITLIST_LIMITS.email || !emailPattern.test(email)) {
    return { ok: false, message: "Escribe un correo electrónico válido." };
  }

  if (payload.consent !== true) {
    return { ok: false, message: "Debes aceptar la política de privacidad." };
  }

  if (
    androidDevice.length > WAITLIST_LIMITS.androidDevice ||
    role.length > WAITLIST_LIMITS.role ||
    source.length > WAITLIST_LIMITS.source
  ) {
    return { ok: false, message: "Uno de los campos supera la longitud permitida." };
  }

  if (!allowedRoles.has(role)) {
    return { ok: false, message: "Selecciona un uso principal válido." };
  }

  return {
    ok: true,
    data: { fullName, email, androidDevice, role, source, website },
  };
}

export function escapeSpreadsheetFormula(value: string) {
  return /^[=+\-@]/u.test(value) ? `'${value}` : value;
}

export function createWaitlistSubmission(
  data: ValidWaitlistPayload,
  userAgent: string,
) {
  return {
    submittedAt: new Date().toISOString(),
    fullName: escapeSpreadsheetFormula(data.fullName),
    email: data.email,
    androidDevice: escapeSpreadsheetFormula(data.androidDevice),
    role: data.role,
    source: escapeSpreadsheetFormula(data.source),
    userAgent: userAgent.slice(0, WAITLIST_LIMITS.userAgent),
  };
}
