"use client";

import { FormEvent, ReactNode, useId, useState } from "react";
import { ChevronRight, X } from "lucide-react";

type WaitlistTriggerProps = {
  children: ReactNode;
  className?: string;
  source: string;
  showIcon?: boolean;
};

type SubmitState = "idle" | "sending" | "success" | "error";

const initialForm = {
  fullName: "",
  email: "",
  whatsapp: "",
  city: "",
  role: "",
  community: "",
  reason: "",
  consent: false,
};

export function WaitlistTrigger({
  children,
  className,
  source,
  showIcon = false,
}: WaitlistTriggerProps) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const updateField = (
    field: keyof typeof initialForm,
    value: string | boolean
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetAndClose = () => {
    setOpen(false);
    setState("idle");
    setMessage("");
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
        throw new Error(data?.message ?? "No pudimos enviar tu solicitud.");
      }

      setState("success");
      setMessage("Solicitud enviada. Gracias por querer probar Biblion.");
      setForm(initialForm);
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "No pudimos enviar tu solicitud. Intenta nuevamente."
      );
    }
  };

  return (
    <>
      <button className={className} onClick={() => setOpen(true)} type="button">
        {children}
        {showIcon ? <ChevronRight size={18} /> : null}
      </button>

      {open ? (
        <div
          className="waitlist-modal-backdrop"
          onClick={resetAndClose}
          role="presentation"
        >
          <section
            aria-labelledby={titleId}
            aria-modal="true"
            className="waitlist-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Cerrar formulario"
              className="waitlist-modal-close"
              onClick={resetAndClose}
              type="button"
            >
              <X size={22} />
            </button>
            <div className="waitlist-modal-copy">
              <span>Acceso anticipado</span>
              <h2 id={titleId}>Cuéntanos por qué quieres probar Biblion.</h2>
              <p>
                Biblion estará próximamente en Play Store. Usaremos esta
                información para invitar primero a usuarios que puedan probar
                lectura, modo estudio y Bibi con intención real de estudio.
              </p>
            </div>

            <form className="waitlist-modal-form" onSubmit={submitWaitlist}>
              <label>
                Nombre completo
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
                WhatsApp
                <input
                  autoComplete="tel"
                  name="whatsapp"
                  onChange={(event) => updateField("whatsapp", event.target.value)}
                  placeholder="+57..."
                  value={form.whatsapp}
                />
              </label>
              <label>
                Ciudad / país
                <input
                  autoComplete="address-level2"
                  name="city"
                  onChange={(event) => updateField("city", event.target.value)}
                  value={form.city}
                />
              </label>
              <label>
                ¿Cómo usarías Biblion?
                <select
                  name="role"
                  onChange={(event) => updateField("role", event.target.value)}
                  required
                  value={form.role}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="lectura-personal">Lectura personal</option>
                  <option value="ensenanza">Preparar enseñanzas</option>
                  <option value="liderazgo">Liderazgo o discipulado</option>
                  <option value="iglesia">Uso en iglesia o comunidad</option>
                  <option value="otro">Otro</option>
                </select>
              </label>
              <label>
                Iglesia / comunidad
                <input
                  name="community"
                  onChange={(event) => updateField("community", event.target.value)}
                  value={form.community}
                />
              </label>
              <label className="waitlist-field-wide">
                ¿Por qué deberíamos darte acceso anticipado?
                <textarea
                  maxLength={600}
                  name="reason"
                  onChange={(event) => updateField("reason", event.target.value)}
                  placeholder="Cuéntanos brevemente cómo usarías Biblion y qué funciones te gustaría probar primero."
                  required
                  rows={5}
                  value={form.reason}
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
                Acepto que Biblion use estos datos para gestionar mi solicitud
                de acceso anticipado.
              </label>
              <div className="waitlist-modal-actions waitlist-field-wide">
                <button disabled={state === "sending"} type="submit">
                  {state === "sending" ? "Enviando..." : "Enviar solicitud"}
                </button>
                <button onClick={resetAndClose} type="button">
                  Cancelar
                </button>
              </div>
              {message ? (
                <p className={`waitlist-message ${state}`}>{message}</p>
              ) : null}
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
