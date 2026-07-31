import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileOutput,
  FileText,
  ListChecks,
  Tags,
  Undo2,
  ZoomIn,
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
  ["Estudios bíblicos", "Organiza un tema, sus pasajes, observaciones y conclusiones."],
  ["Enseñanzas", "Construye documentos con títulos, párrafos, listas y citas."],
  ["Devocionales", "Combina un pasaje, una reflexión y una aplicación práctica."],
  ["Bosquejos", "Estructura una clase, predicación o exposición bíblica."],
];

const workflow = [
  ["01", "Comienza con una idea", "Crea un documento y define el título o propósito."],
  ["02", "Consulta la Biblia", "Navega por libros, capítulos y versiones sin cerrar el documento."],
  ["03", "Construye el contenido", "Combina los seis tipos de bloque y las herramientas de formato."],
  ["04", "Guarda tu enseñanza", "Conserva el borrador local o finalízalo para Mis enseñanzas."],
];

const details = [
  [FileText, "Documentos paginados", "Páginas con contador y continuidad visual."],
  [ListChecks, "Seis tipos de bloque", "Párrafo, encabezado, dos listas, versículo y cita."],
  [ZoomIn, "Zoom adaptable", "Vista completa o detalle del texto."],
  [Undo2, "Deshacer y rehacer", "Experimenta sin perder el control."],
  [Tags, "Etiquetas", "Propósito, audiencia, tema y estado."],
  [FileOutput, "PDF y formato .bib", "Comparte, exporta e importa conservando la estructura."],
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
        <a className="stitch-button stitch-button-ghost" href="#flujo">
          Ver el flujo de trabajo
        </a>
      </PageHero>

      <section className="stitch-section" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="QUÉ PUEDES CREAR"
          title="Un espacio flexible para diferentes formas de enseñar."
        />
        <div className="stitch-outcomes-grid">
          {outcomes.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stitch-section" id="flujo" data-reveal>
        <SectionHeading
          eyebrow="FLUJO DE TRABAJO"
          title="De una idea a un documento que puedes conservar."
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

      <section className="stitch-split-story" data-reveal>
        <div>
          <span className="stitch-eyebrow">BIBLIA Y DOCUMENTO</span>
          <h2>Estudia sin cambiar constantemente de aplicación.</h2>
          <p>
            En pantallas amplias, la Biblia y el documento permanecen visibles.
            En dispositivos compactos puedes alternar entre ambos paneles sin
            perder el capítulo, el cursor ni el contenido.
          </p>
        </div>
        <div className="stitch-split-diagram" aria-hidden="true">
          <aside><BookOpen size={22} /><strong>Juan 15</strong><p>Permanezcan en mí...</p></aside>
          <article><FileText size={22} /><strong>Permanecer para dar fruto</strong><p>PÁGINA 1 DE 2</p></article>
        </div>
      </section>

      <StudyModeSimulator />

      <section className="stitch-section" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="DOCUMENTOS REALES"
          title="Estructura, seguridad y formas de llevarlos contigo."
        />
        <div className="stitch-details-grid">
          {details.map(([Icon, title, text]) => {
            const DetailIcon = Icon as typeof FileText;
            return (
              <article key={String(title)}>
                <DetailIcon size={22} />
                <h3>{String(title)}</h3>
                <p>{String(text)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="stitch-document-states" data-reveal>
        <div>
          <StatusPill tone="local">LOCAL</StatusPill>
          <h3>Borrador</h3>
          <p>Se guarda automáticamente en el dispositivo mientras trabajas.</p>
        </div>
        <div>
          <StatusPill tone="beta">MIS ENSEÑANZAS</StatusPill>
          <h3>Enseñanza finalizada</h3>
          <p>Aparece en tu listado cuando tiene título y decides guardarla.</p>
        </div>
        <div>
          <StatusPill tone="online">CON CUENTA</StatusPill>
          <h3>Sincronización compatible</h3>
          <p>Las enseñanzas finalizadas pueden sincronizarse; los borradores siguen locales.</p>
        </div>
      </section>

      <section className="stitch-study-bibi" data-reveal>
        <div>
          <span className="stitch-eyebrow">BIBI EN EL EDITOR</span>
          <h2>Pregunta mientras escribes. El documento sigue siendo tuyo.</h2>
          <p>
            Bibi aparece como una ventana flotante y conserva la conversación. En
            esta versión no modifica ni añade contenido automáticamente.
          </p>
        </div>
        <div className="stitch-boundaries">
          <strong>Límites actuales</strong>
          <span>Los borradores permanecen locales.</span>
          <span>No existe colaboración en tiempo real.</span>
          <span>Las consultas profundas de Bibi requieren internet.</span>
        </div>
      </section>

      <WaitlistCta />
      <SiteFooter />
    </main>
  );
}
