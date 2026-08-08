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
  Pause,
  Play,
  Search,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { type KeyboardEvent, useEffect, useState } from "react";

type TourPanel = "home" | "reader" | "search" | "study" | "profile";

const tourItems = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "reader" as const, label: "Biblia", icon: BookOpen },
  { id: "search" as const, label: "Buscar", icon: Search },
  { id: "study" as const, label: "Estudio", icon: FilePenLine },
  { id: "profile" as const, label: "Perfil", icon: UserRound },
];

const appNavigation = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "reader" as const, label: "Biblia", icon: BookOpen },
  { id: "search" as const, label: "Buscar", icon: Search },
  { id: "study" as const, label: "Estudio", icon: FilePenLine },
  { id: "profile" as const, label: "Perfil", icon: UserRound },
];

const tourDetails: Record<TourPanel, {
  eyebrow: string;
  title: string;
  text: string;
  features: string[];
  requirement: string;
}> = {
  home: {
    eyebrow: "TU PUNTO DE PARTIDA",
    title: "Retoma la lectura sin buscar dónde estabas.",
    text: "El inicio reúne el versículo del día, la última lectura y novedades útiles sin convertir la pantalla en un panel saturado.",
    features: ["Versículo diario", "Continuar lectura", "Novedades de BIBLION"],
    requirement: "Disponible sin conexión",
  },
  reader: {
    eyebrow: "LECTURA BÍBLICA",
    title: "Lee, resalta y pregunta en el mismo lugar.",
    text: "El lector mantiene visible el capítulo, permite ajustar la experiencia y abre a Bibi sobre el pasaje cuando necesitas contexto.",
    features: ["Navegación por gestos", "Versiones y tamaño de texto", "Bibi contextual"],
    requirement: "Lectura local · Bibi local + conexión",
  },
  search: {
    eyebrow: "DESCUBRIMIENTO",
    title: "Filtra resultados que sí corresponden a tu búsqueda.",
    text: "Consulta palabras o frases en toda la Biblia, por testamento o por libro y abre el resultado directamente en su capítulo.",
    features: ["Filtros combinables", "Historial reciente", "Acceso directo al pasaje"],
    requirement: "Disponible sin conexión",
  },
  study: {
    eyebrow: "MODO ESTUDIO",
    title: "Construye una enseñanza sin perder el pasaje.",
    text: "La Biblia y el documento comparten el espacio. Bibi puede acompañar la investigación sin modificar el contenido que estás creando.",
    features: ["Editor paginado", "Seis tipos de bloque", "Bibi como ventana flotante"],
    requirement: "Editor local · Bibi local + conexión",
  },
  profile: {
    eyebrow: "TU EXPERIENCIA",
    title: "Tus preferencias permanecen reunidas.",
    text: "Desde Perfil puedes administrar tu identidad, versión bíblica, tamaño de lectura, tema y acceso a la cuenta.",
    features: ["Tres temas", "Preferencias de lectura", "Cuenta y sincronización"],
    requirement: "Preferencias locales · Sincronización con cuenta",
  },
};

type ProductTourProps = {
  initialPanel?: TourPanel;
};

export function ProductTour({ initialPanel = "home" }: ProductTourProps) {
  const [activePanel, setActivePanel] = useState<TourPanel>(initialPanel);
  const [manualSelection, setManualSelection] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  useEffect(() => {
    if (manualSelection || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setAssistantOpen(false);
      setActivePanel((current) => {
        const index = tourItems.findIndex((item) => item.id === current);
        return tourItems[(index + 1) % tourItems.length].id;
      });
    }, 6200);

    return () => window.clearInterval(timer);
  }, [isPaused, manualSelection]);

  const selectPanel = (panel: TourPanel) => {
    setActivePanel(panel);
    setManualSelection(true);
    setAssistantOpen(false);
  };

  const openAssistant = () => {
    setAssistantOpen(true);
    setManualSelection(true);
  };

  const togglePlayback = () => {
    if (manualSelection || isPaused) {
      setManualSelection(false);
      setIsPaused(false);
      return;
    }
    setIsPaused(true);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + offset + tourItems.length) % tourItems.length;
    const nextPanel = tourItems[nextIndex].id;
    selectPanel(nextPanel);
    document.getElementById(`tour-tab-${nextPanel}`)?.focus();
  };

  const currentDetails = tourDetails[activePanel];
  const playbackPaused = manualSelection || isPaused;

  return (
    <div className="product-tour" data-reveal>
      <div className="tour-stage">
        <div className="tour-tabs" role="tablist" aria-label="Recorrido por BIBLION">
          {tourItems.map((item, index) => {
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
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                role="tab"
                tabIndex={selected ? 0 : -1}
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
            <TourScreen
              assistantOpen={assistantOpen}
              onCloseAssistant={() => setAssistantOpen(false)}
              onOpenAssistant={openAssistant}
              panel={activePanel}
            />
          </div>
        </div>
        <div className="tour-caption" aria-live="polite">
          <span>Explora la experiencia</span>
          <button onClick={togglePlayback} type="button">
            {playbackPaused ? <Play aria-hidden="true" size={13} /> : <Pause aria-hidden="true" size={13} />}
            {playbackPaused ? "Reanudar" : "Pausar"}
          </button>
        </div>
      </div>

      <aside className="tour-details" key={`details-${activePanel}`} aria-live="polite">
        <span>{currentDetails.eyebrow}</span>
        <h3>{currentDetails.title}</h3>
        <p>{currentDetails.text}</p>
        <ul>
          {currentDetails.features.map((feature) => (
            <li key={feature}><Sparkles aria-hidden="true" size={16} />{feature}</li>
          ))}
        </ul>
        <strong>{currentDetails.requirement}</strong>
        {(activePanel === "reader" || activePanel === "study") && !assistantOpen ? (
          <button className="tour-assistant-trigger" onClick={openAssistant} type="button">
            <Image alt="" height={24} src="/logos/bibi/logo-bibi-normal.png" width={24} />
            Abrir a Bibi en esta pantalla
          </button>
        ) : null}
      </aside>
    </div>
  );
}

function TourScreen({
  assistantOpen,
  onCloseAssistant,
  onOpenAssistant,
  panel,
}: {
  assistantOpen: boolean;
  onCloseAssistant: () => void;
  onOpenAssistant: () => void;
  panel: TourPanel;
}) {
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
        {panel === "reader" ? <ReaderPanel onOpenAssistant={onOpenAssistant} /> : null}
        {panel === "search" ? <SearchPanel /> : null}
        {panel === "study" ? <StudyPanel onOpenAssistant={onOpenAssistant} /> : null}
        {panel === "profile" ? <ProfilePanel /> : null}
        {assistantOpen ? <BibiOverlay onClose={onCloseAssistant} /> : null}
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

function ReaderPanel({ onOpenAssistant }: { onOpenAssistant: () => void }) {
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
      <button className="tour-bibi-fab" aria-label="Pregúntale a Bibi" onClick={onOpenAssistant} type="button">
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

function StudyPanel({ onOpenAssistant }: { onOpenAssistant: () => void }) {
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
      <button className="tour-bibi-fab tour-study-bibi-fab" aria-label="Abrir a Bibi en el editor" onClick={onOpenAssistant} type="button">
        <Image alt="" height={28} src="/logos/bibi/logo-bibi-normal.png" width={28} />
      </button>
    </div>
  );
}

function ProfilePanel() {
  return (
    <div className="tour-profile-panel">
      <div className="tour-profile-person">
        <span>CC</span>
        <div>
          <strong>Tu perfil</strong>
          <p>Lectura, preferencias y cuenta</p>
        </div>
      </div>
      <div className="tour-profile-stats">
        <span><strong>Lector</strong>Rol</span>
        <span><strong>FREE</strong>Plan</span>
        <span><strong>Privado</strong>Perfil</span>
      </div>
      <div className="tour-profile-settings">
        <span><BookOpen aria-hidden="true" size={17} /><span><strong>Versión bíblica</strong>RVR1960</span><ChevronRight size={15} /></span>
        <span><FilePenLine aria-hidden="true" size={17} /><span><strong>Tamaño de texto</strong>Mediano</span><ChevronRight size={15} /></span>
        <span><Sparkles aria-hidden="true" size={17} /><span><strong>Tema de la aplicación</strong>Azul</span><ChevronRight size={15} /></span>
      </div>
    </div>
  );
}

function BibiOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div aria-label="Demostración de Bibi" className="tour-bibi-panel tour-bibi-overlay" role="dialog">
      <button aria-label="Cerrar Bibi" className="tour-bibi-close" onClick={onClose} type="button">
        <X aria-hidden="true" size={17} />
      </button>
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
        const selected = item.id === activePanel;
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
