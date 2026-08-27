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
  Redo2,
  Save,
  Search,
  Sparkles,
  Underline,
  Undo2,
  UserRound,
  X,
} from "lucide-react";
import {
  startTransition,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type TextStyle = "bold" | "italic" | "underline" | "highlight";
type EmbeddedSection = "home" | "bible" | "search" | "study" | "profile";
type Alignment = "left" | "center" | "justify";
type ListMode = "none" | "bullet" | "ordered";
type TextColor = "default" | "gold" | "blue";
type SimulatorTheme = "blue" | "light" | "dark";

type EditorState = {
  styles: TextStyle[];
  alignment: Alignment;
  listMode: ListMode;
  fontSize: number;
  textColor: TextColor;
};

const fontSizes = [12, 14, 16, 18, 20, 24];
const zoomPresets = [75, 100, 125, 150, 200];
const textColors: TextColor[] = ["default", "gold", "blue"];
const simulatorThemes: SimulatorTheme[] = ["blue", "light", "dark"];
const initialEditorState: EditorState = {
  styles: ["highlight"],
  alignment: "left",
  listMode: "none",
  fontSize: 16,
  textColor: "default",
};

export function StudyModeSimulator() {
  const [editorState, setEditorState] = useState(initialEditorState);
  const [undoHistory, setUndoHistory] = useState<EditorState[]>([]);
  const [redoHistory, setRedoHistory] = useState<EditorState[]>([]);
  const [embeddedSection, setEmbeddedSection] = useState<EmbeddedSection>("home");
  const [zoom, setZoom] = useState(75);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantAnswer, setAssistantAnswer] = useState(
    "Pregunta sobre el pasaje o el contexto bíblico sin cerrar tu documento.",
  );
  const [simulatorTheme, setSimulatorTheme] = useState<SimulatorTheme>("blue");
  const [documentOnly, setDocumentOnly] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Cambios sin guardar");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const deviceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateFullscreenState = () => {
      setIsFullscreen(document.fullscreenElement === deviceRef.current);
    };
    document.addEventListener("fullscreenchange", updateFullscreenState);
    return () => document.removeEventListener("fullscreenchange", updateFullscreenState);
  }, []);

  const commitEditorState = (nextState: EditorState) => {
    setUndoHistory((current) => [...current, editorState].slice(-20));
    setRedoHistory([]);
    setEditorState(nextState);
    setSaveStatus("Cambios sin guardar");
  };

  const toggleStyle = (style: TextStyle) => {
    commitEditorState({
      ...editorState,
      styles: editorState.styles.includes(style)
        ? editorState.styles.filter((item) => item !== style)
        : [...editorState.styles, style],
    });
  };

  const stepValue = (
    values: number[],
    current: number,
    direction: -1 | 1,
  ) => {
    const currentIndex = values.indexOf(current);
    return values[Math.min(values.length - 1, Math.max(0, currentIndex + direction))];
  };

  const undo = () => {
    const previous = undoHistory.at(-1);
    if (!previous) return;
    setUndoHistory((current) => current.slice(0, -1));
    setRedoHistory((current) => [editorState, ...current].slice(0, 20));
    setEditorState(previous);
    setSaveStatus("Cambios sin guardar");
  };

  const redo = () => {
    const next = redoHistory[0];
    if (!next) return;
    setRedoHistory((current) => current.slice(1));
    setUndoHistory((current) => [...current, editorState].slice(-20));
    setEditorState(next);
    setSaveStatus("Cambios sin guardar");
  };

  const resetDemo = () => {
    setEditorState(initialEditorState);
    setUndoHistory([]);
    setRedoHistory([]);
    setZoom(75);
    setDocumentOnly(false);
    setAssistantOpen(false);
    setSaveStatus("Cambios sin guardar");
  };

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await deviceRef.current?.requestFullscreen();
    }
  };

  const cycleTextColor = () => {
    const currentIndex = textColors.indexOf(editorState.textColor);
    commitEditorState({
      ...editorState,
      textColor: textColors[(currentIndex + 1) % textColors.length],
    });
  };

  const cycleSimulatorTheme = () => {
    const currentIndex = simulatorThemes.indexOf(simulatorTheme);
    setSimulatorTheme(simulatorThemes[(currentIndex + 1) % simulatorThemes.length]);
  };

  const selectedTextClass = [
    "study-app-selected",
    editorState.styles.includes("bold") ? "is-bold" : "",
    editorState.styles.includes("italic") ? "is-italic" : "",
    editorState.styles.includes("underline") ? "is-underlined" : "",
    editorState.styles.includes("highlight") ? "is-highlighted" : "",
    `align-${editorState.alignment}`,
    `text-${editorState.textColor}`,
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

      <div
        className={`study-live-device study-theme-${simulatorTheme}${documentOnly ? " is-document-only" : ""}${isFullscreen ? " is-fullscreen" : ""}`}
        ref={deviceRef}
      >
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
              <button aria-label="Restablecer demostración" onClick={resetDemo} type="button"><X /></button>
              <strong>Documento sin título</strong>
              <span aria-live="polite">{saveStatus}</span>
              <div>
                <button aria-label="Deshacer" disabled={!undoHistory.length} onClick={undo} type="button"><Undo2 /></button>
                <button aria-label="Rehacer" disabled={!redoHistory.length} onClick={redo} type="button"><Redo2 /></button>
                <button aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"} onClick={toggleFullscreen} type="button"><Maximize /></button>
                <button aria-label={documentOnly ? "Mostrar Biblia y documento" : "Mostrar solo el documento"} aria-pressed={documentOnly} onClick={() => setDocumentOnly((current) => !current)} type="button"><PanelTop /></button>
                <button aria-label="Guardar enseñanza" onClick={() => setSaveStatus("Guardado localmente")} type="button"><Save /></button>
              </div>
            </div>

            <div className="study-editor-toolbar" aria-label="Herramientas reales del editor">
              <div className="study-editor-toolbar-scroll">
                <ToolButton active={editorState.styles.includes("bold")} label="Negrita" onClick={() => toggleStyle("bold")}><Bold /></ToolButton>
                <ToolButton active={editorState.styles.includes("italic")} label="Cursiva" onClick={() => toggleStyle("italic")}><Italic /></ToolButton>
                <ToolButton active={editorState.styles.includes("underline")} label="Subrayado" onClick={() => toggleStyle("underline")}><Underline /></ToolButton>
                <ToolButton active={editorState.textColor !== "default"} label="Cambiar color de texto" onClick={cycleTextColor}><span className={`study-color-letter text-${editorState.textColor}`}>A</span></ToolButton>
                <ToolButton active={editorState.styles.includes("highlight")} label="Color de Resaltado" onClick={() => toggleStyle("highlight")}><Highlighter /></ToolButton>
                <span className="study-editor-divider" />
                <ToolButton active={editorState.listMode === "bullet"} label="Lista viñetas" onClick={() => commitEditorState({ ...editorState, listMode: editorState.listMode === "bullet" ? "none" : "bullet" })}><List /></ToolButton>
                <ToolButton active={editorState.listMode === "ordered"} label="Lista numerada" onClick={() => commitEditorState({ ...editorState, listMode: editorState.listMode === "ordered" ? "none" : "ordered" })}><ListOrdered /></ToolButton>
                <span className="study-editor-divider" />
                <ToolButton active={editorState.alignment === "left"} label="Alinear izquierda" onClick={() => commitEditorState({ ...editorState, alignment: "left" })}><AlignLeft /></ToolButton>
                <ToolButton active={editorState.alignment === "center"} label="Alinear centro" onClick={() => commitEditorState({ ...editorState, alignment: "center" })}><AlignCenter /></ToolButton>
                <ToolButton active={editorState.alignment === "justify"} label="Alinear justificado" onClick={() => commitEditorState({ ...editorState, alignment: "justify" })}><AlignJustify /></ToolButton>
                <span className="study-editor-divider" />
                <button aria-label="Disminuir tamaño de fuente" disabled={editorState.fontSize === fontSizes[0]} onClick={() => commitEditorState({ ...editorState, fontSize: stepValue(fontSizes, editorState.fontSize, -1) })} type="button"><Minus /></button>
                <strong className="study-editor-value" aria-live="polite">{editorState.fontSize}</strong>
                <button aria-label="Aumentar tamaño de fuente" disabled={editorState.fontSize === fontSizes[fontSizes.length - 1]} onClick={() => commitEditorState({ ...editorState, fontSize: stepValue(fontSizes, editorState.fontSize, 1) })} type="button"><Plus /></button>
                <span className="study-editor-divider" />
                <button className="study-zoom-value" aria-label="Cambiar zoom" onClick={() => setZoom(stepValue(zoomPresets, zoom, 1))} type="button">{zoom}%</button>
                <ToolButton active={simulatorTheme !== "blue"} label={`Cambiar tema de la aplicación. Tema actual: ${simulatorTheme}`} onClick={cycleSimulatorTheme}><Palette /></ToolButton>
              </div>
            </div>

            <div className="study-editor-canvas">
              <article className="study-editor-page" style={{ transform: `scale(${zoom / 100})` }}>
                <h2>Permanecer para dar fruto</h2>
                <p>Jesús presenta el fruto como el resultado de permanecer unidos a Él.</p>
                <EditableExample
                  className={selectedTextClass}
                  fontSize={editorState.fontSize}
                  listMode={editorState.listMode}
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
                  <p aria-live="polite">{assistantAnswer}</p>
                  <button onClick={() => setAssistantAnswer("Juan 15:5 presenta a Jesús como la vid y a sus discípulos como ramas: el fruto nace de una relación continua con Él.")} type="button">Explica Juan 15:5</button>
                  <button onClick={() => setAssistantAnswer("Puedes seguir la idea de permanecer en Juan 15:4-7 y relacionarla con Gálatas 5:22-23 sobre el fruto del Espíritu.")} type="button">Muéstrame pasajes relacionados</button>
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
