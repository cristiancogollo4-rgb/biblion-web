import Link from "next/link";
import {
  HomeHero,
  BibiConversationMockups,
  SiteFooter,
  StudyEditorMockup,
  WaitlistCta,
  brandElements,
  FileText,
} from "@/components/site";

const overviewLinks = [
  {
    href: "/identidad",
    title: "Identidad",
    text: "conoce nuestra identidad y proposito como app de estudio bíblico.",
  },
  {
    href: "/funciones",
    title: "Funciones",
    text: "Conoce las funciones principales de Biblion para lectura, estudio y preparación.",
  },
  {
    href: "/modo-estudio",
    title: "Modo estudio",
    text: "Prepara tus enseñanzas con lector y editor en una misma vista.",
  },
  {
    href: "/bibi",
    title: "Bibi",
    text: "Recibe apoyo bíblico contextual con Bibi, tu asistente de estudio inteligente.",
  },
];

const essentialFeatures = [
  {
    icon: FileText,
    title: "Lectura que se convierte en estudio",
    text: "No solo lees la Biblia: puedes organizar ideas, citas, notas y reflexiones en un mismo flujo.",
  },
  {
    icon: FileText,
    title: "Preparada para ensenanzas",
    text: "Biblion esta pensada para devocionales, clases, discipulado y sermones desde el primer momento.",
  },
  {
    icon: FileText,
    title: "Bibi acompana tu proceso",
    text: "Recibe ayuda contextual para comprender pasajes, armar bosquejos y profundizar sin salir de la app.",
  },
];

export default function Home() {
  return (
    <main>
      <HomeHero />

      <section className="section">
        <div className="section-heading">
          <span>Vision general</span>
          <h2>Lee la Biblia, estudia a fondo y traza tus sermones con Biblion.</h2>
          <p>
            conoce a profundidad todo lo que Biblion tiene para ofrecerte
          </p>
        </div>
        <div className="overview-grid">
          {overviewLinks.map((item) => (
            <Link className="overview-card" href={item.href} key={item.href}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span>Ver página</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section home-summary study-highlight-section">
        <div className="summary-copy">
          <span>Modo estudio</span>
          <h2>Del pasaje bíblico a una enseñanza organizada.</h2>
          <p>
            Biblion permite trabajar con lectura y editor en una misma vista:
            citas por rango, notas, columnas, comparación de versiones y tu sermón estructurado en un solo lugar.
          </p>
        </div>
        <div className="summary-mockups">
          <StudyEditorMockup />
        </div>
      </section>

      <section className="section home-summary bibi-home-section">
        <div className="bibi-home-visual">
          <BibiConversationMockups />
        </div>
        <div className="summary-copy bibi-home-copy">
          <span>Conoce a Bibi</span>
          <h2>Tu asistente biblico para estudiar, comprender y preparar mejor tu sermon.</h2>
          <p>
            Bibi puede ayudarte a explicar pasajes, encontrar ideas para tus
            ensenanzas, sugerir bosquejos, aclarar palabras biblicas y proponer
            aplicaciones sencillas siempre dentro del contexto de la Palabra.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2 className="single-line-question">¿Por que Biblion y no otra app?</h2>
        </div>
        <div className="features-grid">
          {essentialFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="feature-card" key={feature.title}>
                <Icon size={22} />
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
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
