import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Eye,
  Feather,
  LockKeyhole,
  Smartphone,
  Sparkles,
} from "lucide-react";
import {
  PageHero,
  SectionHeading,
  SiteFooter,
  WaitlistCta,
} from "@/components/site";

const principles = [
  {
    icon: BookOpen,
    title: "La Palabra en el centro",
    text: "La tecnología sirve al texto y facilita una lectura organizada.",
  },
  {
    icon: Smartphone,
    title: "Estudio portátil",
    text: "Lectura, búsqueda y creación permanecen disponibles en un mismo dispositivo.",
  },
  {
    icon: Sparkles,
    title: "Profundidad con claridad",
    text: "Las herramientas ayudan a profundizar sin complicar la experiencia.",
  },
  {
    icon: LockKeyhole,
    title: "Responsabilidad",
    text: "Privacidad, transparencia y límites claros acompañan cada función.",
  },
];

const audiences = [
  ["Lectores", "Personas que buscan una lectura tranquila, personalizable y continua."],
  ["Estudiantes", "Quienes investigan palabras, temas, personajes, lugares y pasajes."],
  ["Maestros y líderes", "Personas que preparan clases, estudios, devocionales o predicaciones."],
  ["Comunidades", "Una visión futura para organizar y compartir recursos de estudio."],
];

const creators = [
  ["Cristian Felipe Cogollo Rodríguez", "Co-fundador y Lead Developer"],
  ["Luis Eduardo Jaimes Hernandez", "Co-fundador y Lead Developer"],
  ["Anderson Geovanny Duarte Largo", "Co-fundador, Estrategia y Alianzas"],
];

export default function IdentidadPage() {
  return (
    <main className="stitch-page">
      <PageHero
        eyebrow="IDENTIDAD"
        title={<>La Biblia como <em>punto de partida.</em></>}
        text="BIBLION es una aplicación de lectura y estudio bíblico creada para comprender, relacionar y organizar lo que descubres en las Escrituras."
        image="/logos/biblion/logo-biblion-app-normal.png"
        imageAlt="Símbolo de BIBLION"
      >
        <Link className="stitch-button stitch-button-primary" href="/funciones">
          Explorar funciones <ArrowRight size={18} />
        </Link>
      </PageHero>

      <section className="stitch-section stitch-origin-section" data-reveal>
        <div className="stitch-origin-index">01</div>
        <div>
          <span className="stitch-eyebrow">NUESTRO ORIGEN</span>
          <h2>Una herramienta local, rápida y libre de ruido innecesario.</h2>
        </div>
        <div>
          <p>
            BIBLION comenzó con la necesidad de reunir lectura, búsqueda y creación
            de enseñanzas en una sola herramienta portátil.
          </p>
          <p>
            En lugar de agregar distracciones, el proyecto busca conservar el hilo:
            leer un pasaje, comprenderlo, encontrar conexiones y organizar lo
            aprendido.
          </p>
        </div>
      </section>

      <section className="stitch-section" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="NUESTROS PRINCIPIOS"
          title="Decisiones que sostienen cada pantalla."
        />
        <div className="stitch-principles-grid">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <article key={principle.title}>
                <Icon size={23} />
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="stitch-symbol-section" data-reveal>
        <div className="stitch-symbol-visual">
          <Image
            alt="Logotipo original de BIBLION"
            height={340}
            src="/logos/biblion/logo-biblion-normal.png"
            width={660}
          />
        </div>
        <div>
          <span className="stitch-eyebrow">EL NOMBRE Y EL SÍMBOLO</span>
          <h2>Libro, lectura y conocimiento en una sola identidad.</h2>
          <p>
            El nombre BIBLION se relaciona con el libro y el rollo escrito. El azul
            comunica profundidad y serenidad; el dorado señala luz, valor y
            permanencia.
          </p>
          <blockquote>
            “La tecnología debe servir al texto, ayudando a comprenderlo y
            organizarlo sin competir por la atención del lector.”
          </blockquote>
        </div>
      </section>

      <section className="stitch-section" data-reveal>
        <SectionHeading
          eyebrow="PARA QUIÉN DISEÑAMOS"
          title="Desde una lectura cotidiana hasta una enseñanza completa."
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

      <section className="stitch-section stitch-creators-section" data-reveal>
        <SectionHeading
          eyebrow="QUIÉNES CONSTRUYEN BIBLION"
          title="Un proyecto con responsables visibles."
          text="BIBLION es desarrollado por un equipo colombiano que combina producto, tecnología y estrategia."
        />
        <div className="stitch-creators-grid">
          {creators.map(([name, role], index) => (
            <article key={name}>
              <div>{name.split(" ").slice(0, 2).map((part) => part[0]).join("")}</div>
              <span>0{index + 1}</span>
              <h3>{name}</h3>
              <p>{role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stitch-development-note" data-reveal>
        <Eye size={27} />
        <div>
          <strong>Un proyecto en desarrollo activo</strong>
          <p>
            Las funciones pueden evolucionar mientras realizamos pruebas,
            corregimos errores y escuchamos a los primeros usuarios.
          </p>
        </div>
        <Feather size={42} aria-hidden="true" />
      </section>

      <WaitlistCta />
      <SiteFooter />
    </main>
  );
}
