import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Bot,
  Feather,
  ScrollText,
  Sparkles,
} from "lucide-react";
import {
  SectionHeading,
  SiteFooter,
  SiteHeader,
  StatusPill,
  WaitlistCta,
} from "@/components/site";

const symbolMeanings = [
  ["Libro abierto", "Palabra y aprendizaje"],
  ["Pluma dorada", "Escritura y creación"],
  ["Letras antiguas", "Contexto histórico"],
  ["Azul profundo", "Confianza y profundidad"],
  ["Dorado", "Luz y permanencia"],
];

const creators = [
  {
    initials: "CF",
    name: "Cristian Felipe Cogollo Rodríguez",
    role: "Co-fundador y Lead Developer",
    focus: "Producto, experiencia Android y arquitectura de BIBLION.",
  },
  {
    initials: "LE",
    name: "Luis Eduardo Jaimes Hernandez",
    role: "Co-fundador y Lead Developer",
    focus: "Desarrollo, datos bíblicos y evolución técnica del producto.",
  },
  {
    initials: "AG",
    name: "Anderson Geovanny Duarte Largo",
    role: "Co-fundador, Estrategia y Alianzas",
    focus: "Estrategia, crecimiento y relaciones para llevar BIBLION a más personas.",
  },
];

function BiblionMark({ className = "" }: { className?: string }) {
  return (
    <span className={`identity-biblion-mark ${className}`.trim()} aria-hidden="true">
      <Image
        alt=""
        className="identity-biblion-mark-light"
        height={420}
        priority
        src="/logos/biblion/logo-biblion-light-app.png"
        width={420}
      />
      <Image
        alt=""
        className="identity-biblion-mark-dark"
        height={420}
        priority
        src="/logos/biblion/logo-biblion-dark-app.png"
        width={420}
      />
    </span>
  );
}

function IdentitySectionHeading({
  number,
  eyebrow,
  title,
  text,
}: {
  number: string;
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="identity-section-heading">
      <span className="identity-section-number">{number}</span>
      <SectionHeading eyebrow={eyebrow} title={title} text={text} />
    </div>
  );
}

export default function IdentidadPage() {
  return (
    <main className="stitch-page identity-page">
      <SiteHeader />

      <section className="identity-hero">
        <div className="identity-hero-copy" data-reveal>
          <span className="stitch-eyebrow">IDENTIDAD</span>
          <h1>
            La Biblia como <em>punto de partida.</em>
          </h1>
          <p>
            BIBLION reúne lectura, descubrimiento y creación para ayudarte a
            comprender, relacionar y organizar lo que encuentras en las Escrituras.
          </p>
          <div className="stitch-hero-actions identity-hero-actions">
            <Link className="stitch-button stitch-button-primary" href="#origen">
              Nuestra historia <ArrowDown size={18} />
            </Link>
            <Link className="stitch-button stitch-button-ghost" href="/funciones">
              Explorar funciones <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="identity-hero-visual" data-reveal>
          <div
            aria-label="Ejemplo del flujo de estudio de BIBLION, desde un versículo hasta una conexión, una explicación y una nota"
            className="identity-orbit identity-study-flow"
            role="img"
          >
            <span className="identity-orbit-ring is-outer" />
            <span className="identity-orbit-ring is-inner" />

            <article className="identity-flow-verse">
              <header>
                <span className="identity-flow-icon">
                  <BookOpen aria-hidden="true" size={16} />
                </span>
                <span>
                  <small>Palabra</small>
                  <strong>Salmos 119:105</strong>
                </span>
              </header>
              <blockquote>
                <sup>105</sup> Tu palabra es una lámpara que guía mis pies y una luz
                para mi camino.
              </blockquote>
              <footer>
                <span>PDT</span>
                <span className="identity-flow-reading-state">Leyendo</span>
              </footer>
            </article>

            <article className="identity-flow-card is-connection">
              <Sparkles aria-hidden="true" size={16} />
              <span>
                <small>Conexión</small>
                <strong>Juan 8:12</strong>
              </span>
            </article>

            <article className="identity-flow-card is-study">
              <Feather aria-hidden="true" size={16} />
              <span>
                <small>Nota de estudio</small>
                <strong>La Palabra guía cada paso.</strong>
              </span>
            </article>

            <article className="identity-flow-card is-bibi">
              <Bot aria-hidden="true" size={16} />
              <span>
                <small>Bibi explica</small>
                <strong>La lámpara representa dirección.</strong>
              </span>
            </article>
          </div>
        </div>
      </section>

      <section className="stitch-section identity-story" data-reveal id="origen">
        <IdentitySectionHeading
          eyebrow="NUESTRO ORIGEN"
          number="01"
          title="Un pergamino digital para conservar el hilo."
          text="BIBLION nació para reducir la distancia entre leer un pasaje, comprenderlo y transformar lo aprendido en algo que puedas conservar."
        />
        <div className="identity-story-grid">
          <div className="identity-story-copy">
            <p>
              Estudiar la Biblia suele implicar saltar entre lectores, buscadores,
              diccionarios y editores. Cada cambio de herramienta aumenta la
              posibilidad de perder la pregunta que inició el estudio.
            </p>
            <p>
              Biblion viene del griego y designa un libro, rollo o documento escrito.
              Su equivalente hebreo, séfer, refuerza la idea de conservar y transmitir
              conocimiento con fundamento en las Escrituras.
            </p>
            <div className="identity-name-origin">
              <ScrollText aria-hidden="true" size={24} />
              <span>
                <small>El nombre</small>
                <strong>Biblion · βιβλίον</strong>
                <em>
                  En hebreo: <b lang="he" dir="rtl">סֵפֶר</b> (séfer) · libro, rollo o escrito
                </em>
              </span>
            </div>
          </div>
          <div className="identity-purpose-grid">
            <article>
              <span>Misión</span>
              <h3>Acompañar cada hallazgo.</h3>
              <p>
                Ayudar a comprender, relacionar y construir enseñanzas fundamentadas
                en la Biblia.
              </p>
            </article>
            <article>
              <span>Visión</span>
              <h3>Conservar conocimiento vivo.</h3>
              <p>
                Ser un pergamino digital donde una nueva generación continúe
                aprendiendo, escribiendo y compartiendo.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="stitch-section identity-belief-section" data-reveal>
        <div className="identity-belief-card">
          <header>
            <span className="identity-belief-number">02</span>
            <span className="identity-belief-kicker">
              <Feather aria-hidden="true" size={18} />
              Nuestra convicción
            </span>
          </header>
          <div className="identity-belief-grid">
            <div className="identity-belief-statement">
              <h2>La tecnología acompaña el estudio.</h2>
              <blockquote>La Palabra permanece en el centro.</blockquote>
            </div>
            <div className="identity-belief-aside">
              <p>
                BIBLION no sustituye la lectura personal, la reflexión ni el criterio
                de quien aprende. Organiza el camino y ayuda a conservar cada hallazgo.
              </p>
              <div aria-label="Flujo de estudio de BIBLION" className="identity-belief-path">
                <span>Leer</span>
                <span>Comprender</span>
                <span>Conectar</span>
                <span>Crear</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stitch-section identity-brand-system" data-reveal>
        <IdentitySectionHeading
          eyebrow="UN SISTEMA, TRES EXPRESIONES"
          number="03"
          title="Una identidad que acompaña todo el estudio."
          text="La marca principal, el símbolo portátil y Bibi comparten una misma raíz visual, pero cumplen responsabilidades diferentes."
        />

        <div className="identity-brand-grid">
          <article className="identity-brand-card is-brand">
            <div className="identity-brand-lockup">
              <BiblionMark />
              <strong>BIBLION</strong>
            </div>
            <span>Marca principal</span>
            <h3>La experiencia completa</h3>
            <p>
              Representa la plataforma de lectura y estudio. El azul comunica
              profundidad; el dorado, luz y permanencia.
            </p>
            <div className="identity-brand-tags">
              <span>Palabra</span>
              <span>Profundidad</span>
              <span>Estudio</span>
            </div>
          </article>

          <article className="identity-brand-card is-app">
            <BiblionMark />
            <span>Símbolo portátil</span>
            <h3>La “B” que viaja contigo</h3>
            <p>
              La pluma y la inicial condensan la identidad para iconos, navegación
              y espacios compactos de la aplicación.
            </p>
          </article>

          <article className="identity-brand-card is-bibi">
            <Image
              alt="Logo de Bibi"
              className="identity-bibi-logo"
              height={220}
              src="/bibi-logo.png"
              width={220}
            />
            <span>Asistente bíblica</span>
            <h3>Una presencia cercana</h3>
            <p>
              Bibi hereda la pluma de BIBLION y añade conversación para acompañar
              preguntas, contexto y conexiones bíblicas.
            </p>
          </article>
        </div>
        <div aria-label="Significado de los elementos visuales de BIBLION" className="identity-symbol-meanings">
          {symbolMeanings.map(([element, meaning]) => (
            <span key={element}>
              <strong>{element}</strong>
              <small>{meaning}</small>
            </span>
          ))}
        </div>
      </section>

      <section className="stitch-section identity-creators" data-reveal>
        <IdentitySectionHeading
          eyebrow="QUIÉNES CONSTRUYEN BIBLION"
          number="04"
          title="Un proyecto con responsables visibles."
          text="BIBLION es desarrollado por un equipo colombiano que combina producto, tecnología y estrategia."
        />
        <div className="stitch-creators-grid identity-creators-grid">
          {creators.map((creator, index) => (
            <article key={creator.name}>
              <div className="identity-creator-topline">
                <span className="identity-creator-avatar">{creator.initials}</span>
                <span className="identity-creator-index">0{index + 1}</span>
              </div>
              <h3>{creator.name}</h3>
              <p className="identity-creator-role">{creator.role}</p>
              <div className="identity-creator-focus">
                <span>En el proyecto</span>
                <p>{creator.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stitch-section identity-transparency" data-reveal>
        <IdentitySectionHeading
          eyebrow="DESARROLLO ABIERTO"
          number="05"
          title="Claridad sobre lo que estamos construyendo."
          text="BIBLION está en desarrollo activo. Algunas funciones ya operan localmente y otras continúan en pruebas antes del acceso público."
        />
        <div className="identity-status-grid">
          <article>
            <StatusPill tone="local">Implementado</StatusPill>
            <h3>Base local</h3>
            <p>Lectura, búsqueda, diccionario y documentos de estudio en el dispositivo.</p>
          </article>
          <article>
            <StatusPill tone="beta">En validación</StatusPill>
            <h3>Experiencia conectada</h3>
            <p>Bibi, sincronización y recorridos guiados continúan afinándose.</p>
          </article>
          <article>
            <StatusPill tone="future">Siguiente etapa</StatusPill>
            <h3>Acceso anticipado</h3>
            <p>Las primeras personas podrán probar BIBLION y compartir observaciones.</p>
          </article>
        </div>
        <div className="identity-transparency-note">
          <div>
            <Bot aria-hidden="true" size={25} />
            <p>
              Las funciones pueden evolucionar mientras realizamos pruebas,
              corregimos errores y escuchamos a los primeros usuarios.
            </p>
          </div>
          <Link href="/descargar">
            Conocer el acceso anticipado <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <WaitlistCta />
      <SiteFooter />
    </main>
  );
}
