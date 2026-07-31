import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Check,
  CircleDashed,
  FilePenLine,
  ShieldCheck,
  Smartphone,
  Wifi,
} from "lucide-react";
import {
  PageHero,
  SectionHeading,
  SiteFooter,
  StatusPill,
} from "@/components/site";
import { WaitlistForm } from "@/components/waitlist-dialog";

const testingFeatures = [
  {
    icon: BookOpen,
    title: "Lectura y descubrimiento",
    items: ["Lectura bíblica sin conexión", "Búsqueda filtrada", "Diccionario", "Temas y referencias"],
  },
  {
    icon: FilePenLine,
    title: "Modo Estudio",
    items: ["Documentos paginados", "Borradores locales", "PDF", "Importación y exportación .bib"],
  },
  {
    icon: Bot,
    title: "Bibi y personalización",
    items: ["Asistencia durante la lectura", "Consultas locales", "Tres temas", "Perfil y preferencias"],
  },
];

const releasePath = [
  ["Pruebas internas", "Completado", "ready"],
  ["Acceso anticipado", "Etapa actual", "active"],
  ["Preparación para producción", "Siguiente etapa", "pending"],
  ["Lanzamiento general para Android", "Sin fecha confirmada", "pending"],
];

const faqs = [
  ["¿Tiene algún costo participar?", "No. La participación en esta etapa de pruebas es gratuita."],
  ["¿Cuándo recibiré acceso?", "El registro no garantiza acceso inmediato. Las invitaciones se habilitarán progresivamente según la capacidad de acompañamiento y la estabilidad de cada versión."],
  ["¿Necesito internet?", "La lectura y varios recursos son locales. La profundización con Bibi, el inicio de sesión y la sincronización pueden requerir conexión."],
  ["¿Está disponible para iPhone?", "No actualmente. La primera etapa de desarrollo y pruebas está enfocada en Android."],
  ["¿Cómo reporto un error?", "Las instrucciones de cada etapa indicarán un correo o formulario real para reportes. También puedes escribir a biblion2026@gmail.com."],
  ["¿Puedo salir de la lista?", "Sí. Puedes solicitar la eliminación de tu registro escribiendo al correo oficial de BIBLION."],
];

export default function DescargarPage() {
  return (
    <main className="stitch-page">
      <PageHero
        eyebrow="ACCESO ANTICIPADO"
        title={<>Sé parte de las primeras pruebas de <em>BIBLION.</em></>}
        text="La aplicación está en desarrollo activo para Android. Regístrate para recibir información cuando abramos nuevas etapas de prueba."
      >
        <a className="stitch-button stitch-button-primary" href="#registro">
          Unirme a la lista <ArrowRight size={18} />
        </a>
      </PageHero>

      <section className="stitch-access-status" data-reveal>
        <span><Smartphone size={18} /><strong>Plataforma</strong> Android</span>
        <span><CircleDashed size={18} /><strong>Estado</strong> Desarrollo activo</span>
        <span><ArrowRight size={18} /><strong>Acceso</strong> Progresivo</span>
        <span><Check size={18} /><strong>Costo de prueba</strong> Gratuito</span>
      </section>

      <section className="stitch-section" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="QUÉ ENCONTRARÁS EN LA PRUEBA"
          title="Funciones reales para recorridos reales."
          text="Algunas capacidades continúan en validación y pueden cambiar durante esta etapa."
        />
        <div className="stitch-testing-grid">
          {testingFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title}>
                <Icon size={25} />
                <h3>{feature.title}</h3>
                <ul>{feature.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="stitch-participation" data-reveal>
        <div>
          <span className="stitch-eyebrow">QUÉ SIGNIFICA PARTICIPAR</span>
          <h2>Una versión de prueba puede contener errores o funciones incompletas.</h2>
          <p>
            Podrás probar nuevas herramientas, informar problemas y compartir
            observaciones. Enviar comentarios es valioso, pero no obligatorio.
          </p>
        </div>
        <div className="stitch-compatibility">
          <span><Check size={18} /> Android 8.0 o superior</span>
          <span><Wifi size={18} /> Lectura principal disponible sin conexión</span>
          <span><Bot size={18} /> Profundización de Bibi con internet</span>
          <span><Smartphone size={18} /> iOS no disponible actualmente</span>
        </div>
      </section>

      <section className="stitch-registration-section" id="registro" data-reveal>
        <div>
          <span className="stitch-eyebrow">ÚNETE A LA LISTA</span>
          <h2>Déjanos un correo para gestionar tu participación.</h2>
          <p>
            Registrarte no instala la aplicación ni garantiza una invitación
            inmediata. Abriremos el acceso por etapas.
          </p>
          <div className="stitch-registration-note">
            <ShieldCheck size={22} />
            <span>Usaremos estos datos únicamente para las pruebas y comunicaciones relacionadas.</span>
          </div>
        </div>
        <WaitlistForm source="access-page" />
      </section>

      <section className="stitch-section" data-reveal>
        <SectionHeading
          eyebrow="QUÉ SUCEDE DESPUÉS"
          title="Un proceso claro, sin promesas automáticas."
        />
        <div className="stitch-after-grid">
          <article><span>01</span><h3>Registro guardado</h3><p>La página confirma que tu información se almacenó correctamente.</p></article>
          <article><span>02</span><h3>Acceso progresivo</h3><p>Revisamos estabilidad, dispositivos y capacidad de acompañamiento.</p></article>
          <article><span>03</span><h3>Instrucciones reales</h3><p>Si eres invitado, recibirás el canal y los pasos de instalación disponibles.</p></article>
        </div>
      </section>

      <section className="stitch-release-section" data-reveal>
        <div>
          <span className="stitch-eyebrow">EL CAMINO A BIBLION</span>
          <h2>Sin fechas inventadas. Con etapas verificables.</h2>
        </div>
        <div className="stitch-release-list">
          {releasePath.map(([title, status, state], index) => (
            <article className={`is-${state}`} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{title}</strong><p>{status}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="stitch-section" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="PREGUNTAS FRECUENTES"
          title="Lo esencial antes de registrarte."
        />
        <div className="stitch-faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="stitch-privacy-banner" data-reveal>
        <ShieldCheck size={26} />
        <div>
          <strong>Compromiso de privacidad</strong>
          <p>
            Puedes solicitar la eliminación de tu registro en cualquier momento.
            Consulta qué recopilamos y cómo usamos la información.
          </p>
        </div>
        <Link className="stitch-text-link" href="/privacidad">
          Leer privacidad <ArrowRight size={17} />
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
