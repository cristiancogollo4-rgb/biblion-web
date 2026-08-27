import Image from "next/image";
import Link from "next/link";
import "./scriptorium.css";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Scriptorium: propuesta interna",
  description: "Propuesta visual interna de BIBLION.",
  path: "/scriptorium",
  noIndex: true,
});

const pilares = [
  {
    n: "01",
    titulo: "Lectura",
    texto:
      "Recorrer la Escritura versículo a versículo, con la atención del copista y la calma del lector.",
  },
  {
    n: "02",
    titulo: "Estudio",
    texto:
      "Pasar del pasaje al documento: notas, citas, columnas, comparación de versiones y bosquejos listos para enseñar.",
  },
  {
    n: "03",
    titulo: "Comunidad",
    texto:
      "Un repositorio curado por publicadores aprobados donde las enseñanzas se comparten sin perder la raíz.",
  },
];

const lecturaDetalle = [
  "Selector de testamento, libro y capítulo con desplazamiento lateral.",
  "Indicadores de versículo como anclas tipográficas, no como decoración.",
  "Cambio de versión y comparación inline en el cuerpo del texto.",
];

const estudioDetalle = [
  "Editor por bloques: párrafo, encabezado, lista, nota, reflexión, cita.",
  "Citas bíblicas vinculadas por rango, con la referencia a la izquierda del texto.",
  "Etiquetas obligatorias por propósito, audiencia, tema y estado.",
];

const bibiDetalle = [
  "Dominio bíblico cerrado: Biblia, doctrina, discipulado, devocionales.",
  "Memoria conversacional para que un seguimiento use el término anterior.",
  "Worker online por dominio, fallback local con diccionario bíblico unificado.",
];

export default function ScriptoriumPage() {
  return (
    <main className="scrip" id="main-content">
      <header className="scrip-topbar">
        <Link href="/" className="scrip-topbar-brand" aria-label="Volver al sitio actual de Biblion">
          <Image
            src="/logos/biblion/logo-biblion-normal.png"
            width={120}
            height={42}
            alt="Biblion"
            priority
          />
          <span className="scrip-topbar-tag">
            <span aria-hidden>·</span> SCRIPTORIUM
          </span>
        </Link>
        <nav className="scrip-topbar-nav" aria-label="Navegación de la propuesta">
          <a href="#pilares">Principios</a>
          <a href="#lectura">Lectura</a>
          <a href="#estudio">Estudio</a>
          <a href="#bibi">Bibi</a>
          <a href="#cierre">Cierre</a>
        </nav>
        <Link href="/" className="scrip-topbar-back">
          Volver al sitio actual →
        </Link>
      </header>

      <section className="scrip-hero" id="inicio">
        <div className="scrip-hero-copy">
          <span className="scrip-eyebrow">
            <span aria-hidden>✦</span> SCRIPTORIUM · PROPUESTA DE DISEÑO 2026
          </span>
          <h1 className="scrip-display">
            Lo que los monjes <em>copiaban</em>,<br />
            tú lo <em>estudias.</em>
          </h1>
          <p className="scrip-lede">
            Biblion es lectura, estudio y comunidad bíblica. Esta página es una
            dirección visual paralela al sitio actual — usa el menú para volver
            al diseño de producción.
          </p>
          <div className="scrip-actions">
            <a href="#pilares" className="scrip-btn scrip-btn-gold">
              Ver la propuesta
            </a>
            <Link href="/" className="scrip-btn scrip-btn-ghost">
              Comparar con el sitio actual
            </Link>
          </div>
          <dl className="scrip-hero-meta">
            <div>
              <dt>66</dt>
              <dd>libros disponibles en la biblioteca local</dd>
            </div>
            <div>
              <dt>6 346</dt>
              <dd>entradas en el diccionario bíblico unificado</dd>
            </div>
            <div>
              <dt>693</dt>
              <dd>temas canónicos curados para explorar</dd>
            </div>
          </dl>
        </div>

        <aside className="scrip-hero-pedestal" aria-label="Versículo de apertura">
          <div className="scrip-pedestal scrip-pedestal-hero">
            <div className="scrip-pedestal-bar" aria-hidden />
            <div className="scrip-pedestal-body">
              <span className="scrip-pedestal-ref">JUAN 3:16 — RV1960</span>
              <p className="scrip-pedestal-text">
                Porque de tal manera amó Dios al mundo, que ha dado a su Hijo
                unigénito, para que todo aquel que en él cree, no se pierda,
                mas tenga vida eterna.
              </p>
              <span className="scrip-pedestal-meta">
                Lectura · capítulo 3 · versículo 16
              </span>
            </div>
          </div>
          <p className="scrip-pedestal-caption">
            <span className="scrip-caption-mark">Fig. 01</span>
            Elemento firma de la propuesta: cada versículo citado se trata como
            una pieza, no como un fragmento de párrafo.
          </p>
        </aside>
      </section>

      <section className="scrip-pilares" id="pilares">
        <header className="scrip-section-head">
          <span className="scrip-section-num">SEC. 01</span>
          <h2 className="scrip-h2">
            Tres oficios de un <em>scriptorium</em>.
          </h2>
          <p className="scrip-section-lede">
            La propuesta se sostiene sobre tres prácticas, no sobre tres
            pantallas. Cada oficio tiene su voz tipográfica y su cadencia.
          </p>
        </header>
        <ol className="scrip-pilares-list">
          {pilares.map((p) => (
            <li key={p.n} className="scrip-pilar">
              <span className="scrip-pilar-n">{p.n}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="scrip-lectura" id="lectura">
        <div className="scrip-lectura-copy">
          <span className="scrip-section-num">SEC. 02</span>
          <h2 className="scrip-h2">
            Leer es un acto <em>tipográfico.</em>
          </h2>
          <p>
            La lectura bíblica en Biblion ya separa los números de versículo
            del cuerpo del texto y respeta el cambio de versión. La propuesta
            visual lleva eso al extremo: la referencia es una pieza, el
            versículo es otra, la nota al margen es otra — y todas respiran.
          </p>
          <ul className="scrip-feature-list">
            {lecturaDetalle.map((d) => (
              <li key={d}>
                <span className="scrip-feature-mark" aria-hidden>
                  ▸
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="scrip-lectura-visual" aria-hidden>
          <div className="scrip-codex">
            <div className="scrip-codex-topbar">
              <span className="scrip-codex-dot" />
              <span className="scrip-codex-dot" />
              <span className="scrip-codex-dot" />
              <strong>1 SAMUEL · CAP. 16</strong>
              <span className="scrip-codex-version">RV1960</span>
            </div>
            <div className="scrip-codex-strip">
              {["15", "16", "17", "18", "19", "20"].map((c) => (
                <span
                  key={c}
                  className={c === "16" ? "scrip-codex-chapter is-active" : "scrip-codex-chapter"}
                >
                  CAP. {c}
                </span>
              ))}
            </div>
            <div className="scrip-codex-body">
              <span className="scrip-codex-section">Unción de David</span>
              <p className="scrip-codex-verse">
                <sup>5</sup>Él respondió: Sí, vengo a ofrecer sacrificio a
                Jehová; santificaos, y venid conmigo.
              </p>
              <p className="scrip-codex-verse">
                <sup>6</sup>Y aconteció que cuando ellos vinieron, él vio a
                Eliab, y dijo: De cierto delante de Jehová está su ungido.
              </p>
              <p className="scrip-codex-verse scrip-codex-verse-highlight">
                <sup>7</sup>Y Jehová dijo a Samuel: No mires a su parecer, ni a
                lo grande de su estatura, porque yo lo desecho.
              </p>
              <p className="scrip-codex-verse">
                <sup>12</sup>Entonces lo hizo venir; y era rubio, de ojos
                hermosos y de buen parecer.
              </p>
            </div>
            <div className="scrip-codex-foot">
              <span className="scrip-codex-footref">RV1960</span>
              <span className="scrip-codex-footref">NVI</span>
              <span className="scrip-codex-footref scrip-codex-footref-on">
                TLA
              </span>
            </div>
          </div>
          <p className="scrip-pedestal-caption scrip-caption-right">
            <span className="scrip-caption-mark">Fig. 02</span>
            Reconstrucción tipográfica del lector. El versículo resaltado usa el
            acento oxidado reservado paraハイライト del usuario.
          </p>
        </div>
      </section>

      <section className="scrip-estudio" id="estudio">
        <div className="scrip-estudio-copy">
          <span className="scrip-section-num">SEC. 03</span>
          <h2 className="scrip-h2">
            Del versículo al <em>bosquejo.</em>
          </h2>
          <p>
            El modo estudio abre un editor por bloques a la derecha del lector
            bíblico. La propuesta visual trata la pantalla dividida como dos
            páginas del mismo codex: la cita a la izquierda, la enseñanza a la
            derecha, ambas con la misma línea de base.
          </p>
        </div>

        <div className="scrip-estudio-frame" aria-hidden>
          <div className="scrip-estudio-pane scrip-estudio-pane-reader">
            <div className="scrip-estudio-pane-head">
              <span>LECTOR</span>
              <strong>1 Samuel 16:5–13</strong>
            </div>
            <div className="scrip-pedestal scrip-pedestal-compact">
              <div className="scrip-pedestal-bar" aria-hidden />
              <div className="scrip-pedestal-body">
                <span className="scrip-pedestal-ref">1 SAMUEL 16:7 — RV1960</span>
                <p className="scrip-pedestal-text">
                  No mires a su parecer, ni a lo grande de su estatura,
                  porque yo lo desecho; porque el hombre mira lo que está
                  delante de sus ojos, mas Jehová mira el corazón.
                </p>
              </div>
            </div>
          </div>
          <div className="scrip-estudio-pane scrip-estudio-pane-editor">
            <div className="scrip-estudio-pane-head scrip-estudio-pane-head-light">
              <span>EDITOR</span>
              <strong>Identidad sin filtro</strong>
            </div>
            <div className="scrip-estudio-doc">
              <h4>Identidad sin filtro</h4>
              <span className="scrip-estudio-label">Nota</span>
              <p>
                Dios no elige por apariencia. La lección no es estética: es
                dónde se pone la mirada.
              </p>
              <span className="scrip-estudio-label scrip-estudio-label-quote">
                Citar
              </span>
              <div className="scrip-estudio-quote">
                <p>
                  <sup>7</sup>Jehová mira el corazón. La mirada divina no se
                  distrae con el envoltorio.
                </p>
              </div>
              <span className="scrip-estudio-label">Aplicación</span>
              <p>
                Antes de presentar a alguien, considerar qué está viendo Dios
                en esa persona hoy.
              </p>
            </div>
          </div>
        </div>

        <ul className="scrip-estudio-list">
          {estudioDetalle.map((d) => (
            <li key={d}>
              <span className="scrip-feature-mark" aria-hidden>
                ▸
              </span>
              {d}
            </li>
          ))}
        </ul>
      </section>

      <section className="scrip-bibi" id="bibi">
        <div className="scrip-bibi-copy">
          <span className="scrip-section-num">SEC. 04</span>
          <h2 className="scrip-h2">
            Un interlocutor,<br />
            <em>no</em> un chat.
          </h2>
          <p>
            Bibi responde dentro del dominio bíblico. La propuesta visual la
            presenta como una carta a media tarde, no como una burbuja de
            notificación: un encabezado con la referencia, una respuesta que se
            lee como párrafo, y una invitación a profundizar.
          </p>
        </div>

        <article className="scrip-bibi-card" aria-label="Conversación con Bibi">
          <header className="scrip-bibi-head">
            <Image
              src="/logos/bibi/logo-bibi-normal.png"
              width={56}
              height={56}
              alt=""
            />
            <div>
              <strong>Bibi</strong>
              <span>Asistente bíblica · Biblion</span>
            </div>
            <span className="scrip-bibi-stamp" aria-hidden>
              ✦
            </span>
          </header>
          <div className="scrip-bibi-thread">
            <div className="scrip-bibi-msg scrip-bibi-msg-user">
              <span className="scrip-bibi-msg-label">Tú</span>
              <p>¿Quién fue David antes de ser rey?</p>
            </div>
            <div className="scrip-bibi-msg scrip-bibi-msg-bibi">
              <span className="scrip-bibi-msg-label">Bibi</span>
              <p>
                David fue el menor de los hijos de Isaí, pastor en Belén.
                Antes de reinar fue músico, custodio de rebaños y ungido en
                privado por Samuel. La Escritura lo presenta como alguien a
                quien Dios forma en silencio antes de exponerlo en público.
              </p>
              <ul className="scrip-bibi-chips">
                <li>Pedir a IA: pasajes sobre David</li>
                <li>Comparar con Saúl</li>
                <li>Profundizar con IA</li>
              </ul>
            </div>
            <div className="scrip-bibi-msg scrip-bibi-msg-user">
              <span className="scrip-bibi-msg-label">Tú</span>
              <p>¿Y por qué fue elegido?</p>
            </div>
            <div className="scrip-bibi-msg scrip-bibi-msg-bibi">
              <span className="scrip-bibi-msg-label">Bibi</span>
              <p>
                Porque la elección no miró la estatura ni la jerarquía
                familiar: miró el corazón. La escena es 1 Samuel 16, y es la
                misma lógica que la propuesta visual repite como principio.
              </p>
            </div>
          </div>
        </article>

        <ul className="scrip-bibi-list">
          {bibiDetalle.map((d) => (
            <li key={d}>
              <span className="scrip-feature-mark" aria-hidden>
                ▸
              </span>
              {d}
            </li>
          ))}
        </ul>
      </section>

      <section className="scrip-comunidad" id="comunidad">
        <header className="scrip-section-head scrip-section-head-left">
          <span className="scrip-section-num">SEC. 05</span>
          <h2 className="scrip-h2">
            Una red curada,<br />
            no un feed.
          </h2>
        </header>
        <div className="scrip-comunidad-grid">
          <article className="scrip-comunidad-card">
            <span className="scrip-comunidad-num">001</span>
            <h3>Publicadores aprobados</h3>
            <p>
              Líderes, maestros y creadores pasan por una revisión antes de
              compartir enseñanzas en el repositorio.
            </p>
          </article>
          <article className="scrip-comunidad-card">
            <span className="scrip-comunidad-num">002</span>
            <h3>Búsqueda por etiquetas</h3>
            <p>
              Propósito, audiencia, tema y estado. La curaduría es el sistema
              de descubrimiento, no el algoritmo.
            </p>
          </article>
          <article className="scrip-comunidad-card">
            <span className="scrip-comunidad-num">003</span>
            <h3>Contadores derivados</h3>
            <p>
              Descargas, guardados y likes se calculan desde hechos — no al
              revés.
            </p>
          </article>
          <article className="scrip-comunidad-card">
            <span className="scrip-comunidad-num">004</span>
            <h3>Perfiles con identidad</h3>
            <p>
              Nombres, alias, biografía y avatar por color. La persona va
              antes que la cuenta.
            </p>
          </article>
        </div>
      </section>

      <section className="scrip-cierre" id="cierre">
        <div className="scrip-pedestal scrip-pedestal-large">
          <div className="scrip-pedestal-bar" aria-hidden />
          <div className="scrip-pedestal-body">
            <span className="scrip-pedestal-ref">SALMO 119:105 — RV1960</span>
            <p className="scrip-pedestal-text">
              Lámpara es a mis pies tu palabra, y lumbrera a mi camino.
            </p>
            <span className="scrip-pedestal-meta">
              Cierre · propuesta visual paralela
            </span>
          </div>
        </div>
        <div className="scrip-cierre-actions">
          <Link href="/" className="scrip-btn scrip-btn-gold">
            Volver al sitio actual
          </Link>
          <a
            href="https://www.instagram.com/biblionoficial/?hl=es"
            target="_blank"
            rel="noreferrer"
            className="scrip-btn scrip-btn-ghost"
          >
            Seguir en Instagram
          </a>
        </div>
        <p className="scrip-cierre-note">
          Esta página es una propuesta de diseño. No reemplaza al sitio en
          producción. Se conserva como referencia visual para comparar
          direcciones.
        </p>
      </section>

      <footer className="scrip-foot">
        <div>
          <strong>Biblion</strong>
          <span>SCRIPTORIUM · propuesta de diseño · 2026</span>
        </div>
        <div>
          <span>Hecho con</span>
          <a href="https://nextjs.org" target="_blank" rel="noreferrer">
            Next.js
          </a>
          <span>·</span>
          <a
            href="https://fonts.google.com/specimen/Cormorant+Garamond"
            target="_blank"
            rel="noreferrer"
          >
            Cormorant Garamond
          </a>
          <span>·</span>
          <a
            href="https://fonts.google.com/specimen/Inter"
            target="_blank"
            rel="noreferrer"
          >
            Inter
          </a>
        </div>
      </footer>
    </main>
  );
}
