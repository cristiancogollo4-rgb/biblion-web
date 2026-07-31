import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Construction,
  FilePenLine,
  LibraryBig,
  Search,
  Sparkles,
} from "lucide-react";
import {
  HomeHero,
  SectionHeading,
  SiteFooter,
  StatusPill,
  WaitlistCta,
} from "@/components/site";
import { ThemeControl } from "@/components/theme-control";

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

const futureItems = [
  {
    icon: LibraryBig,
    title: "Repositorio de enseñanzas",
    status: "Planeado",
    text: "Un espacio futuro para descubrir recursos creados dentro de BIBLION.",
  },
  {
    icon: Sparkles,
    title: "Planes de estudio",
    status: "En evaluación",
    text: "Recorridos guiados para profundizar en temas y libros bíblicos.",
  },
  {
    icon: Construction,
    title: "Colecciones personales",
    status: "Visión futura",
    text: "Agrupaciones de pasajes, notas y enseñanzas elegidas por cada usuario.",
  },
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

      <section className="stitch-theme-section" data-reveal>
        <div>
          <span className="stitch-eyebrow">BIBLION SE ADAPTA A TU MOMENTO</span>
          <h2>Tres atmósferas. La misma experiencia.</h2>
          <p>
            Cambia el tema de esta página y observa cómo la identidad se conserva
            en Claro, Azul Rey Oscuro y Oscuro.
          </p>
          <ThemeControl expanded />
        </div>
        <div className="stitch-theme-books" aria-hidden="true">
          <article className="is-light">
            <span>CLARO</span>
            <blockquote>“Lámpara es a mis pies tu palabra.”</blockquote>
            <strong>Salmos 119:105</strong>
          </article>
          <article className="is-blue">
            <span>AZUL REY OSCURO</span>
            <blockquote>“La exposición de tus palabras alumbra.”</blockquote>
            <strong>Salmos 119:130</strong>
          </article>
          <article className="is-dark">
            <span>OSCURO</span>
            <blockquote>“En tu luz veremos la luz.”</blockquote>
            <strong>Salmos 36:9</strong>
          </article>
        </div>
      </section>

      <section className="stitch-section" id="futuro" data-reveal>
        <SectionHeading
          eyebrow="LO QUE ESTAMOS CONSTRUYENDO"
          title="El futuro se presenta con claridad, no como una promesa inmediata."
          text="Estas ideas no forman parte todavía de la versión de prueba y pueden evolucionar según la validación del producto."
        />
        <div className="stitch-future-grid">
          {futureItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <div><Icon size={23} /><StatusPill tone="future">{item.status}</StatusPill></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
        <Link className="stitch-text-link" href="/funciones#futuro">
          Conocer las próximas funciones <ArrowRight size={18} />
        </Link>
      </section>

      <WaitlistCta />
      <SiteFooter />
    </main>
  );
}
