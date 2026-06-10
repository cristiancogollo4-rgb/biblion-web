import Image from "next/image";
import { SiteFooter, SiteHeader, features } from "@/components/site";

const functionFlow = [
  {
    step: "01",
    title: "Lee el pasaje",
    text: "Entra por testamento, libro y capítulo con barra superior, capítulos horizontales y lectura enfocada.",
  },
  {
    step: "02",
    title: "Interactúa con el texto",
    text: "Mantén presionado un versículo para activar selección, copiar, citar o resaltar.",
  },
  {
    step: "03",
    title: "Ajusta la experiencia",
    text: "Cambia versión bíblica, tamaño de letra y modo oscuro sin abandonar el capítulo.",
  },
  {
    step: "04",
    title: "Continúa estudiando",
    text: "Cuando preparas una enseñanza, las citas y el contexto pueden pasar al modo estudio.",
  },
];

export default function FuncionesPage() {
  return (
    <main>
      <section className="page-hero funciones-hero">
        <SiteHeader />
        <div className="page-hero-inner funciones-hero-inner">
          <div className="page-hero-copy">
            <span className="eyebrow">Funciones</span>
            <h1>Lee, encuentra y continúa estudiando sin perder el hilo.</h1>
            <p>
              Biblion conecta cada pasaje con tus resaltados, versiones,
              búsquedas y estudios para que la lectura no termine cuando cierras
              el capítulo.
            </p>
          </div>
          <div className="funciones-hero-visual" aria-hidden="true">
            <div className="funciones-logo-orbit">
              <span />
              <span />
              <span />
              <Image
                src="/logos/biblion/logo-biblion-light-app.png"
                width={1000}
                height={1000}
                alt=""
                priority
              />
            </div>
            <span className="funciones-chip chip-lectura">Lectura</span>
            <span className="funciones-chip chip-versiones">Versiones</span>
            <span className="funciones-chip chip-resaltado">Resaltado</span>
            <span className="funciones-chip chip-oscuro">Modo oscuro</span>
          </div>
        </div>
      </section>

      <section className="section reading-flow-section">
        <div className="section-heading">
          <span>De la lectura al estudio</span>
          <h2>Todo sigue conectado desde el primer versículo.</h2>
          <p>
            Estas animaciones siguen el comportamiento real de la app: lector,
            selección de versículos, diálogo de versiones y tema global.
          </p>
        </div>

        <div className="flow-steps" aria-label="Flujo principal de funciones">
          {functionFlow.map((item) => (
            <article className="flow-step" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="function-demo-grid">
          <article className="function-demo-card highlight-demo">
            <div className="function-demo-copy">
              <span>Resaltado real</span>
              <h3>Selecciona un versículo y aplica color.</h3>
              <p>
                En Biblion, una pulsación prolongada activa el menú flotante con
                contador, copiar, citar y paleta de resaltado.
              </p>
            </div>
            <div className="demo-phone reader-flow-phone" aria-hidden="true">
              <div className="demo-reader-appbar">
                <span className="demo-icon">←</span>
                <strong>Juan</strong>
                <div>
                  <span>⌕</span>
                  <span>−</span>
                  <span>+</span>
                </div>
              </div>
              <div className="demo-chapter-strip">
                <span>CAP 13</span>
                <span>CAP 14</span>
                <span className="active">CAP 15</span>
                <span>CAP 16</span>
              </div>
              <div className="demo-reader-lines app-reader-lines">
                <p>
                  <sup>4</sup> Permaneced en mí, y yo en vosotros.
                </p>
                <p className="verse-select-cycle">
                  <sup>5</sup> Yo soy la vid, vosotros los pámpanos.
                </p>
                <p>
                  <sup>6</sup> El que en mí no permanece, será echado fuera.
                </p>
              </div>
              <div className="long-press-ring" />
              <div className="verse-actions-menu">
                <div className="verse-actions-row">
                  <b>1</b>
                  <span>Copiar</span>
                  <span>Citar</span>
                  <i>×</i>
                </div>
                <div className="verse-palette">
                  <span className="clear-color" />
                  <span className="yellow-color" />
                  <span className="green-color" />
                  <span className="red-color" />
                  <span className="blue-color" />
                </div>
              </div>
            </div>
          </article>

          <article className="function-demo-card version-demo">
            <div className="function-demo-copy">
              <span>Cambio de versión</span>
              <h3>Elige traducción y recarga el capítulo.</h3>
              <p>
                El botón flotante de libro abre el diálogo de versiones; al
                elegir una opción, el lector conserva libro y capítulo.
              </p>
            </div>
            <div className="demo-phone version-flow-phone" aria-hidden="true">
              <div className="demo-reader-appbar">
                <span className="demo-icon">←</span>
                <strong>Romanos</strong>
                <div>
                  <span>⌕</span>
                  <span>−</span>
                  <span>+</span>
                </div>
              </div>
              <div className="demo-chapter-strip">
                <span>CAP 7</span>
                <span className="active">CAP 8</span>
                <span>CAP 9</span>
              </div>
              <div className="version-reader-stage">
                <p className="version-rv-text">
                  <sup>28</sup> Todas las cosas les ayudan a bien.
                </p>
                <p className="version-tla-text">
                  <sup>28</sup> Dios va preparando todo para el bien.
                </p>
              </div>
              <div className="version-fab">Biblia</div>
              <div className="version-dialog">
                <h4>Elegir versión</h4>
                <p>Selecciona la traducción para continuar leyendo.</p>
                <div className="version-option selected">
                  <span />
                  <b>Reina Valera 1960</b>
                </div>
                <div className="version-option target">
                  <span />
                  <b>Traducción en Lenguaje Actual (TLA)</b>
                </div>
                <button>CERRAR</button>
              </div>
            </div>
          </article>

          <article className="function-demo-card theme-demo">
            <div className="function-demo-copy">
              <span>Tema global</span>
              <h3>El modo oscuro cambia toda la lectura.</h3>
              <p>
                El ajuste se guarda como preferencia y BiblionTheme actualiza la
                superficie, la barra superior, el texto y los acentos.
              </p>
            </div>
            <div className="demo-phone theme-phone" aria-hidden="true">
              <div className="theme-toggle-demo">
                <span />
              </div>
              <div className="demo-reader-appbar">
                <span className="demo-icon">←</span>
                <strong>Salmos</strong>
                <div>
                  <span>⌕</span>
                  <span>−</span>
                  <span>+</span>
                </div>
              </div>
              <div className="demo-chapter-strip">
                <span>CAP 22</span>
                <span className="active">CAP 23</span>
                <span>CAP 24</span>
              </div>
              <div className="theme-lines">
                <h4>Jehová es mi pastor</h4>
                <p>
                  <sup>1</sup> Jehová es mi pastor; nada me faltará.
                </p>
                <p>
                  <sup>2</sup> En lugares de delicados pastos me hará descansar.
                </p>
                <p>
                  <sup>3</sup> Confortará mi alma; Me guiará por sendas de justicia.
                </p>
              </div>
              <div className="theme-bibi-dot">Bibi</div>
            </div>
          </article>
        </div>
      </section>

      <section className="section features-section">
        <div className="section-heading">
          <span>Funciones que acompañan tu estudio diario</span>
          <h2>Herramientas sencillas para leer con más continuidad.</h2>
        </div>
        <div className="features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="feature-card" key={feature.title}>
                <Icon size={22} />
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                <ul>
                  {feature.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
