"use client";

import Image from "next/image";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  ArrowRight,
  Bold,
  BookOpen,
  BookOpenText,
  FileText,
  Highlighter,
  Home,
  Italic,
  Library,
  List,
  ListOrdered,
  Maximize,
  Minus,
  NotebookPen,
  Palette,
  PanelTop,
  Plus,
  Quote,
  Redo2,
  Save,
  Search,
  Sparkles,
  Underline,
  Undo2,
  UserRound,
  X,
} from "lucide-react";
import { startTransition, type ReactNode, useState } from "react";

type TextStyle = "bold" | "italic" | "underline" | "highlight";
type EmbeddedSection = "home" | "bible" | "search" | "study" | "profile";
type Alignment = "left" | "center" | "justify";
type ListMode = "none" | "bullet" | "ordered";

const fontSizes = [12, 14, 16, 18, 20, 24];
const zoomPresets = [75, 100, 125, 150, 200];

export function StudyModeSimulator() {
  const [styles, setStyles] = useState<TextStyle[]>(["highlight"]);
  const [embeddedSection, setEmbeddedSection] = useState<EmbeddedSection>("home");
  const [alignment, setAlignment] = useState<Alignment>("left");
  const [listMode, setListMode] = useState<ListMode>("none");
  const [fontSize, setFontSize] = useState(16);
  const [zoom, setZoom] = useState(75);
  const [assistantOpen, setAssistantOpen] = useState(false);

  const toggleStyle = (style: TextStyle) => {
    setStyles((current) =>
      current.includes(style)
        ? current.filter((item) => item !== style)
        : [...current, style]
    );
  };

  const stepValue = (
    values: number[],
    current: number,
    direction: -1 | 1,
    setter: (value: number) => void
  ) => {
    const currentIndex = values.indexOf(current);
    setter(values[Math.min(values.length - 1, Math.max(0, currentIndex + direction))]);
  };

  const selectedTextClass = [
    "study-app-selected",
    styles.includes("bold") ? "is-bold" : "",
    styles.includes("italic") ? "is-italic" : "",
    styles.includes("underline") ? "is-underlined" : "",
    styles.includes("highlight") ? "is-highlighted" : "",
    `align-${alignment}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="stitch-section study-live-section" id="editor-interactivo" data-reveal>
      <div className="study-live-heading">
        <div>
          <span className="stitch-eyebrow">EDITOR INTERACTIVO</span>
          <h2>Explora el Modo estudio tal como funciona en BIBLION.</h2>
        </div>
        <p>
          Navega en BIBLION desde la mitad izquierda mientras el documento permanece
          abierto a la derecha. Prueba el formato, el tamaño, el zoom y Bibi.
        </p>
      </div>

      <div className="study-live-device">
        <div className="study-live-status" aria-hidden="true">
          <span>2:57 p.m.</span><span>•••</span><span>Wi-Fi · 79%</span>
        </div>

        <div className="study-app-split">
          <section className="study-embedded-app" aria-label="BIBLION abierto junto al editor">
            <EmbeddedAppHeader />
            <div className="study-embedded-content">
              <EmbeddedPanel section={embeddedSection} />
            </div>
            <EmbeddedNavigation
              active={embeddedSection}
              onChange={(section) => startTransition(() => setEmbeddedSection(section))}
            />
          </section>

          <section className="study-editor-app" aria-label="Editor de Modo estudio">
            <div className="study-editor-header">
              <button aria-label="Salir del Modo Estudio" type="button"><X /></button>
              <strong>Documento sin título</strong>
              <span>Cambios sin guardar</span>
              <div>
                <button aria-label="Deshacer" type="button"><Undo2 /></button>
                <button aria-label="Rehacer" type="button"><Redo2 /></button>
                <button aria-label="Pantalla completa" type="button"><Maximize /></button>
                <button aria-label="Cambiar vista del documento" type="button"><PanelTop /></button>
                <button aria-label="Guardar enseñanza" type="button"><Save /></button>
              </div>
            </div>

            <div className="study-editor-toolbar" aria-label="Herramientas reales del editor">
              <div className="study-editor-toolbar-scroll">
                <ToolButton active={styles.includes("bold")} label="Negrita" onClick={() => toggleStyle("bold")}><Bold /></ToolButton>
                <ToolButton active={styles.includes("italic")} label="Cursiva" onClick={() => toggleStyle("italic")}><Italic /></ToolButton>
                <ToolButton active={styles.includes("underline")} label="Subrayado" onClick={() => toggleStyle("underline")}><Underline /></ToolButton>
                <ToolButton active={false} label="Color de Texto" onClick={() => undefined}><span className="study-color-letter">A</span></ToolButton>
                <ToolButton active={styles.includes("highlight")} label="Color de Resaltado" onClick={() => toggleStyle("highlight")}><Highlighter /></ToolButton>
                <span className="study-editor-divider" />
                <ToolButton active={listMode === "bullet"} label="Lista viñetas" onClick={() => setListMode(listMode === "bullet" ? "none" : "bullet")}><List /></ToolButton>
                <ToolButton active={listMode === "ordered"} label="Lista numerada" onClick={() => setListMode(listMode === "ordered" ? "none" : "ordered")}><ListOrdered /></ToolButton>
                <span className="study-editor-divider" />
                <ToolButton active={alignment === "left"} label="Alinear izquierda" onClick={() => setAlignment("left")}><AlignLeft /></ToolButton>
                <ToolButton active={alignment === "center"} label="Alinear centro" onClick={() => setAlignment("center")}><AlignCenter /></ToolButton>
                <ToolButton active={alignment === "justify"} label="Alinear justificado" onClick={() => setAlignment("justify")}><AlignJustify /></ToolButton>
                <span className="study-editor-divider" />
                <button aria-label="Disminuir tamaño de fuente" disabled={fontSize === fontSizes[0]} onClick={() => stepValue(fontSizes, fontSize, -1, setFontSize)} type="button"><Minus /></button>
                <strong className="study-editor-value" aria-live="polite">{fontSize}</strong>
                <button aria-label="Aumentar tamaño de fuente" disabled={fontSize === fontSizes[fontSizes.length - 1]} onClick={() => stepValue(fontSizes, fontSize, 1, setFontSize)} type="button"><Plus /></button>
                <span className="study-editor-divider" />
                <button className="study-zoom-value" aria-label="Cambiar zoom" onClick={() => stepValue(zoomPresets, zoom, 1, setZoom)} type="button">{zoom}%</button>
                <ToolButton active={false} label="Cambiar tema de la aplicación" onClick={() => undefined}><Palette /></ToolButton>
              </div>
            </div>

            <div className="study-editor-canvas">
              <article className="study-editor-page" style={{ transform: `scale(${zoom / 100})` }}>
                <h2>Permanecer para dar fruto</h2>
                <p>Jesús presenta el fruto como el resultado de permanecer unidos a Él.</p>
                <EditableExample
                  className={selectedTextClass}
                  fontSize={fontSize}
                  listMode={listMode}
                />
                <blockquote>
                  <strong>Juan 15:5 · RVR1960</strong>
                  El que permanece en mí, y yo en él, éste lleva mucho fruto.
                </blockquote>
              </article>

              <button
                aria-label="Abrir Bibi"
                className="study-live-bibi-button"
                onClick={() => setAssistantOpen(true)}
                type="button"
              >
                <Image alt="" height={44} src="/logos/bibi/bibi-logo-blanco.png" width={44} />
              </button>

              {assistantOpen ? (
                <div className="study-live-bibi-chat" role="dialog" aria-label="Bibi dentro del editor">
                  <header>
                    <Image alt="" height={42} src="/logos/bibi/bibi-logo-blanco.png" width={42} />
                    <div><strong>Bibi</strong><span>Asistente bíblica</span></div>
                    <button aria-label="Cerrar Bibi" onClick={() => setAssistantOpen(false)} type="button"><X /></button>
                  </header>
                  <p>Pregunta sobre el pasaje o el contexto bíblico sin cerrar tu documento.</p>
                  <button type="button">Explica Juan 15:5</button>
                  <button type="button">Muéstrame pasajes relacionados</button>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>

      <p className="study-live-note">
        <Sparkles aria-hidden="true" size={15} /> En teléfonos, BIBLION abre este espacio en orientación horizontal y permite alternar entre Biblia y documento.
      </p>
    </section>
  );
}

function EmbeddedAppHeader() {
  return (
    <header className="study-embedded-brand">
      <Image className="study-logo-for-light" alt="" height={42} src="/logos/biblion/logo-biblion-light-app.png" width={42} />
      <Image className="study-logo-for-dark" alt="" height={42} src="/logos/biblion/logo-biblion-dark-app.png" width={42} />
      <strong>BIBLION</strong>
    </header>
  );
}

function EmbeddedPanel({ section }: { section: EmbeddedSection }) {
  if (section === "bible") {
    return (
      <div className="study-panel-books">
        <div className="study-testament-tabs"><strong>ANTIGUO</strong><span>NUEVO</span></div>
        <h3>Selecciona un libro</h3>
        <div className="study-book-filters"><span>Pentateuco</span><span>Históricos</span><span>Sapienciales</span></div>
        <div className="study-book-grid">{["Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio", "Josué", "Jueces", "Rut"].map((book) => <button key={book} type="button">{book}</button>)}</div>
      </div>
    );
  }

  if (section === "search") {
    return (
      <div className="study-panel-search">
        <h3>Buscar pasajes</h3>
        <p>Encuentra pasajes, palabras y conexiones bíblicas.</p>
        <div><Search /><span>Buscar Salmo 23...</span></div>
        <section><strong>Dónde buscar</strong><span>Toda la Biblia</span><span>Antiguo Testamento</span><span>Nuevo Testamento</span></section>
      </div>
    );
  }

  if (section === "study") {
    return (
      <div className="study-panel-teachings">
        <h3>Mis enseñanzas</h3>
        <p>2 enseñanzas guardadas</p>
        <div className="study-teaching-search"><Search /><span>Buscar por título</span></div>
        <article><NotebookPen /><div><strong>La vid verdadera</strong><span>Actualizado hoy · 2 páginas</span></div></article>
        <article><NotebookPen /><div><strong>Identidad en Cristo</strong><span>Actualizado ayer · 1 página</span></div></article>
      </div>
    );
  }

  if (section === "profile") {
    return (
      <div className="study-panel-profile">
        <h3>Perfil</h3>
        <p>Tu recorrido dentro de BIBLION</p>
        <article><span className="study-avatar">C</span><div><strong>cristian cogollo</strong><span>@cristian.cogollo</span><small>Bucaramanga, Colombia</small></div></article>
        <div className="study-profile-stats"><span><strong>2</strong>Enseñanzas</span><span><strong>0</strong>Guardadas</span><span><strong>2</strong>Logros</span></div>
      </div>
    );
  }

  return (
    <div className="study-panel-home">
      <article className="study-verse-card">
        <strong>✦ VERSÍCULO DEL DÍA</strong>
        <p>“Lo mismo harás con el de tu buey y de tu oveja; siete días estará con su madre.”</p>
        <span>Éxodo 22:30</span>
      </article>
      <article className="study-reading-card">
        <header><strong><BookOpenText /> CONTINUAR LECTURA</strong><span>Ir <ArrowRight /></span></header>
        <div><span className="study-book-cover"><BookOpen />GÉNESIS<small>BIBLION</small></span><p><strong>Génesis 5</strong><span>Última lectura</span><small>Génesis presenta la creación del mundo y los comienzos del pacto.</small></p></div>
      </article>
      <article className="study-info-card"><Sparkles /><div><strong>Tu Biblia siempre contigo</strong><span>Lee cuando quieras, incluso sin conexión.</span></div></article>
    </div>
  );
}

function EmbeddedNavigation({ active, onChange }: { active: EmbeddedSection; onChange: (section: EmbeddedSection) => void }) {
  const items: Array<{ id: EmbeddedSection; label: string; icon: typeof Home }> = [
    { id: "home", label: "Home", icon: Home },
    { id: "bible", label: "Biblia", icon: Library },
    { id: "search", label: "Buscar", icon: Search },
    { id: "study", label: "Estudio", icon: NotebookPen },
    { id: "profile", label: "Perfil", icon: UserRound },
  ];

  return (
    <nav className="study-embedded-navigation" aria-label="Navegación de BIBLION dentro del Modo estudio">
      {items.map((item) => {
        const Icon = item.icon;
        return <button className={active === item.id ? "active" : ""} key={item.id} onClick={() => onChange(item.id)} type="button"><Icon /><span>{item.label}</span></button>;
      })}
    </nav>
  );
}

function EditableExample({ className, fontSize, listMode }: { className: string; fontSize: number; listMode: ListMode }) {
  const style = { fontSize: `${fontSize / 16}em` };
  if (listMode === "bullet") return <ul className={className} style={style}><li>Permanecer en la Palabra.</li><li>Depender de Cristo.</li></ul>;
  if (listMode === "ordered") return <ol className={className} style={style}><li>Observar el pasaje.</li><li>Relacionar sus ideas.</li></ol>;
  return <p className={className} style={style}>La comunión precede a la misión y sostiene todo crecimiento.</p>;
}

function ToolButton({ active, children, label, onClick }: { active: boolean; children: ReactNode; label: string; onClick: () => void }) {
  return (
    <button aria-label={label} aria-pressed={active} className={active ? "active" : ""} onClick={onClick} title={label} type="button">
      {children}
    </button>
  );
}
