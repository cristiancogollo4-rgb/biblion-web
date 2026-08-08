import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  ListChecks,
  Sparkles,
  Tags,
} from "lucide-react";
import { StudyModeSimulator } from "@/components/study-mode-simulator";
import {
  PageHero,
  SectionHeading,
  SiteFooter,
  StatusPill,
  WaitlistCta,
} from "@/components/site";

const outcomes = [
  {
    icon: BookOpen,
    title: "Estudios bíblicos",
    text: "Organiza un tema, sus pasajes, observaciones y conclusiones.",
  },
  {
    icon: FileText,
    title: "Enseñanzas",
    text: "Construye documentos con títulos, párrafos, listas y citas.",
  },
  {
    icon: Sparkles,
    title: "Devocionales",
    text: "Combina un pasaje, una reflexión y una aplicación práctica.",
  },
  {
    icon: ListChecks,
    title: "Bosquejos",
    text: "Estructura una clase, predicación o exposición bíblica.",
  },
];

const workflow = [
  ["01", "Entra a Mis enseñanzas", "Consulta tus documentos, usa los filtros o comienza una nueva enseñanza."],
  ["02", "Crea el documento", "Define el título y deja que el borrador se conserve localmente mientras trabajas."],
  ["03", "Consulta la Biblia", "Navega por libros, capítulos y versiones sin cerrar el documento."],
  ["04", "Construye el contenido", "Combina los seis tipos de bloque y aplica formato a tus ideas."],
  ["05", "Guarda y comparte", "Lleva la enseñanza a tu listado y expórtala cuando esté lista."],
];

const capabilityGroups = [
  {
    icon: FileText,
    eyebrow: "ESCRIBIR",
    title: "Una hoja que se comporta como un documento real.",
    text: "Paginación continua, formato de texto y libertad para reorganizar el contenido sin perder el hilo.",
    items: ["Seis tipos de bloque", "Zoom de 75% a 200%", "Deshacer, rehacer y autosave"],
  },
  {
    icon: BookOpen,
    eyebrow: "RELACIONAR",
    title: "La Biblia permanece junto a lo que estás construyendo.",
    text: "Consulta el pasaje, cambia de versión e incorpora una cita sin abandonar el editor.",
    items: ["Vista dividida en tablet", "Panel lateral en modo compacto", "Versículos y comparación de versiones"],
  },
  {
    icon: Tags,
    eyebrow: "ORGANIZAR",
    title: "Cada enseñanza conserva su contexto.",
    text: "Clasifica lo creado y decide cuándo sigue siendo borrador o cuándo pasa a Mis enseñanzas.",
    items: ["Propósito, audiencia, tema y estado", "Borradores guardados localmente", "Exportación PDF y formato .bib"],
  },
];

export default function ModoEstudioPage() {
  return (
    <main className="stitch-page">
      <PageHero
        eyebrow="MODO ESTUDIO"
        title={<>Convierte tu estudio bíblico en una <em>enseñanza.</em></>}
        text="Consulta la Biblia, organiza tus hallazgos y construye documentos para estudios, devocionales, clases o predicaciones sin salir de BIBLION."
      >
        <Link className="stitch-button stitch-button-primary" href="/descargar">
          Solicitar acceso anticipado <ArrowRight size={18} />
        </Link>
        <a className="stitch-button stitch-button-ghost" href="#editor-interactivo">
          Probar el editor
        </a>
      </PageHero>

      <StudyModeSimulator />

      <section className="stitch-section study-outcomes-section" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="ÚSALO A TU MANERA"
          title="Un mismo espacio para diferentes formas de enseñar."
          text="BIBLION no impone una plantilla: te da una estructura flexible para desarrollar el contenido que necesitas."
        />
        <div className="study-outcomes-grid">
          {outcomes.map((outcome) => {
            const OutcomeIcon = outcome.icon;
            return (
              <article key={outcome.title}>
                <OutcomeIcon aria-hidden="true" size={22} />
                <h3>{outcome.title}</h3>
                <p>{outcome.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="stitch-section study-workflow-section" id="flujo" data-reveal>
        <SectionHeading
          eyebrow="FLUJO REAL"
          title="Desde Mis enseñanzas hasta un documento listo para compartir."
          text="El recorrido comienza en tu biblioteca personal, no en una hoja vacía aislada."
        />
        <div className="stitch-workflow-list">
          {workflow.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="stitch-section study-capabilities-section" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="TRES PARTES, UN SOLO FLUJO"
          title="Escribe, relaciona y organiza sin cambiar de herramienta."
        />
        <div className="study-capability-grid">
          {capabilityGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <article key={group.title}>
                <header><GroupIcon aria-hidden="true" size={22} /><span>{group.eyebrow}</span></header>
                <h3>{group.title}</h3>
                <p>{group.text}</p>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="stitch-document-states study-document-states" data-reveal>
        <div>
          <StatusPill tone="local">LOCAL</StatusPill>
          <h3>Borrador</h3>
          <p>Se guarda automáticamente en el dispositivo, incluso si todavía no tiene título.</p>
        </div>
        <div>
          <StatusPill tone="beta">MIS ENSEÑANZAS</StatusPill>
          <h3>Enseñanza guardada</h3>
          <p>Cuando tiene título y decides guardarla, aparece en tu biblioteca personal.</p>
        </div>
        <div>
          <StatusPill tone="online">CON CUENTA</StatusPill>
          <h3>Sincronización compatible</h3>
          <p>Las enseñanzas guardadas pueden sincronizarse; los borradores permanecen locales.</p>
        </div>
      </section>

      <section className="stitch-study-bibi study-bibi-story" data-reveal>
        <div className="study-bibi-copy">
          <span className="stitch-eyebrow">BIBI EN EL EDITOR</span>
          <h2>Pregunta mientras escribes. El documento sigue siendo tuyo.</h2>
          <p>
            Bibi aparece como una ventana flotante, conserva la conversación y puede usar
            el contexto bíblico del estudio. En esta versión no modifica ni añade contenido automáticamente.
          </p>
          <div className="study-bibi-limits">
            <span>No modifica el documento</span>
            <span>Las consultas profundas requieren internet</span>
          </div>
        </div>
        <div className="study-bibi-panel" aria-label="Ejemplo del asistente Bibi dentro del editor">
          <header>
            <Image alt="" height={48} src="/logos/bibi/bibi-logo-blanco.png" width={48} />
            <div><strong>Bibi</strong><span>Asistente bíblica</span></div>
          </header>
          <p>¿Cómo se relaciona Juan 15 con la idea de permanecer para dar fruto?</p>
          <blockquote>
            Jesús presenta el fruto como el resultado de una relación constante con Él,
            no como un logro independiente.
          </blockquote>
          <button type="button">Profundizar en el contexto</button>
          <small>Bibi acompaña tu proceso. Tú decides qué escribir.</small>
        </div>
      </section>

      <WaitlistCta />
      <SiteFooter />
    </main>
  );
}
