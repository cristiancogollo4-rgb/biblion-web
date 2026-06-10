import {
  FileText,
  Filter,
  Search,
  SiteFooter,
  SiteHeader,
  teachings,
} from "@/components/site";
import { StudyModeSimulator } from "@/components/study-mode-simulator";
import Image from "next/image";

export default function ModoEstudioPage() {
  return (
    <main>
      <section className="page-hero study-hero">
        <SiteHeader />
        <div className="page-hero-inner study-hero-inner">
          <div className="page-hero-copy">
            <span className="eyebrow">Modo estudio</span>
            <h1>Prepara enseñanzas con lectura, citas y notas en un solo lugar.</h1>
            <p>
              El modo estudio une el lector bíblico con un editor por bloques
              para construir predicaciones, devocionales, clases y estudios sin
              perder el contexto del pasaje.
            </p>
          </div>

          <div className="study-hero-visual" aria-hidden="true">
            <div className="study-hero-orbit" />
            <article className="study-hero-reader-card">
              <div className="study-hero-card-top">
                <span>1 Samuel</span>
                <b>CAP 1</b>
              </div>
              <p><sup>10</sup> Ella con amargura de alma oró a Jehová.</p>
              <span className="study-hero-selected">versículo seleccionado</span>
            </article>

            <div className="study-hero-connector connector-one" />
            <article className="study-hero-quote-card">
              <div>
                <strong>Citar</strong>
                <span>RV1960</span>
                <i>comparar</i>
                <span>TLA</span>
              </div>
              <div className="study-hero-quote-columns">
                <p>oró a Jehová, y lloró abundantemente.</p>
                <p>oraba a Dios mientras lloraba.</p>
              </div>
            </article>

            <div className="study-hero-connector connector-two" />
            <article className="study-hero-editor-card">
              <span>Editor de Estudio</span>
              <h3>La oración que nace del quebranto</h3>
              <p className="study-hero-line wide" />
              <p className="study-hero-line medium" />
              <div className="study-hero-note">Nota</div>
            </article>

            <div className="study-hero-bibi">
              <Image
                alt=""
                height={48}
                src="/logos/bibi/bibi-logo-blanco.png"
                width={48}
              />
            </div>

            <div className="study-hero-tools">
              <div className="study-hero-tool-row study-hero-glyph-row">
                <span>H1</span>
                <span>P</span>
                <span>B</span>
                <span>/</span>
                <span>U</span>
                <span>AA</span>
                <span>aa</span>
                <span>A+</span>
                <span>A-</span>
                <span>Tx</span>
              </div>
              <div className="study-hero-tool-row study-hero-chip-row">
                <b>Color</b>
                <b>Resaltar</b>
                <b>Viñetas</b>
                <b>Numerada</b>
                <b>Columnas</b>
              </div>
              <div className="study-hero-tool-row study-hero-insert-row">
                <b>Nota</b>
                <b>Reflexión</b>
                <b>Citar</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StudyModeSimulator />

      <section className="section library-section study-library-compact">
        <div className="section-heading left">
          <span>Mis enseñanzas</span>
          <h2>Guarda, filtra y continúa cada estudio.</h2>
          <p>
            Cada enseñanza conserva estructura, etiquetas, citas y estado para
            volver a prepararla cuando lo necesites.
          </p>
        </div>
        <div className="library-panel">
          <div className="library-toolbar">
            <div><Search size={16} /> Buscar por título o etiqueta</div>
            <Filter size={18} />
          </div>
          <div className="teaching-grid">
            {teachings.map((teaching) => (
              <article className="teaching-card" key={teaching.title}>
                <div><FileText size={20} /><span>{teaching.status}</span></div>
                <h3>{teaching.title}</h3>
                <div className="mini-tags">
                  {teaching.tags.map((tag) => <b key={tag}>{tag}</b>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
