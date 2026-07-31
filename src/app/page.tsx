import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  FilePenLine,
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

export default function Home() {
  return (
    <main className="stitch-page">
      <HomeHero />

      <section className="stitch-section" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="DISEÑADO PARA LA PROFUNDIDAD"
          title="Cuatro acciones. Un solo hilo de estudio."
          text="Cada herramienta lleva naturalmente a la siguiente sin alejarte del pasaje que inició la búsqueda."
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
          text="BIBLION elimina la fricción de tu estudio bíblico. Compara cómo estudias hoy vs. cómo podrías hacerlo."
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
              <h3>Cómo estudias con BIBLION</h3>
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
          <WaitlistCta />
        </div>
      </section>

      <section className="stitch-section" data-reveal>
        <SectionHeading
          eyebrow="¿PARA QUIÉN ES BIBLION?"
          title="Personas que desean estudiar la Biblia"
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

      <SiteFooter />
    </main>
  );
}
