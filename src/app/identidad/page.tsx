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
  ["Libro abierto", "La Palabra como punto de partida"],
  ["Pluma en movimiento", "Estudio que se convierte en creación"],
  ["B central", "Unidad entre marca, productos y experiencias"],
  ["Letras antiguas", "Historia y contexto para comprender"],
  ["Luz dorada", "Claridad, propósito y permanencia"],
];

type TeamMember = {
  initials: string;
  name: string;
  role: string;
  area: string;
  focus: string;
  image?: string;
  isFounder?: boolean;
};

const teamMembers: TeamMember[] = [
  {
    initials: "CF",
    name: "Cristian Felipe Cogollo Rodríguez",
    role: "Co-fundador y Lead Developer",
    area: "Producto y tecnología",
    focus: "Producto, experiencia digital y arquitectura del ecosistema BIBLION.",
    isFounder: true,
  },
  {
    initials: "LE",
    name: "Luis Eduardo Jaimes Hernandez",
    role: "Co-fundador y Lead Developer",
    area: "Datos e infraestructura",
    focus: "Tecnología, datos bíblicos e infraestructura para los productos del ecosistema.",
    isFounder: true,
  },
  {
    initials: "AG",
    name: "Anderson Geovanny Duarte Largo",
    role: "Co-fundador, Estrategia y Alianzas",
    area: "Estrategia y crecimiento",
    focus: "Estrategia, crecimiento y alianzas para llevar el ecosistema a más personas.",
    isFounder: true,
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

function BiblionFullLogo() {
  return (
    <span className="identity-ecosystem-logo" aria-hidden="true">
      <Image
        alt=""
        className="identity-ecosystem-logo-image identity-ecosystem-logo-light"
        height={1254}
        sizes="136px"
        src="/logos/biblion/logo-biblion-normal.png"
        width={1254}
      />
      <Image
        alt=""
        className="identity-ecosystem-logo-image identity-ecosystem-logo-blue"
        height={1254}
        sizes="136px"
        src="/logos/biblion/logo-biblion-blue.jpeg"
        width={1254}
      />
      <Image
        alt=""
        className="identity-ecosystem-logo-image identity-ecosystem-logo-dark"
        height={1254}
        sizes="136px"
        src="/logos/biblion/logo-biblion-dark.jpeg"
        width={1254}
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
          <span className="stitch-eyebrow">ECOSISTEMA BIBLION</span>
          <h1>
            La Biblia como <em>punto de partida.</em>
          </h1>
          <p>
            BIBLION es una marca creada para impulsar herramientas que acompañen
            el estudio de la Biblia en diferentes ámbitos, manteniendo siempre
            las Escrituras en el centro.
          </p>
          <div className="stitch-hero-actions identity-hero-actions">
            <Link className="stitch-button stitch-button-primary" href="#origen">
              Nuestra historia <ArrowDown size={18} />
            </Link>
            <Link className="stitch-button stitch-button-ghost" href="/funciones">
              Conocer BIBLION App <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="identity-hero-visual" data-reveal>
          <div
            aria-label="BIBLION App como primera experiencia del ecosistema BIBLION"
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
          title="Una visión que comienza en las Escrituras."
          text="BIBLION nació de la convicción de que la tecnología puede acompañar diferentes formas de estudiar, comprender y comunicar la Biblia."
        />
        <div className="identity-story-grid">
          <div className="identity-story-copy">
            <p>
              La visión no se limita a una sola aplicación. BIBLION busca construir
              un ecosistema capaz de crecer alrededor de la lectura, la investigación,
              la enseñanza y la creación de conocimiento bíblico.
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
              <h3>Crear herramientas con propósito.</h3>
              <p>
                Desarrollar experiencias que acompañen el estudio, la comprensión y
                la comunicación de la Biblia en diferentes contextos.
              </p>
            </article>
            <article>
              <span>Visión</span>
              <h3>Construir un ecosistema de referencia.</h3>
              <p>
                Conectar herramientas para quienes desean estudiar, enseñar y
                conservar conocimiento fundamentado en las Escrituras.
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
              <h2>La tecnología acompaña.</h2>
              <blockquote>La Palabra permanece en el centro.</blockquote>
            </div>
            <div className="identity-belief-aside">
              <p>
                Cada producto de BIBLION debe ayudar a comprender, relacionar,
                organizar o comunicar las Escrituras sin reemplazar la lectura
                personal, la reflexión ni el criterio responsable.
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
          eyebrow="UNA MARCA, UN ECOSISTEMA"
          number="03"
          title="Una visión que puede convertirse en muchas herramientas."
          text="BIBLION define el propósito común; BIBLION App es su primer producto y Bibi nace como asistente dentro de esa experiencia."
        />

        <div className="identity-brand-grid">
          <article className="identity-brand-card is-brand">
            <div className="identity-brand-visual is-ecosystem">
              <BiblionFullLogo />
            </div>
            <span>Marca principal</span>
            <h3>El ecosistema completo</h3>
            <p>
              Representa la empresa, su visión y todos los productos creados para
              acompañar diferentes ámbitos del estudio bíblico.
            </p>
            <div className="identity-brand-tags">
              <span>Palabra</span>
              <span>Ecosistema</span>
              <span>Propósito</span>
            </div>
          </article>

          <article className="identity-brand-card is-app">
            <div className="identity-brand-visual is-app">
              <BiblionMark />
            </div>
            <span>Primer producto</span>
            <h3>BIBLION App</h3>
            <p>
              La primera experiencia del ecosistema: una aplicación móvil para leer,
              descubrir conexiones y construir estudios sin perder el hilo.
            </p>
          </article>

          <article className="identity-brand-card is-bibi">
            <div className="identity-brand-visual is-bibi">
              <Image
                alt="Logo de Bibi"
                className="identity-bibi-logo"
                height={220}
                src="/bibi-logo.png"
                width={220}
              />
            </div>
            <span>Asistente de BIBLION App</span>
            <h3>Bibi acompaña el estudio</h3>
            <p>
              Bibi nace dentro de BIBLION App para acompañar preguntas, contexto y
              conexiones bíblicas sin abandonar el pasaje estudiado.
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
          title="Una visión compartida, construida en equipo."
          text="BIBLION crece con personas que aportan desde la tecnología, el diseño, la investigación bíblica, la comunicación y la estrategia."
        />
        <div aria-label="Equipo de BIBLION" className="stitch-creators-grid identity-creators-grid">
          {teamMembers.map((member) => (
            <article key={member.name}>
              <div className="identity-creator-photo">
                {member.image ? (
                  <Image
                    alt={`Retrato de ${member.name}`}
                    className="identity-creator-image"
                    fill
                    sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 25vw"
                    src={member.image}
                  />
                ) : (
                  <span className="identity-creator-initials" aria-hidden="true">
                    {member.initials}
                  </span>
                )}
                {member.isFounder && (
                  <span className="identity-creator-badge">Equipo fundador</span>
                )}
              </div>
              <div className="identity-creator-content">
                <p className="identity-creator-area">{member.area}</p>
                <h3>{member.name}</h3>
                <p className="identity-creator-role">{member.role}</p>
                <div className="identity-creator-focus">
                  <span>Su aporte</span>
                  <p>{member.focus}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="identity-team-growth">
          <Sparkles aria-hidden="true" size={20} strokeWidth={1.8} />
          <p>
            <strong>Un equipo abierto a crecer.</strong> Este espacio reconocerá a cada persona que se sume a construir BIBLION.
          </p>
        </div>
      </section>

      <section className="stitch-section identity-transparency" data-reveal>
        <IdentitySectionHeading
          eyebrow="DESARROLLO ABIERTO"
          number="05"
          title="Claridad sobre lo que estamos construyendo."
          text="El ecosistema se construirá por etapas. BIBLION App es el primer producto que estamos preparando para validación pública."
        />
        <div className="identity-status-grid">
          <article>
            <StatusPill tone="local">Visión definida</StatusPill>
            <h3>Ecosistema BIBLION</h3>
            <p>Una marca común para desarrollar herramientas enfocadas en el estudio de la Biblia.</p>
          </article>
          <article>
            <StatusPill tone="beta">En validación</StatusPill>
            <h3>BIBLION App</h3>
            <p>La aplicación Android, Bibi y sus flujos de estudio continúan afinándose.</p>
          </article>
          <article>
            <StatusPill tone="future">Siguiente etapa</StatusPill>
            <h3>Nuevas herramientas</h3>
            <p>El ecosistema podrá crecer hacia otros ámbitos conforme validemos necesidades reales.</p>
          </article>
        </div>
        <div className="identity-transparency-note">
          <div>
            <Bot aria-hidden="true" size={25} />
            <p>
              Las funciones pueden evolucionar mientras realizamos pruebas,
              corregimos errores y escuchamos a quienes prueben BIBLION App.
            </p>
          </div>
          <Link href="/descargar">
            Probar BIBLION App <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <WaitlistCta />
      <SiteFooter />
    </main>
  );
}
