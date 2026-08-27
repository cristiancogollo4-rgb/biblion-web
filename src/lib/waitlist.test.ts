import { describe, expect, it } from "vitest";
import {
  createWaitlistSubmission,
  escapeSpreadsheetFormula,
  validateWaitlistPayload,
} from "@/lib/waitlist";

const validPayload = {
  fullName: "Lector BIBLION",
  email: "lector@example.com",
  androidDevice: "Android 15",
  role: "estudio-profundo",
  source: "tests",
  consent: true,
  website: "",
};

describe("validateWaitlistPayload", () => {
  it("normaliza un registro válido", () => {
    const result = validateWaitlistPayload({
      ...validPayload,
      fullName: "  Lector BIBLION  ",
      email: "LECTOR@EXAMPLE.COM ",
    });

    expect(result).toEqual({
      ok: true,
      data: {
        fullName: "Lector BIBLION",
        email: "lector@example.com",
        androidDevice: "Android 15",
        role: "estudio-profundo",
        source: "tests",
        website: "",
      },
    });
  });

  it.each(["no-es-email", "usuario@", "@example.com", "usuario example.com"])(
    "rechaza el correo %s",
    (email) => {
      expect(validateWaitlistPayload({ ...validPayload, email }).ok).toBe(false);
    },
  );

  it("exige consentimiento explícito", () => {
    const result = validateWaitlistPayload({ ...validPayload, consent: false });
    expect(result).toEqual({
      ok: false,
      message: "Debes aceptar la política de privacidad.",
    });
  });

  it("rechaza roles manipulados", () => {
    expect(validateWaitlistPayload({ ...validPayload, role: "admin" }).ok).toBe(false);
  });
});

describe("seguridad para Google Sheets", () => {
  it.each(["=SUM(A1:A2)", "+1+1", "-2+3", "@IMPORTXML()"])(
    "neutraliza fórmulas: %s",
    (value) => {
      expect(escapeSpreadsheetFormula(value)).toBe(`'${value}`);
    },
  );

  it("recorta el user agent antes de enviarlo", () => {
    const validation = validateWaitlistPayload(validPayload);
    expect(validation.ok).toBe(true);
    if (!validation.ok) return;

    const submission = createWaitlistSubmission(validation.data, "a".repeat(400));
    expect(submission.userAgent).toHaveLength(240);
  });
});
