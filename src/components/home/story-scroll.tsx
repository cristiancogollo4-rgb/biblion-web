"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Bot,
  ChevronDown,
  FilePenLine,
  Heading2,
  Link2,
  List,
  Quote,
  Search,
  Sparkles,
} from "lucide-react";

type StepId = "leer" | "descubrir" | "preguntar" | "construir";

const steps: {
  id: StepId;
  icon: typeof BookOpen;
  label: string;
  title: string;
  text: string;
  href: string;
  linkLabel: string;
}[] = [
  {
    id: "leer",
    icon: BookOpen,
    label: "01 · Leer",
    title: "Una lectura tranquila, incluso sin conexión.",
    text: "Cambia entre seis versiones, avanza de capítulo con un gesto y resalta lo que quieres recordar con cuatro colores.",
    href: "/funciones#lectura",
    linkLabel: "Ver funciones de lectura",
  },
  {
    id: "descubrir",
    icon: Search,
    label: "02 · Descubrir",
    title: "Cada versículo abre un camino.",
    text: "Busca palabras en toda la Biblia, filtra por testamento o libro y sigue referencias cruzadas y temas relacionados.",
    href: "/funciones#descubrir",
    linkLabel: "Explorar búsqueda y temas",
  },
  {
    id: "preguntar",
    icon: Bot,
    label: "03 · Preguntar",
    title: "Bibi responde sin sacarte del pasaje.",
    text: "Consulta personajes, lugares y palabras. Bibi usa primero los recursos de BIBLION y profundiza con internet cuando hace falta.",
    href: "/bibi",
    linkLabel: "Conocer a Bibi",
  },
  {
    id: "construir",
    icon: FilePenLine,
    label: "04 · Construir",
    title: "Lo que descubres se convierte en enseñanza.",
    text: "Escribe en un editor paginado, cita versículos y organiza tu estudio, devocional o predicación junto a la Biblia.",
    href: "/modo-estudio",
    linkLabel: "Ver el Modo estudio",
  },
];

const readerVerses = [
  [1, "Yo soy la vid verdadera, y mi Padre es el labrador."],
  [2, "Todo pámpano que en mí no lleva fruto, lo quitará; y todo aquel que lleva fruto, lo limpiará, para que lleve más fruto."],
  [3, "Ya vosotros estáis limpios por la palabra que os he hablado."],
  [4, "Permaneced en mí, y yo en vosotros. Como el pámpano no puede llevar fruto por sí mismo, si no permanece en la vid, así tampoco vosotros, si no permanecéis en mí."],
  [5, "Yo soy la vid, vosotros los pámpanos; el que permanece en mí, y yo en él, este lleva mucho fruto; porque separados de mí nada podéis hacer."],
] as const;

function PhoneScreen({ id }: { id: StepId }) {
  if (id === "leer") {
    return (
      <div className="story-screen story-screen-reader">
        <header className="story-app-bar">
          <span>Juan 15 <ChevronDown aria-hidden="true" size={12} /></span>
          <span className="story-chip">RVR1960</span>
        </header>
        <p className="story-reader-title">La vid y los pámpanos</p>
        <div className="story-reader-text">
          {readerVerses.map(([number, text]) => (
            <p className={number === 5 ? "story-verse is-highlighted" : "story-verse"} key={number}>
              <sup>{number}</sup>
              <span>{text}</span>
            </p>
          ))}
        </div>
        <div className="story-highlight-bar" aria-hidden="true">
          <span className="is-gold" />
          <span className="is-sage" />
          <span className="is-sky" />
          <span className="is-rose" />
        </div>
      </div>
    );
  }

  if (id === "descubrir") {
    return (
      <div className="story-screen story-screen-search">
        <div className="story-search-field">
          <Search aria-hidden="true" size={13} />
          <span className="story-typing">permanecer</span>
        </div>
        <div className="story-filter-row">
          <span className="is-active">Toda la Biblia</span>
          <span>Antiguo</span>
          <span>Nuevo</span>
        </div>
        <p className="story-list-label">Versículos</p>
        <div className="story-result">
          <strong>Juan 15:4</strong>
          <p><mark>Permaneced</mark> en mí, y yo en vosotros…</p>
        </div>
        <div className="story-result">
          <strong>1 Juan 2:6</strong>
          <p>El que dice que <mark>permanece</mark> en él, debe andar como él anduvo.</p>
        </div>
        <p className="story-list-label">Conectado con Juan 15:5</p>
        <div className="story-xref-row">
          <span><Link2 aria-hidden="true" size={11} /> Colosenses 1:10</span>
          <span><Link2 aria-hidden="true" size={11} /> Juan 15:16</span>
          <span><Link2 aria-hidden="true" size={11} /> Gálatas 5:22</span>
        </div>
        <div className="story-topic">
          <span>F</span>
          <div>
            <strong>Fruto del Espíritu</strong>
            <small>Doctrina · 8 versículos</small>
          </div>
        </div>
      </div>
    );
  }

  if (id === "preguntar") {
    return (
      <div className="story-screen story-screen-bibi">
        <header className="story-app-bar">
          <span className="story-bibi-name">
            <Image alt="" height={18} src="/logos/bibi/bibi-logo-blanco.png" width={18} />
            Bibi
          </span>
          <span className="story-chip">Juan 15</span>
        </header>
        <div className="story-chat">
          <p className="story-bubble is-user">¿Qué significa permanecer en Juan 15?</p>
          <p className="story-bubble is-bibi">
            <span className="story-typing-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="story-bibi-answer">
              Jesús usa la imagen de la vid: la rama da fruto porque sigue unida a ella.
              Permanecer describe una relación continua con Él, y el fruto es su
              consecuencia (Juan 15:4-5).
            </span>
          </p>
          <div className="story-suggestions">
            <span><Sparkles aria-hidden="true" size={10} /> Pasajes sobre permanecer</span>
            <span><Sparkles aria-hidden="true" size={10} /> Profundizar con IA</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="story-screen story-screen-doc">
      <header className="story-app-bar">
        <span>Mis enseñanzas</span>
        <span className="story-chip">Borrador</span>
      </header>
      <div className="story-doc-toolbar" aria-hidden="true">
        <Heading2 size={12} />
        <List size={12} />
        <Quote size={12} />
        <BookOpen size={12} />
      </div>
      <div className="story-doc-page">
        <h4 className="story-block">Permanecer para dar fruto</h4>
        <p className="story-block">
          El fruto no es un logro independiente: nace de una relación constante con Jesús.
        </p>
        <blockquote className="story-block story-doc-verse">
          <small>Juan 15:5 · RVR1960</small>
          Yo soy la vid, vosotros los pámpanos; el que permanece en mí, y yo en él,
          este lleva mucho fruto…
        </blockquote>
        <ul className="story-block">
          <li>¿Qué significa estar unido a la vid?</li>
          <li>¿Qué fruto describe Gálatas 5:22?</li>
        </ul>
      </div>
    </div>
  );
}

export function StoryScroll() {
  const [active, setActive] = useState<StepId>("leer");
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.getAttribute("data-step") as StepId | null;
        if (id) setActive(id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5] }
    );
    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="story-title" className="home-story" id="recorrido">
      <div className="home-story-intro" data-reveal>
        <span className="stitch-eyebrow">UN SOLO HILO DE ESTUDIO</span>
        <h2 id="story-title">
          Del versículo a la enseñanza, <em>sin cambiar de app.</em>
        </h2>
      </div>

      <div className="home-story-layout">
        <div className="home-story-device" aria-hidden="true">
          <div className="story-phone">
            <span className="story-phone-notch" />
            <div className="story-phone-screens">
              {steps.map((step) => (
                <div
                  className={step.id === active ? "story-phone-screen is-active" : "story-phone-screen"}
                  key={step.id}
                >
                  <PhoneScreen id={step.id} />
                </div>
              ))}
            </div>
          </div>
          <div className="story-progress">
            {steps.map((step) => (
              <span className={step.id === active ? "is-active" : undefined} key={step.id} />
            ))}
          </div>
        </div>

        <ol className="home-story-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                className={step.id === active ? "home-story-step is-active" : "home-story-step"}
                data-step={step.id}
                key={step.id}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
              >
                <div className="home-story-inline" aria-hidden="true">
                  <div className="story-phone story-phone-inline">
                    <span className="story-phone-notch" />
                    <div className="story-phone-screens">
                      <div className={step.id === active ? "story-phone-screen is-active" : "story-phone-screen"}>
                        <PhoneScreen id={step.id} />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="home-story-step-label">
                  <Icon aria-hidden="true" size={18} />
                  {step.label}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <Link className="stitch-text-link" href={step.href}>
                  {step.linkLabel} <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
