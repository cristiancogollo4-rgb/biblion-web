import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  FilePenLine,
  GraduationCap,
  Network,
  Search,
  Minus,
  Star,
} from "lucide-react";
import {
  HomeHero,
  SectionHeading,
  SiteFooter,
  WaitlistCta,
} from "@/components/site";
import { FeaturesSection } from "@/components/features-section";
import { StatsCarousel } from "@/components/stats-carousel";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "BIBLION App: lectura y estudio bíblico",
  description: "Lee la Biblia, descubre conexiones, conversa con Bibi y prepara enseñanzas desde una sola aplicación para Android.",
  path: "/",
});

const pathways = [
  {
    href: "/funciones#lectura",
    icon: BookOpen,
    label: "Leer",
    text: "Lee sin conexión, cambia de versión y conserva tus pasajes importantes.",
  },
  {
    href: "/funciones#descubrir",
    icon: Search,
    label: "Descubrir",
    text: "Busca palabras, consulta el diccionario y sigue conexiones entre pasajes.",
  },
  {
    href: "/modo-estudio",
    icon: FilePenLine,
    label: "Construir",
    text: "Convierte tus hallazgos en estudios, bosquejos, clases o devocionales.",
  },
  {
    href: "/bibi",
    icon: Bot,
    label: "Preguntar",
    text: "Consulta personajes, lugares, palabras y textos sin perder el contexto.",
  },
];

const todaySteps = [
  "Abres una app para leer un pasaje clave.",
  "Encuentras una palabra difícil y cierras la app para buscarla en Google.",
  "Abres otra app o un navegador para ver un mapa o un comentario.",
  "Cierras todo y abres tu bloc de notas o Notion para apuntar tus ideas.",
];

const biblionSteps = [
  "Lees el pasaje con total concentración.",
  "Pulsas una palabra y el diccionario aparece en una ventana flotante.",
  "Preguntas a Bibi sobre el contexto histórico sin salir del versículo.",
  "Sientes una conexión y sigues la referencia cruzada en el mismo hilo.",
  "Creas tu bosquejo o devocional allí mismo con tus hallazgos.",
];

const audiences = [
  ["Lectores", "Personas que buscan una lectura tranquila, personalizable y continua."],
  ["Estudiantes", "Quienes investigan palabras, temas, personajes, lugares y pasajes."],
  ["Maestros y líderes", "Personas que preparan clases, estudios, devocionales o predicaciones."],
  ["Comunidades", "Una visión futura para organizar y compartir recursos de estudio."],
];

const ecosystemAreas = [
  {
    icon: Network,
    title: "Investigación",
    text: "Conexiones, contexto y herramientas para profundizar en las Escrituras.",
  },
  {
    icon: GraduationCap,
    title: "Formación",
    text: "Nuevas experiencias para enseñar, aprender y crecer alrededor de la Biblia.",
  },
];

export default function Home() {
  return (
    <main className="stitch-page" id="main-content">
      <HomeHero />

      <StatsCarousel />

      <section className="stitch-section" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="DENTRO DE BIBLION APP"
          title="Cuatro acciones. Un solo hilo de estudio."
          text="Cada herramienta de la aplicación lleva naturalmente a la siguiente sin alejarte del pasaje que inició la búsqueda."
        />
        <div className="stitch-path-grid">
          {pathways.map((item) => {
            const Icon = item.icon;
            return (
              <Link className="stitch-path-card" href={item.href} key={item.label}>
                <div>
                  <Icon size={25} />
                  <ArrowRight size={18} />
                </div>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <FeaturesSection />

      <section className="stitch-section stitch-comparison" id="comparar" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="DEJA DE SALTAR ENTRE APLICACIONES"
          title="Empieza a conectar con la Palabra."
          text="BIBLION App reúne las herramientas esenciales para reducir interrupciones durante tu estudio bíblico."
        />
        <div className="stitch-comparison-grid">
          <div className="stitch-comparison-card stitch-comparison-today">
            <div className="stitch-comparison-header">
              <Minus size={20} />
              <h3>Cómo estudias hoy</h3>
            </div>
            <p className="stitch-comparison-subtitle">El camino largo</p>
            <ul>
              {todaySteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <p className="stitch-comparison-result">
              Fatiga visual, distracción y pérdida del hilo espiritual.
            </p>
          </div>
          <div className="stitch-comparison-card stitch-comparison-biblion">
            <div className="stitch-comparison-header">
              <Star size={20} />
              <h3>Cómo estudias con BIBLION App</h3>
            </div>
            <p className="stitch-comparison-subtitle">El flujo continuo</p>
            <ul>
              {biblionSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <p className="stitch-comparison-result">
              Profundidad, claridad y un estudio enfocado de principio a fin.
            </p>
          </div>
        </div>
        <div className="stitch-comparison-cta">
          <p>Simplifica tu estudio hoy mismo.</p>
        </div>
      </section>

      <section className="stitch-section" data-reveal>
        <SectionHeading
          eyebrow="¿PARA QUIÉN ESTÁ PENSADO?"
          title="Desde una lectura cotidiana hasta una enseñanza completa."
        />
        <div className="stitch-audience-grid">
          {audiences.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stitch-section home-ecosystem" data-reveal id="ecosistema">
        <div className="home-ecosystem-copy">
          <span className="stitch-eyebrow">ESTO APENAS COMIENZA</span>
          <h2>BIBLION App es el primer paso de un ecosistema mayor.</h2>
          <p>
            BIBLION busca desarrollar herramientas digitales para diferentes ámbitos
            del estudio bíblico. La aplicación móvil es la primera experiencia de
            una visión que podrá crecer hacia la investigación, la formación y nuevas
            formas de construir conocimiento alrededor de las Escrituras.
          </p>
          <Link className="stitch-button stitch-button-ghost" href="/identidad">
            Conocer la visión de BIBLION <ArrowRight size={18} />
          </Link>
        </div>

        <div
          aria-label="BIBLION como ecosistema y BIBLION App como su primer producto"
          className="home-ecosystem-map"
          role="img"
        >
          <div className="home-ecosystem-core">
            <Image
              alt=""
              className="home-ecosystem-logo home-ecosystem-logo-color"
              height={1254}
              sizes="(max-width: 620px) 184px, 224px"
              src="/logos/biblion/logo-biblion-normal.png"
              width={1254}
            />
            <Image
              alt=""
              className="home-ecosystem-logo home-ecosystem-logo-blue"
              height={1254}
              sizes="(max-width: 620px) 184px, 224px"
              src="/logos/biblion/logo-biblion-blue.jpeg"
              width={1254}
            />
            <Image
              alt=""
              className="home-ecosystem-logo home-ecosystem-logo-dark"
              height={1254}
              sizes="(max-width: 620px) 184px, 224px"
              src="/logos/biblion/logo-biblion-dark.jpeg"
              width={1254}
            />
          </div>
          <article className="home-ecosystem-product">
            <BookOpen aria-hidden="true" size={20} />
            <span>
              <small>Primer producto</small>
              <strong>BIBLION App</strong>
              <em>Lectura y estudio portátil</em>
            </span>
          </article>
          {ecosystemAreas.map((area) => {
            const Icon = area.icon;
            return (
              <article className="home-ecosystem-area" key={area.title}>
                <Icon aria-hidden="true" size={18} />
                <span>
                  <small>Ámbito de crecimiento</small>
                  <strong>{area.title}</strong>
                  <em>{area.text}</em>
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <WaitlistCta />
      <SiteFooter />
    </main>
  );
}
