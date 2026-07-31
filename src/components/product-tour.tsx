"use client";

import Image from "next/image";
import {
  BookOpen,
  Bookmark,
  ChevronRight,
  FilePenLine,
  Highlighter,
  Home,
  MoreVertical,
  Search,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";

type TourPanel = "home" | "reader" | "search" | "study" | "bibi";

const tourItems = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "reader" as const, label: "Biblia", icon: BookOpen },
  { id: "search" as const, label: "Buscar", icon: Search },
  { id: "study" as const, label: "Estudio", icon: FilePenLine },
  { id: "bibi" as const, label: "Bibi", icon: Sparkles },
];

const appNavigation = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "reader" as const, label: "Biblia", icon: BookOpen },
  { id: "search" as const, label: "Buscar", icon: Search },
  { id: "study" as const, label: "Estudio", icon: FilePenLine },
  { id: "profile" as const, label: "Perfil", icon: UserRound },
];

type ProductTourProps = {
  initialPanel?: TourPanel;
};

export function ProductTour({ initialPanel = "home" }: ProductTourProps) {
  const [activePanel, setActivePanel] = useState<TourPanel>(initialPanel);
  const [manualSelection, setManualSelection] = useState(false);

  useEffect(() => {
    if (manualSelection || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActivePanel((current) => {
        const index = tourItems.findIndex((item) => item.id === current);
        return tourItems[(index + 1) % tourItems.length].id;
      });
    }, 6200);

    return () => window.clearInterval(timer);
  }, [manualSelection]);

  const selectPanel = (panel: TourPanel) => {
    setActivePanel(panel);
    setManualSelection(true);
  };

  return (
    <div className="product-tour" data-reveal>
      <div className="tour-tabs" role="tablist" aria-label="Recorrido por BIBLION">
        {tourItems.map((item) => {
          const Icon = item.icon;
          const selected = activePanel === item.id;
          return (
            <button
              aria-controls={`tour-panel-${item.id}`}
              aria-label={item.label}
              aria-selected={selected}
              className={selected ? "tour-tab tour-tab-active" : "tour-tab"}
              id={`tour-tab-${item.id}`}
              key={item.id}
              onClick={() => selectPanel(item.id)}
              role="tab"
              type="button"
            >
              <Icon aria-hidden="true" size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div
        aria-labelledby={`tour-tab-${activePanel}`}
        className="tour-device-shell"
        id={`tour-panel-${activePanel}`}
        key={activePanel}
        role="tabpanel"
      >
        <div className="tour-device-speaker" />
        <div className="tour-screen">
          <TourScreen panel={activePanel} />
        </div>
      </div>
      <div className="tour-caption" aria-live="polite">
        <span>Explora la experiencia</span>
        <strong>{tourItems.find((item) => item.id === activePanel)?.label}</strong>
      </div>
    </div>
  );
}

function TourScreen({ panel }: { panel: TourPanel }) {
  return (
    <>
      <div className="tour-appbar">
        <Image
          alt="BIBLION"
          className="tour-wordmark tour-wordmark-day"
          height={36}
          src="/logos/biblion/logo-biblion-normal.png"
          width={116}
        />
        <Image
          alt="BIBLION"
          className="tour-wordmark tour-wordmark-night"
          height={36}
          src="/logos/biblion/logo-biblion-blanco.png"
          width={116}
        />
        {panel === "reader" ? <MoreVertical aria-label="Opciones de lectura" size={19} /> : null}
      </div>

      <div className="tour-screen-content">
        {panel === "home" ? <HomePanel /> : null}
        {panel === "reader" ? <ReaderPanel /> : null}
        {panel === "search" ? <SearchPanel /> : null}
        {panel === "study" ? <StudyPanel /> : null}
        {panel === "bibi" ? <BibiPanel /> : null}
      </div>
      <TourBottomNavigation activePanel={panel} />
    </>
  );
}

function HomePanel() {
  return (
    <div className="tour-home-panel">
      <article className="tour-verse-card">
        <span>VERSÍCULO DEL DÍA</span>
        <blockquote>
          “Lámpara es a mis pies tu palabra, y lumbrera a mi camino.”
        </blockquote>
        <strong>Salmos 119:105</strong>
      </article>
      <article className="tour-reading-card">
        <div className="tour-book-cover">JN</div>
        <div>
          <span>CONTINUAR LECTURA</span>
          <strong>Juan 15</strong>
          <p>Permanece en mí</p>
        </div>
        <ChevronRight aria-hidden="true" size={18} />
      </article>
      <div className="tour-news-card">
        <Sparkles aria-hidden="true" size={18} />
        <div>
          <strong>Descubre conexiones ocultas</strong>
          <p>Explora temas y referencias entre pasajes.</p>
        </div>
      </div>
    </div>
  );
}

function ReaderPanel() {
  return (
    <div className="tour-reader-panel">
      <div className="tour-reader-heading">
        <button type="button">Juan 15 <span>⌄</span></button>
        <span>RVR1960</span>
      </div>
      <p className="tour-section-title">Jesús, la vid verdadera</p>
      {[
        "Yo soy la vid verdadera, y mi Padre es el labrador.",
        "Permaneced en mí, y yo en vosotros.",
        "Yo soy la vid, vosotros los pámpanos.",
        "Separados de mí nada podéis hacer.",
      ].map((verse, index) => (
        <p className={index === 2 ? "tour-verse tour-verse-marked" : "tour-verse"} key={verse}>
          <sup>{index + 1}</sup>
          <span>{verse}</span>
          {index === 2 ? <Bookmark aria-label="Versículo guardado" size={16} /> : null}
        </p>
      ))}
      <button className="tour-bibi-fab" aria-label="Pregúntale a Bibi" type="button">
        <Image alt="" height={28} src="/logos/bibi/logo-bibi-normal.png" width={28} />
      </button>
    </div>
  );
}

function SearchPanel() {
  return (
    <div className="tour-search-panel">
      <div className="tour-search-field">
        <Search aria-hidden="true" size={17} />
        <span>amor</span>
      </div>
      <div className="tour-filter-row">
        <span className="active">Toda la Biblia</span>
        <span>Antiguo</span>
        <span>Nuevo</span>
      </div>
      <p className="tour-result-count">Resultados relacionados</p>
      {[
        ["Juan 3:16", "Porque de tal manera amó Dios al mundo..."],
        ["1 Corintios 13:4", "El amor es sufrido, es benigno..."],
        ["1 Juan 4:8", "Dios es amor."],
      ].map(([reference, text]) => (
        <article className="tour-search-result" key={reference}>
          <Highlighter aria-hidden="true" size={15} />
          <div>
            <strong>{reference}</strong>
            <p>{text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function StudyPanel() {
  return (
    <div className="tour-study-panel">
      <div className="tour-study-toolbar">
        <span>H1</span>
        <b>B</b>
        <i>I</i>
        <span>• Lista</span>
        <span>“ Cita</span>
      </div>
      <div className="tour-study-workspace">
        <aside>
          <span>Juan 15</span>
          <p><sup>5</sup> Yo soy la vid, vosotros los pámpanos...</p>
          <button type="button">Citar pasaje</button>
        </aside>
        <article>
          <small>PÁGINA 1</small>
          <h3>Permanecer para dar fruto</h3>
          <p>La vida espiritual nace de permanecer unidos a Cristo.</p>
          <blockquote>Juan 15:5 · RVR1960</blockquote>
        </article>
      </div>
    </div>
  );
}

function BibiPanel() {
  return (
    <div className="tour-bibi-panel">
      <div className="tour-bibi-heading">
        <Image alt="" height={42} src="/logos/bibi/logo-bibi-normal.png" width={42} />
        <div>
          <strong>Bibi</strong>
          <span>Asistente bíblica</span>
        </div>
      </div>
      <div className="tour-chat-bubble tour-chat-user">
        ¿Qué significa permanecer en Juan 15?
      </div>
      <div className="tour-chat-bubble tour-chat-bibi">
        Permanecer expresa una relación continua con Jesús: confiar, recibir su Palabra y vivir desde esa unión.
      </div>
      <div className="tour-suggestions">
        <span>Ver contexto</span>
        <span>Pasajes relacionados</span>
      </div>
      <div className="tour-chat-input">
        <span>Pregunta sobre la Biblia...</span>
        <Send aria-hidden="true" size={16} />
      </div>
    </div>
  );
}

function TourBottomNavigation({ activePanel }: { activePanel: TourPanel }) {
  return (
    <nav className="tour-bottom-nav" aria-label="Navegación de demostración">
      {appNavigation.map((item) => {
        const Icon = item.icon;
        const selected =
          item.id === activePanel || (activePanel === "bibi" && item.id === "reader");
        return (
          <span className={selected ? "active" : ""} key={item.id}>
            <Icon aria-hidden="true" size={15} />
            {item.label}
          </span>
        );
      })}
    </nav>
  );
}

const bibiPrompts = [
  {
    question: "¿Qué significa gracia?",
    answer:
      "La gracia es el favor inmerecido de Dios. En el Nuevo Testamento señala especialmente su iniciativa salvadora manifestada en Cristo.",
    reference: "Efesios 2:8-9",
  },
  {
    question: "Explícame Romanos 8:28",
    answer:
      "El pasaje no promete ausencia de dificultad. Afirma que Dios puede obrar incluso en medio de ella conforme a su propósito.",
    reference: "Romanos 8:28",
  },
  {
    question: "Pasajes relacionados con esperanza",
    answer:
      "Puedes comenzar con Romanos 5:3-5, Romanos 15:13 y 1 Pedro 1:3. Cada texto presenta una dimensión distinta de la esperanza cristiana.",
    reference: "3 conexiones",
  },
];

export function BibiInteractiveDemo() {
  const [activePrompt, setActivePrompt] = useState(0);
  const current = bibiPrompts[activePrompt];

  return (
    <div className="bibi-live-demo" data-reveal>
      <div className="bibi-live-sidebar">
        <span>PRUEBA UNA PREGUNTA</span>
        {bibiPrompts.map((prompt, index) => (
          <button
            className={index === activePrompt ? "active" : ""}
            key={prompt.question}
            onClick={() => setActivePrompt(index)}
            type="button"
          >
            {prompt.question}
            <ChevronRight aria-hidden="true" size={16} />
          </button>
        ))}
      </div>
      <div className="bibi-live-conversation" key={current.question}>
        <div className="bibi-live-brand">
          <Image alt="" height={44} src="/logos/bibi/logo-bibi-normal.png" width={44} />
          <div><strong>Bibi</strong><span>Contexto bíblico, no respuestas generales</span></div>
        </div>
        <div className="bibi-live-user">{current.question}</div>
        <div className="bibi-live-answer">
          <Sparkles aria-hidden="true" size={17} />
          <p>{current.answer}</p>
          <span>{current.reference}</span>
        </div>
        <p className="bibi-live-note">
          Bibi te acompaña y conserva el contexto, pero no modifica tu enseñanza.
        </p>
      </div>
    </div>
  );
}
