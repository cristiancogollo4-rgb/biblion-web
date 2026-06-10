import Image from "next/image";
import {
  PageHero,
  SiteFooter,
  brandPillars,
  logoMeaning,
} from "@/components/site";

export default function IdentidadPage() {
  return (
    <main className="identity-page">
      <div className="mission-vision-ambient identity-floating-background" aria-hidden="true">
        <span>Palabra</span>
        <span>Estudio</span>
        <span>Enseñanza</span>
        <span>Evangelio</span>
        <span>Contexto</span>
        <span>Discípulos</span>
        <span>Predicación</span>
        <span>Pergamino</span>
        <span>Biblia</span>
        <span>Comunidad</span>
        <span>Verdad</span>
        <span>Doctrina</span>
        <span>Aplicación</span>
        <Image src="/logos/biblion/logo-biblion-app-normal.png" width={88} height={88} alt="" />
        <Image src="/logos/bibi/logo-bibi-normal.png" width={88} height={88} alt="" />
      </div>
      <PageHero
        eyebrow="Identidad visual"
        title="Conoce nuestro proposito e identidad"
        text="Biblion es mucho mas que un ecosistema"
        image="/identidad-hero-biblion.png"
      />

      <section className="section identity-section">
        <section className="mission-vision-panel">
          <div className="section-heading">
            <span>Nuestra misión y visión</span>
            <h2>Una identidad construida para servir al estudio de la Palabra.</h2>
          </div>
          <div className="mission-vision-grid">
            <article className="mission-card">
              <span>MISIÓN</span>
              <p>
                Ayudar a cada creyente a ir más allá de la lectura,
                proporcionando herramientas que faciliten el estudio, la
                comprensión y la construcción de enseñanzas inspiradas en la
                Palabra de Dios.
              </p>
            </article>
            <article className="vision-card">
              <span>VISIÓN</span>
              <p>
                Ser el pergamino digital donde una generación de creyentes
                continúe escribiendo, aprendiendo y compartiendo el conocimiento
                de las Escrituras para impactar al mundo con la verdad del
                Evangelio.
              </p>
            </article>
          </div>
        </section>

        <div className="logo-analysis">
          <div className="logo-analysis-image">
            <Image
              src="/logos/biblion/logo-biblion-normal.png"
              width={440}
              height={320}
              alt="Logotipo principal de Biblion"
            />
          </div>
          <div className="logo-analysis-copy">
            <span>Mas que un Logo</span>
            <h3>Academico y espiritual sin perder claridad digital.</h3>
            <p>
              Biblion está inspirado en la palabra griega biblion, asociada a
              pergamino, libro o rollo. La marca comunica una plataforma que
              ayuda a seguir escribiendo, aprendiendo y compartiendo conocimiento
              con fundamento en la Palabra.
            </p>
            <ul>
              {logoMeaning.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <section className="identity-conviction">
          <span>Nuestra identidad nace de una convicción</span>
          <h2>Biblion existe para ayudar a creyentes a leer, comprender, preparar y compartir la Palabra con profundidad.</h2>
          <p>
            No buscamos que la tecnología sustituya el estudio personal, sino que
            sirva como una herramienta clara, organizada y cercana para crecer en
            la Escritura y transformar ese aprendizaje en enseñanza.
          </p>
        </section>

        <section className="identity-audience">
          <div className="section-heading">
            <span>Para quién existe</span>
            <h2>Una herramienta para quienes quieren estudiar y enseñar mejor.</h2>
          </div>
          <div className="audience-grid">
            <article>
              <strong>Creyentes</strong>
              <p>Personas que desean leer con más claridad y volver a la Palabra con constancia.</p>
            </article>
            <article>
              <strong>Maestros y líderes</strong>
              <p>Servidores que preparan clases, discipulado, devocionales y enseñanzas bíblicas.</p>
            </article>
            <article>
              <strong>Comunidades</strong>
              <p>Iglesias y grupos que buscan crecer juntos en comprensión, orden y aplicación.</p>
            </article>
          </div>
        </section>

        <section className="brand-declaration identity-close">
          <div className="identity-card-heading">
            <span>Lo que sostiene a Biblion</span>
            <h3>Biblion une profundidad bíblica, organización e inteligencia al servicio de la Palabra.</h3>
          </div>
          <div className="brand-pillars" aria-label="Pilares de marca">
            {brandPillars.map((pillar) => (
              <span key={pillar}>{pillar}</span>
            ))}
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
