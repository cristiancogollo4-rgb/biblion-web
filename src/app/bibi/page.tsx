import Image from "next/image";
import {
  BibiConversationMockups,
  BibiMockup,
  Bot,
  CheckCircle2,
  SiteFooter,
  SiteHeader,
} from "@/components/site";

const flowSteps = [
  {
    number: "01",
    title: "Lee con contexto",
    text: "Bibi parte del pasaje, la versión bíblica y el lugar donde estás trabajando.",
    tags: ["Lector", "Pasaje actual", "Versión"],
  },
  {
    number: "02",
    title: "Pregunta con intención",
    text: "Puedes pedir explicación, aplicación, ideas, pasajes relacionados o ayuda para una enseñanza.",
    tags: ["Explicar", "Aplicar", "Bosquejar"],
  },
  {
    number: "03",
    title: "Convierte en estudio",
    text: "En modo estudio puede ayudarte a transformar respuestas en notas, reflexiones y bloques útiles.",
    tags: ["Nota", "Reflexión", "Cita"],
  },
];

const capabilityGroups = [
  {
    title: "En lectura",
    items: ["Explicar un versículo", "Aclarar palabras", "Aplicación sencilla"],
  },
  {
    title: "En modo estudio",
    items: ["Crear bosquejos", "Sugerir notas", "Preparar reflexiones"],
  },
];

const guardrails = [
  "Bibi es una opción experimental y sus respuestas deben verificarse con la Palabra.",
  "No reemplaza la Biblia, la oración, el discernimiento ni la revisión responsable.",
  "No funciona como asistente general; su dominio es bíblico y cristiano.",
  "No debe inventar versículos, doctrinas, profecías ni mensajes personales de Dios.",
];

export default function BibiPage() {
  return (
    <main className="bibi-page">
      <section className="page-hero bibi-hero">
        <SiteHeader />
        <div className="page-hero-inner bibi-hero-inner">
          <div className="page-hero-copy">
            <span className="eyebrow">Bibi experimental</span>
            <h1>Tu asistente bíblica para estudiar con más contexto.</h1>
            <p>
              Bibi acompaña tu lectura y preparación de enseñanzas dentro de
              Biblion. Puede ayudarte a comprender pasajes, ordenar ideas y
              convertir respuestas en notas o reflexiones.
            </p>
            <div className="bibi-experimental-note">
              <Bot size={20} />
              Bibi es una función experimental: está diseñada para apoyar el
              estudio bíblico, no para sustituir la Palabra ni la revisión
              responsable del contenido.
            </div>
          </div>
          <div className="bibi-hero-visual">
            <BibiConversationMockups />
          </div>
        </div>
      </section>

      <section className="section bibi-flow-section">
        <div className="bibi-flow-copy">
          <span>Flujo de uso</span>
          <h2>Bibi entra en tu estudio, no al margen de él.</h2>
          <p>
            La experiencia está pensada para acompañar el momento exacto en el
            que estás leyendo, preguntando o preparando una enseñanza.
          </p>
        </div>
        <div className="bibi-flow-board">
          {flowSteps.map((step) => (
            <article className="bibi-flow-card" key={step.title}>
              <b>{step.number}</b>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <div>
                {step.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bibi-context-section">
        <div className="bibi-context-visual">
          <div className="bibi-reader-context">
            <div className="bibi-reader-top">
              <span>1 Samuel</span>
              <b>CAP 1</b>
            </div>
            <h3>La oración que nace del quebranto</h3>
            <p>
              <sup>10</sup> Ella con amargura de alma oró a Jehová, y lloró
              abundantemente.
            </p>
            <span className="bibi-selected-text">texto seleccionado</span>
          </div>
          <BibiMockup />
        </div>
        <div className="bibi-context-copy">
          <span>Contexto real de Biblion</span>
          <h2>Responde desde lo que estás leyendo y construyendo.</h2>
          <p>
            Biblion puede entregar a Bibi el pasaje actual, la versión bíblica,
            textos citados, etiquetas, notas y bloques de tu enseñanza.
          </p>
          <div className="bibi-capability-grid">
            {capabilityGroups.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                {group.items.map((item) => (
                  <div key={item}>
                    <CheckCircle2 size={17} />
                    <span>{item}</span>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bibi-safety-section">
        <div className="bibi-safety-mark">
          <Image
            alt=""
            height={88}
            src="/logos/bibi/bibi-logo-blanco.png"
            width={88}
          />
          <div>
            <span>Uso responsable</span>
            <h2>Inteligencia al servicio del estudio bíblico.</h2>
          </div>
        </div>
        <div className="bibi-safety-list">
          {guardrails.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
