import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  History,
  LockKeyhole,
  MessageSquareText,
  ShieldCheck,
  Wifi,
  WifiOff,
} from "lucide-react";
import { BibiInteractiveDemo } from "@/components/product-tour";
import {
  SectionHeading,
  SiteFooter,
  SiteHeader,
  StatusPill,
  WaitlistCta,
} from "@/components/site";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Bibi, asistente bíblica",
  description: "Conoce a Bibi, la asistente bíblica de BIBLION App que ayuda a comprender personajes, lugares, palabras y pasajes.",
  path: "/bibi",
});

const boundaries = [
  [BookOpenCheck, "Dominio bíblico", "Bibi responde sobre la Biblia, el estudio cristiano y su contexto."],
  [ShieldCheck, "Referencias verificables", "Las respuestas pueden contener errores y siempre deben contrastarse con el pasaje."],
  [BrainCircuit, "No reemplaza acompañamiento", "No sustituye la lectura directa, la formación académica ni el cuidado pastoral."],
  [LockKeyhole, "El documento sigue siendo tuyo", "Bibi no modifica ni añade contenido automáticamente a una enseñanza."],
];

export default function BibiPage() {
  return (
    <main className="stitch-page bibi-page" id="main-content">
      <SiteHeader />
      <section className="stitch-page-hero bibi-page-hero">
        <div className="stitch-page-hero-copy">
          <span className="stitch-eyebrow">BIBI · ASISTENTE BÍBLICA DE BIBLION</span>
          <h1>Pregunta, conecta y <em>profundiza.</em></h1>
          <p>
            Bibi vive dentro de BIBLION App para ayudarte a comprender personajes,
            lugares, palabras y pasajes sin perder el contexto de tu lectura o estudio.
          </p>
          <div className="stitch-hero-actions">
            <a className="stitch-button stitch-button-primary" href="#demostracion">
              Conversar con Bibi <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div className="stitch-page-hero-art bibi-hero-art" aria-label="Ejemplo de una conversación con Bibi">
          <div className="bibi-hero-orbit" aria-hidden="true" />
          <div className="bibi-hero-mark">
            <Image
              alt="Logo de Bibi"
              height={220}
              priority
              src="/logos/bibi/bibi-logo-blanco.png"
              width={220}
            />
          </div>
          <div className="bibi-hero-question">¿Qué significa permanecer en Cristo?</div>
          <div className="bibi-hero-answer">
            <MessageSquareText aria-hidden="true" />
            <span>Bibi responde desde el pasaje y te ayuda a seguir profundizando.</span>
          </div>
        </div>
      </section>

      <section className="stitch-section bibi-demo-section" id="demostracion" data-reveal>
        <SectionHeading
          eyebrow="BIBI DENTRO DE LA APP"
          title="El contexto cambia. La conversación continúa."
          text="Alterna entre lectura y Modo estudio, prueba preguntas, abre el historial y crea una conversación nueva. Esta demostración funciona localmente en la web."
        />
        <BibiInteractiveDemo />
      </section>

      <section className="stitch-section bibi-architecture" data-reveal>
        <div className="bibi-architecture-copy">
          <span className="stitch-eyebrow">CÓMO RESPONDE</span>
          <h2>Primero consulta BIBLION. Después profundiza cuando hace falta.</h2>
          <p>
            Bibi no envía cada pregunta directamente a una IA. Primero utiliza los
            recursos bíblicos disponibles en el dispositivo y conserva el hilo de la conversación.
          </p>
        </div>
        <div className="bibi-response-flow">
          <article>
            <span>01</span><WifiOff aria-hidden="true" />
            <StatusPill tone="local">LOCAL</StatusPill>
            <h3>Conocimiento de BIBLION</h3>
            <p>Diccionario, temas, referencias cruzadas y contexto bíblico.</p>
          </article>
          <i aria-hidden="true"><ArrowRight /></i>
          <article>
            <span>02</span><Wifi aria-hidden="true" />
            <StatusPill tone="online">EN LÍNEA</StatusPill>
            <h3>Profundización</h3>
            <p>La conexión se utiliza cuando la consulta necesita una explicación más amplia.</p>
          </article>
          <i aria-hidden="true"><ArrowRight /></i>
          <article>
            <span>03</span><History aria-hidden="true" />
            <StatusPill tone="beta">CONTINUIDAD</StatusPill>
            <h3>Memoria conversacional</h3>
            <p>Comprende preguntas posteriores relacionadas con el mismo tema.</p>
          </article>
        </div>
      </section>

      <section className="stitch-section bibi-conversations" data-reveal>
        <div className="bibi-conversation-stack" aria-hidden="true">
          <article><span>Ahora</span><strong>Juan 15 y permanecer</strong><small>Lectura · 4 mensajes</small></article>
          <article><span>Ayer</span><strong>¿Quién fue Melquisedec?</strong><small>Personajes · 6 mensajes</small></article>
          <article><span>28 jul</span><strong>Esperanza en Romanos</strong><small>Conexiones · 3 mensajes</small></article>
        </div>
        <div className="bibi-conversations-copy">
          <span className="stitch-eyebrow">TUS CONVERSACIONES</span>
          <h2>Hasta cinco chats, siempre bajo tu control.</h2>
          <p>
            Puedes crear, abrir o eliminar conversaciones. Cuando se supera el límite,
            BIBLION elimina automáticamente la más antigua y conserva las cinco recientes.
          </p>
          <div className="bibi-privacy-note">
            <LockKeyhole aria-hidden="true" />
            <p>
              El historial permanece local. Una consulta profunda puede enviar la pregunta
              y únicamente el contexto bíblico o del documento necesario. El nombre del
              perfil no se agrega automáticamente.
            </p>
          </div>
          <Link className="stitch-text-link" href="/privacidad">
            Conocer cómo se utilizan los datos <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="stitch-section bibi-boundaries" data-reveal>
        <SectionHeading
          eyebrow="USO RESPONSABLE"
          title="Una compañera de estudio, no una autoridad espiritual."
          text="Bibi ayuda a formular mejores preguntas y a descubrir conexiones. Tú conservas la responsabilidad de leer, verificar y decidir."
        />
        <div className="bibi-boundary-grid">
          {boundaries.map(([Icon, title, text]) => {
            const BoundaryIcon = Icon as typeof BookOpenCheck;
            return (
              <article key={String(title)}>
                <BoundaryIcon aria-hidden="true" />
                <h3>{String(title)}</h3>
                <p>{String(text)}</p>
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
