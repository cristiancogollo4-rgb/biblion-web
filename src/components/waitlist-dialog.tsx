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
import { ArrowRight, CheckCircle2, X } from "lucide-react";

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
  consent: false,
};

export function WaitlistForm({
  source,
  compact = false,
  onSuccess,
}: WaitlistFormProps) {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

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
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "No pudimos registrar tu solicitud.");
      }

      setState("success");
      setMessage(
        "Tu registro quedó guardado. Te contactaremos cuando abramos una etapa de pruebas compatible."
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
          onChange={(event) => updateField("email", event.target.value)}
          required
          type="email"
          value={form.email}
        />
      </label>
      <label>
        Dispositivo o versión de Android
        <input
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
      <label className="waitlist-consent waitlist-field-wide">
        <input
          checked={form.consent}
          name="consent"
          onChange={(event) => updateField("consent", event.target.checked)}
          required
          type="checkbox"
        />
        <span>
          Acepto que BIBLION utilice mi correo para gestionar las pruebas y
          enviarme novedades relacionadas. Puedo solicitar mi retiro cuando quiera.
          {" "}
          <Link href="/privacidad">Ver política de privacidad.</Link>
        </span>
      </label>
      <button
        className="waitlist-submit waitlist-field-wide"
        disabled={state === "sending"}
        type="submit"
      >
        {state === "sending" ? "Registrando..." : "Quiero participar"}
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
  const firstControlRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <button
        className={className}
        onClick={() => setOpen(true)}
        ref={firstControlRef}
        type="button"
      >
        {children}
      </button>

      {open ? (
        <div
          className="waitlist-modal-backdrop"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setOpen(false);
          }}
          role="presentation"
        >
          <section
            aria-labelledby={titleId}
            aria-modal="true"
            className="waitlist-modal"
            role="dialog"
          >
            <button
              aria-label="Cerrar formulario"
              autoFocus
              className="waitlist-modal-close"
              onClick={() => {
                setOpen(false);
                firstControlRef.current?.focus();
              }}
              type="button"
            >
              <X size={21} />
            </button>
            <div className="waitlist-modal-copy">
              <span>ACCESO ANTICIPADO</span>
              <h2 id={titleId}>Sé parte de las primeras pruebas.</h2>
              <p>
                El registro no instala la aplicación ni garantiza una invitación
                inmediata. Abriremos el acceso progresivamente para Android.
              </p>
            </div>
            <WaitlistForm source={source} compact />
          </section>
        </div>
      ) : null}
    </>
  );
}
