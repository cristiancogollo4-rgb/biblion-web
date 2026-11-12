"use client";

import Link from "next/link";
import {
  FormEvent,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { ArrowRight, CheckCircle2, ChevronDown, X } from "lucide-react";
import { WAITLIST_LIMITS } from "@/lib/waitlist";

type WaitlistTriggerProps = {
  children: ReactNode;
  className?: string;
  source: string;
};

type WaitlistFormProps = {
  source: string;
  compact?: boolean;
  onSuccess?: () => void;
};

type SubmitState = "idle" | "sending" | "success" | "error";

const initialForm = {
  fullName: "",
  email: "",
  androidDevice: "",
  role: "",
  motivation: "",
  consent: false,
  website: "",
};

export function WaitlistForm({
  source,
  compact = false,
  onSuccess,
}: WaitlistFormProps) {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [showOptional, setShowOptional] = useState(false);

  const updateField = (
    field: keyof typeof initialForm,
    value: string | boolean
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitWaitlist = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      const data = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(data?.message ?? "No pudimos registrar tu solicitud.");
      }

      setState("success");
      setMessage(
        "Tu registro quedó guardado. Te contactaremos cuando abramos una etapa de pruebas de BIBLION App compatible."
      );
      setForm(initialForm);
      onSuccess?.();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "No pudimos registrar tu solicitud. Intenta nuevamente."
      );
    }
  };

  if (state === "success") {
    return (
      <div className="waitlist-success" role="status">
        <CheckCircle2 size={32} />
        <strong>Registro completado</strong>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <form
      className={compact ? "waitlist-form is-compact" : "waitlist-form"}
      onSubmit={submitWaitlist}
    >
      <label>
        Nombre o alias
        <input
          autoComplete="name"
          name="fullName"
          maxLength={WAITLIST_LIMITS.fullName}
          onChange={(event) => updateField("fullName", event.target.value)}
          required
          value={form.fullName}
        />
      </label>
      <label>
        Correo electrónico
        <input
          autoComplete="email"
          name="email"
          maxLength={WAITLIST_LIMITS.email}
          onChange={(event) => updateField("email", event.target.value)}
          required
          type="email"
          value={form.email}
        />
      </label>
      <button
        aria-expanded={showOptional}
        className="waitlist-optional-toggle waitlist-field-wide"
        onClick={() => setShowOptional((current) => !current)}
        type="button"
      >
        Añadir información opcional
        <ChevronDown aria-hidden="true" size={17} />
      </button>
      <div
        className={
          showOptional
            ? "waitlist-optional-fields is-visible"
            : "waitlist-optional-fields"
        }
      >
        <label>
          Dispositivo o versión de Android
          <input
            maxLength={WAITLIST_LIMITS.androidDevice}
            name="androidDevice"
            onChange={(event) => updateField("androidDevice", event.target.value)}
            placeholder="Opcional"
            value={form.androidDevice}
          />
        </label>
        <label>
          Uso principal
          <select
            name="role"
            onChange={(event) => updateField("role", event.target.value)}
            value={form.role}
          >
            <option value="">Opcional</option>
            <option value="lectura-devocional">Lectura devocional</option>
            <option value="estudio-profundo">Estudio profundo</option>
            <option value="ensenanza">Enseñanza o predicación</option>
            <option value="otro">Otro</option>
          </select>
        </label>
      </div>
      <label className="waitlist-field-wide waitlist-motivation">
        Cuéntanos sobre ti y por qué quieres probar BIBLION
        <textarea
          maxLength={WAITLIST_LIMITS.motivation}
          minLength={20}
          name="motivation"
          onChange={(event) => updateField("motivation", event.target.value)}
          placeholder="Ej.: Soy pastor y preparo enseñanzas cada semana; me interesa probar el modo estudio y compartir observaciones del proceso."
          required
          rows={4}
          value={form.motivation}
        />
        <span className="waitlist-field-help">
          Esta información nos ayuda a seleccionar perfiles que puedan aportar durante las pruebas.
        </span>
      </label>
      <label className="waitlist-honeypot" aria-hidden="true">
        Sitio web
        <input
          autoComplete="off"
          name="website"
          onChange={(event) => updateField("website", event.target.value)}
          tabIndex={-1}
          value={form.website}
        />
      </label>
      <label className="waitlist-consent waitlist-field-wide">
        <input
          checked={form.consent}
          name="consent"
          onChange={(event) => updateField("consent", event.target.checked)}
          required
          type="checkbox"
        />
        <span>
          Acepto que BIBLION utilice mi correo para gestionar las pruebas de
          BIBLION App y enviarme novedades relacionadas. Puedo solicitar mi retiro
          cuando quiera.
          {" "}
          <Link href="/privacidad">Ver política de privacidad.</Link>
        </span>
      </label>
      <button
        className="waitlist-submit waitlist-field-wide"
        disabled={state === "sending"}
        type="submit"
      >
        {state === "sending" ? "Registrando..." : "Quiero probar BIBLION App"}
        <ArrowRight size={18} />
      </button>
      {message ? (
        <p className={`waitlist-message ${state}`} role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}

export function WaitlistTrigger({
  children,
  className,
  source,
}: WaitlistTriggerProps) {
  const titleId = useId();
  const descriptionId = useId();
  const firstControlRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleDialogKeys);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleDialogKeys);
      previousFocusRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        className={className}
        onClick={() => {
          previousFocusRef.current = document.activeElement as HTMLElement;
          setOpen(true);
        }}
        ref={firstControlRef}
        type="button"
      >
        {children}
      </button>

      {open
        ? createPortal(
            <div
              className="waitlist-modal-backdrop"
              onMouseDown={(event) => {
                if (event.currentTarget === event.target) setOpen(false);
              }}
              role="presentation"
            >
              <section
                aria-describedby={descriptionId}
                aria-labelledby={titleId}
                aria-modal="true"
                className="waitlist-modal"
                ref={dialogRef}
                role="dialog"
              >
                <button
                  aria-label="Cerrar formulario"
                  autoFocus
                  className="waitlist-modal-close"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  <X size={21} />
                </button>
                <div className="waitlist-modal-copy">
                  <span>ACCESO ANTICIPADO</span>
                  <h2 id={titleId}>Sé parte de las primeras pruebas de BIBLION App.</h2>
                  <p id={descriptionId}>
                    El registro no instala BIBLION App ni garantiza una invitación
                    inmediata. Abriremos el acceso progresivamente para Android.
                  </p>
                </div>
                <WaitlistForm source={source} compact />
              </section>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
