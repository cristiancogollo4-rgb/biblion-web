import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Globe,
  Map,
  NotebookPen,
  Search,
  X,
} from "lucide-react";
import {
  HomeHero,
  SiteFooter,
  WaitlistCta,
} from "@/components/site";
import { FeaturesSection } from "@/components/features-section";
import { StatsBand } from "@/components/home/stats-band";
import { StoryScroll } from "@/components/home/story-scroll";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "BIBLION App: lectura y estudio bíblico",
  description: "Lee la Biblia sin conexión, descubre conexiones entre pasajes, conversa con Bibi y prepara enseñanzas desde una sola aplicación para Android.",
  path: "/",
});

const scatteredTools = [
  { icon: Search, label: "Buscador web", note: "para una palabra difícil" },
  { icon: Map, label: "Mapas", note: "para ubicar un lugar" },
  { icon: Globe, label: "Comentarios", note: "en otra pestaña" },
  { icon: NotebookPen, label: "Notas", note: "en otra aplicación" },
];

const biblionFlow = [
  "Lees el pasaje con calma.",
  "Preguntas a Bibi qué significa una palabra o quién fue un personaje.",
  "Sigues las referencias cruzadas y los temas relacionados.",
  "Escribes tu enseñanza junto a la Biblia, con los versículos citados.",
];

const audiences = [
  ["Lectores", "Una lectura tranquila, personalizable y continua, incluso sin conexión."],
  ["Estudiantes", "Palabras, temas, personajes, lugares y pasajes en un mismo lugar."],
  ["Maestros y líderes", "Clases, estudios, devocionales y predicaciones con la Biblia al lado."],
  ["Comunidades", "Una visión futura para organizar y compartir recursos de estudio."],
];

export default function Home() {
  return (
    <main className="stitch-page" id="main-content">
      <HomeHero />

      <StatsBand />

      <StoryScroll />

      <FeaturesSection />

      <section className="stitch-section home-compare" id="comparar" data-reveal>
        <div className="home-compare-heading">
          <span className="stitch-eyebrow">DEJA DE SALTAR ENTRE APLICACIONES</span>
          <h2>Estudiar no debería sentirse como <em>cambiar de pestaña.</em></h2>
          <p>
            Cada interrupción rompe el hilo. BIBLION App reúne las herramientas esenciales
            para que la atención permanezca en el pasaje.
          </p>
        </div>

        <div className="home-compare-grid">
          <article className="home-compare-card is-before">
            <header>
              <X aria-hidden="true" size={18} />
              <h3>Hoy: una ventana para cada cosa</h3>
            </header>
            <div className="home-compare-tabs" aria-label="Herramientas dispersas">
              {scatteredTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <span key={tool.label} style={{ "--tab-index": index } as CSSProperties}>
                    <Icon aria-hidden="true" size={16} />
                    <strong>{tool.label}</strong>
                    <small>{tool.note}</small>
                  </span>
                );
              })}
            </div>
            <p className="home-compare-result">Distracción, fatiga y pérdida del hilo.</p>
          </article>

          <article className="home-compare-card is-after">
            <header>
              <Check aria-hidden="true" size={18} />
              <h3>Con BIBLION App: un solo lugar</h3>
            </header>
            <ol>
              {biblionFlow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="home-compare-result">Un estudio enfocado de principio a fin.</p>
          </article>
        </div>
      </section>

      <section className="home-paper" data-reveal>
        <div className="home-paper-inner">
          <div className="home-paper-copy">
            <span className="stitch-eyebrow">¿PARA QUIÉN ES?</span>
            <h2>Desde una lectura cotidiana hasta una enseñanza completa.</h2>
            <p>
              BIBLION App acompaña a quien lee por primera vez y a quien prepara
              una clase cada semana.
            </p>
          </div>
          <ul className="home-audience-list">
            {audiences.map(([title, text], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="stitch-section home-ecosystem-band" data-reveal>
        <Image
          alt=""
          className="home-ecosystem-band-logo"
          height={96}
          src="/logos/biblion/logo-biblion-light-app.png"
          width={96}
        />
        <div>
          <span className="stitch-eyebrow">ESTO APENAS COMIENZA</span>
          <p>
            BIBLION App es el primer producto de <strong>BIBLION</strong>, un ecosistema
            de herramientas para la investigación, la formación y el estudio de las Escrituras.
          </p>
        </div>
        <Link className="stitch-button stitch-button-ghost" href="/identidad">
          Conocer la visión <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>

      <WaitlistCta />
      <SiteFooter />
    </main>
  );
}
