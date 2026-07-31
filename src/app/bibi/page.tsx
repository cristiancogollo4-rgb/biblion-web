import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  BrainCircuit,
  History,
  Languages,
  Link2,
  MapPin,
  MessageCircleQuestion,
  ShieldCheck,
  Wifi,
  WifiOff,
} from "lucide-react";
import { BibiInteractiveDemo } from "@/components/product-tour";
import {
  PageHero,
  SectionHeading,
  SiteFooter,
  StatusPill,
  WaitlistCta,
} from "@/components/site";

const questions = [
  [MessageCircleQuestion, "Personajes", "¿Quién fue Bernabé?"],
  [MapPin, "Lugares", "¿Dónde quedaba Galilea?"],
  [BookOpen, "Palabras", "¿Qué significa gracia?"],
  [Bot, "Pasajes", "Explícame Juan 1:1"],
  [Link2, "Conexiones", "¿Qué textos se relacionan?"],
  [Languages, "Idioma original", "¿Qué expresa esta palabra?"],
];

const guardrails = [
  "Su dominio es exclusivamente bíblico y cristiano.",
  "Puede cometer errores: las referencias deben verificarse.",
  "No sustituye acompañamiento pastoral, académico ni la lectura directa.",
  "No inventa mensajes personales de Dios ni debe actuar como un oráculo.",
  "No edita ni añade contenido automáticamente al documento.",
  "No funciona como una asistente general para temas ajenos a la Biblia.",
];

export default function BibiPage() {
  return (
    <main className="stitch-page">
      <PageHero
        eyebrow="BIBI · ASISTENTE BÍBLICA DE BIBLION"
        title={<>Pregunta, conecta y <em>profundiza.</em></>}
        text="Bibi utiliza el contexto bíblico disponible para ayudarte a comprender personajes, lugares, palabras y pasajes con límites visibles."
        image="/logos/bibi/logo-bibi-normal.png"
        imageAlt="Logo de Bibi"
      >
        <a className="stitch-button stitch-button-primary" href="#demostracion">
          Ver cómo funciona <ArrowRight size={18} />
        </a>
      </PageHero>

      <section className="stitch-section" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="QUÉ PUEDES PREGUNTARLE"
          title="Distintas puertas de entrada al mismo estudio."
        />
        <div className="stitch-question-grid">
          {questions.map(([Icon, title, example]) => {
            const QuestionIcon = Icon as typeof BookOpen;
            return (
              <article key={String(title)}>
                <QuestionIcon size={22} />
                <strong>{String(title)}</strong>
                <span>{String(example)}</span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="stitch-section" id="demostracion" data-reveal>
        <SectionHeading
          eyebrow="DEMOSTRACIÓN INTERACTIVA"
          title="Una conversación breve, estructurada y verificable."
          text="Esta demostración es local en la web: no envía preguntas ni información personal a un servicio externo."
        />
        <BibiInteractiveDemo />
      </section>

      <section className="stitch-bibi-engine" data-reveal>
        <div>
          <Image
            alt="Bibi"
            height={124}
            src="/logos/bibi/logo-bibi-normal.png"
            width={124}
          />
          <span className="stitch-eyebrow">CÓMO FUNCIONA</span>
          <h2>Primero lo local. Después, la profundidad que necesita conexión.</h2>
        </div>
        <div className="stitch-engine-steps">
          <article>
            <WifiOff size={22} />
            <StatusPill tone="local">RESPUESTA LOCAL</StatusPill>
            <h3>Recursos de BIBLION</h3>
            <p>Diccionario, temas, referencias cruzadas y contexto del pasaje.</p>
          </article>
          <article>
            <Wifi size={22} />
            <StatusPill tone="online">PROFUNDIZACIÓN EN LÍNEA</StatusPill>
            <h3>Servicio de IA</h3>
            <p>Se utiliza cuando la consulta necesita una explicación más amplia.</p>
          </article>
          <article>
            <History size={22} />
            <StatusPill tone="beta">CONTINUIDAD</StatusPill>
            <h3>Memoria conversacional</h3>
            <p>Conserva el tema para comprender preguntas posteriores relacionadas.</p>
          </article>
        </div>
      </section>

      <section className="stitch-section stitch-bibi-contexts" data-reveal>
        <article>
          <span>01 · DURANTE LA LECTURA</span>
          <h2>Comprende el pasaje sin perder el capítulo.</h2>
          <p>
            Bibi puede utilizar el libro, capítulo, versión y versículo seleccionado
            para responder preguntas relacionadas con la lectura.
          </p>
        </article>
        <article>
          <span>02 · EN MODO ESTUDIO</span>
          <h2>Pregunta junto al documento.</h2>
          <p>
            La ventana flotante mantiene visible el editor y conserva la misma
            conversación, pero no modifica el contenido en esta versión.
          </p>
        </article>
      </section>

      <section className="stitch-section stitch-history-privacy" data-reveal>
        <div>
          <History size={25} />
          <h2>Cinco conversaciones recientes</h2>
          <p>
            Puedes crear, abrir o eliminar conversaciones. Al superar cinco, se
            elimina automáticamente la más antigua.
          </p>
        </div>
        <div>
          <ShieldCheck size={25} />
          <h2>Contexto con transparencia</h2>
          <p>
            El historial permanece local. Una consulta profunda puede enviar la
            pregunta y el contexto bíblico o del documento necesario. El nombre
            del perfil no se agrega automáticamente.
          </p>
          <Link className="stitch-text-link" href="/privacidad">
            Conocer cómo se utilizan los datos <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="stitch-guardrails" data-reveal>
        <div>
          <BrainCircuit size={30} />
          <span className="stitch-eyebrow">USO RESPONSABLE</span>
          <h2>Una asistente para formular mejores preguntas, no una autoridad espiritual.</h2>
        </div>
        <ul>
          {guardrails.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <WaitlistCta />
      <SiteFooter />
    </main>
  );
}
