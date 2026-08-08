"use client";

import Image from "next/image";
import {
  BookOpen,
  Bookmark,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FilePenLine,
  Filter,
  Grid2X2,
  History,
  Home,
  LibraryBig,
  Link2,
  MapPin,
  Maximize2,
  Menu,
  MessageCircleMore,
  MoreVertical,
  Pause,
  Play,
  Plus,
  Redo2,
  Save,
  Search,
  Settings,
  Sparkles,
  Star,
  Undo2,
  UserRound,
  X,
} from "lucide-react";
import { startTransition, type KeyboardEvent, useEffect, useState } from "react";

type TourPanel = "home" | "books" | "reader" | "search" | "study" | "editor" | "profile";

const tourItems = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "books" as const, label: "Libros", icon: LibraryBig },
  { id: "reader" as const, label: "Lectura", icon: BookOpen },
  { id: "search" as const, label: "Buscar", icon: Search },
  { id: "study" as const, label: "Enseñanzas", icon: FilePenLine },
  { id: "editor" as const, label: "Editor", icon: FilePenLine },
  { id: "profile" as const, label: "Perfil", icon: UserRound },
];

const mainNavigation = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "books" as const, label: "Biblia", icon: BookOpen },
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
    title: "Retoma exactamente donde lo dejaste.",
    text: "El inicio reúne el versículo del día, la última lectura y novedades útiles en una vista pensada para tablet.",
    features: ["Versículo diario", "Continuar lectura", "Novedades de BIBLION"],
    requirement: "Disponible sin conexión",
  },
  books: {
    eyebrow: "BIBLIOTECA BÍBLICA",
    title: "Encuentra un libro por testamento y categoría.",
    text: "La selección conserva a la vista los dos testamentos, las categorías y la cuadrícula completa de libros.",
    features: ["Antiguo y Nuevo Testamento", "Categorías por color", "Acceso directo al libro"],
    requirement: "Disponible sin conexión",
  },
  reader: {
    eyebrow: "LECTURA BÍBLICA",
    title: "El capítulo ocupa el lugar principal.",
    text: "El lector aprovecha el ancho de la tablet, mantiene la versión visible y deja las acciones secundarias fuera del texto.",
    features: ["Capítulo siempre visible", "Cambio de versión", "Bibi desde la lectura"],
    requirement: "Lectura local · Bibi local + conexión",
  },
  search: {
    eyebrow: "DESCUBRIMIENTO",
    title: "Busca y filtra sin perder contexto.",
    text: "La búsqueda permite combinar testamento y libro, recuperar consultas recientes y comenzar desde temas populares.",
    features: ["Filtros combinables", "Búsquedas recientes", "Exploración por temas"],
    requirement: "Disponible sin conexión",
  },
  study: {
    eyebrow: "TUS ENSEÑANZAS",
    title: "Organiza lo que ya construiste.",
    text: "Las enseñanzas guardadas se pueden buscar, filtrar por etiquetas y abrir nuevamente desde una sola vista.",
    features: ["Búsqueda por título", "Filtros por etiquetas", "Documentos guardados localmente"],
    requirement: "Guardado local",
  },
  editor: {
    eyebrow: "MODO ESTUDIO",
    title: "Biblia y documento comparten la pantalla.",
    text: "En tablet, la lectura permanece a la izquierda mientras el editor y sus herramientas ocupan la mitad derecha.",
    features: ["Pantalla dividida", "Formato de texto", "Bibi flotante en el editor"],
    requirement: "Editor local · Bibi local + conexión",
  },
  profile: {
    eyebrow: "TU EXPERIENCIA",
    title: "Actividad, logros y preferencias en un solo lugar.",
    text: "El perfil reúne identidad, estado del plan, progreso, logros recientes y acceso a la configuración personal.",
    features: ["Perfil sin datos de muestra", "Actividad y logros", "Preferencias de la aplicación"],
    requirement: "Preferencias locales · Sincronización con cuenta",
  },
};

type ProductTourProps = { initialPanel?: TourPanel };

export function ProductTour({ initialPanel = "home" }: ProductTourProps) {
  const [activePanel, setActivePanel] = useState<TourPanel>(initialPanel);
  const [manualSelection, setManualSelection] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  useEffect(() => {
    if (manualSelection || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setAssistantOpen(false);
      setActivePanel((current) => {
        const index = tourItems.findIndex((item) => item.id === current);
        return tourItems[(index + 1) % tourItems.length].id;
      });
    }, 8500);
    return () => window.clearInterval(timer);
  }, [isPaused, manualSelection]);

  const selectPanel = (panel: TourPanel) => {
    startTransition(() => setActivePanel(panel));
    setAssistantOpen(false);
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
    <div className="product-tour product-tour-tablet" data-reveal>
      <div className="tour-stage">
        <div className="tour-tabs" role="tablist" aria-label="Recorrido interactivo por BIBLION App">
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
                <Icon aria-hidden="true" size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div
          aria-labelledby={`tour-tab-${activePanel}`}
          className="tour-device-shell tour-tablet-shell"
          id={`tour-panel-${activePanel}`}
          role="tabpanel"
        >
          <span className="tour-tablet-camera" aria-hidden="true" />
          <div className="tour-screen tour-tablet-screen" key={activePanel}>
            <TabletMockup
              activePanel={activePanel}
              assistantOpen={assistantOpen}
              onCloseAssistant={() => setAssistantOpen(false)}
              onNavigate={selectPanel}
              onOpenAssistant={() => {
                setAssistantOpen(true);
                setManualSelection(true);
              }}
            />
          </div>
        </div>

        <div className="tour-caption" aria-live="polite">
          <span>Mockup interactivo · Flujo real</span>
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
      </aside>
    </div>
  );
}

function TabletMockup({
  activePanel,
  assistantOpen,
  onCloseAssistant,
  onNavigate,
  onOpenAssistant,
}: {
  activePanel: TourPanel;
  assistantOpen: boolean;
  onCloseAssistant: () => void;
  onNavigate: (panel: TourPanel) => void;
  onOpenAssistant: () => void;
}) {
  const [profileSettingsOpen, setProfileSettingsOpen] = useState(false);

  if (activePanel === "editor") {
    return <EditorMockup assistantOpen={assistantOpen} onCloseAssistant={onCloseAssistant} onNavigate={onNavigate} onOpenAssistant={onOpenAssistant} />;
  }

  return (
    <div className="mock-app-screen">
      <TabletStatusBar />
      {activePanel === "reader" ? null : (
        <MockBrandBar
          onOpenSettings={activePanel === "profile" ? () => setProfileSettingsOpen(true) : undefined}
        />
      )}
      {activePanel === "home" ? <HomeMockup onNavigate={onNavigate} /> : null}
      {activePanel === "books" ? <BooksMockup onNavigate={onNavigate} /> : null}
      {activePanel === "reader" ? <ReaderMockup onNavigate={onNavigate} onOpenAssistant={onOpenAssistant} /> : null}
      {activePanel === "search" ? <SearchMockup /> : null}
      {activePanel === "study" ? <StudyMockup onNavigate={onNavigate} /> : null}
      {activePanel === "profile" ? (
        <ProfileMockup
          onCloseSettings={() => setProfileSettingsOpen(false)}
          settingsOpen={profileSettingsOpen}
        />
      ) : null}
      {assistantOpen ? <BibiTabletOverlay onClose={onCloseAssistant} /> : null}
      <MockBottomNavigation activePanel={activePanel} onNavigate={onNavigate} />
    </div>
  );
}

function TabletStatusBar() {
  return (
    <div className="mock-status-bar" aria-hidden="true">
      <span>2:57 p.m. · ● ● ●</span>
      <span>•••</span>
      <span>⌁ ᯤ ▣79</span>
    </div>
  );
}

function MockBrandBar({ onOpenSettings }: { onOpenSettings?: () => void }) {
  return (
    <div className="mock-brand-bar">
      <div className="mock-wordmark">
        <Image className="mock-wordmark-logo mock-wordmark-logo-light" alt="" height={44} src="/logos/biblion/logo-biblion-light-app.png" width={44} />
        <Image className="mock-wordmark-logo mock-wordmark-logo-dark" alt="" height={44} src="/logos/biblion/logo-biblion-dark-app.png" width={44} />
        <strong>BIBLION</strong>
      </div>
      {onOpenSettings ? (
        <button aria-label="Abrir configuración de perfil" onClick={onOpenSettings} type="button">
          <Settings size={18} />
        </button>
      ) : null}
    </div>
  );
}

function HomeMockup({ onNavigate }: { onNavigate: (panel: TourPanel) => void }) {
  return (
    <div className="mock-page mock-home-page">
      <article className="mock-daily-verse">
        <strong><Sparkles size={15} /> VERSÍCULO DEL DÍA</strong>
        <blockquote>“Lo mismo harás con el de tu buey y de tu oveja; siete días estará con su madre, y al octavo día me lo darás.”</blockquote>
        <span>Éxodo 22:30</span>
      </article>
      <button className="mock-continue-card" onClick={() => onNavigate("reader")} type="button">
        <header><span><BookOpen size={15} /> CONTINUAR LECTURA</span><span>Ir <ChevronRight size={14} /></span></header>
        <div className="mock-continue-content">
          <span className="mock-book-cover"><BookOpen size={16} /><small>1 REYES</small><em>BIBLION</em></span>
          <div><strong>1 Reyes 1</strong><span>Última lectura</span><p>1 Reyes registra la historia del reino unido de Israel bajo los reinados de Salomón y sus sucesores.</p><small>1 Reyes 1:1</small></div>
        </div>
      </button>
      <article className="mock-home-news">
        <span><Link2 size={19} /></span>
        <div><strong>Descubre conexiones ocultas</strong><p>Explora cómo versículos de Mateo se conectan con pasajes de Isaías.</p></div>
        <button onClick={() => onNavigate("search")} type="button">Explorar pasajes <ChevronRight size={13} /></button>
      </article>
    </div>
  );
}

const oldTestamentBooks = [
  ["Génesis", "law"], ["Éxodo", "law"], ["Levítico", "law"], ["Números", "law"], ["Deuteronomio", "law"],
  ["Josué", "history"], ["Jueces", "history"], ["Rut", "history"], ["1 Samuel", "history"], ["2 Samuel", "history"],
  ["1 Reyes", "history"], ["2 Reyes", "history"], ["1 Crónicas", "history"], ["2 Crónicas", "history"], ["Esdras", "history"],
  ["Nehemías", "history"], ["Ester", "history"], ["Job", "wisdom"], ["Salmos", "wisdom"], ["Proverbios", "wisdom"],
  ["Eclesiastés", "wisdom"], ["Isaías", "prophecy"], ["Jeremías", "prophecy"], ["Ezequiel", "prophecy"],
];

function BooksMockup({ onNavigate }: { onNavigate: (panel: TourPanel) => void }) {
  const [testament, setTestament] = useState<"old" | "new">("old");
  return (
    <div className="mock-page mock-books-page">
      <div className="mock-testament-switch">
        <button className={testament === "old" ? "active" : ""} onClick={() => setTestament("old")} type="button">ANTIGUO</button>
        <button className={testament === "new" ? "active" : ""} onClick={() => setTestament("new")} type="button">NUEVO</button>
      </div>
      <h3>Selecciona un libro</h3>
      <div className="mock-category-chips"><span>Pentateuco</span><span>Históricos</span><span>Sapienciales</span><span>Proféticos</span></div>
      <div className="mock-books-grid">
        {(testament === "old" ? oldTestamentBooks : [["Mateo", "gospel"], ["Marcos", "gospel"], ["Lucas", "gospel"], ["Juan", "gospel"], ["Hechos", "history"], ["Romanos", "letters"], ["1 Corintios", "letters"], ["2 Corintios", "letters"]]).map(([book, category]) => (
          <button className={`mock-book-card is-${category}`} key={book} onClick={() => book === "1 Reyes" || testament === "new" ? onNavigate("reader") : undefined} type="button">{book}</button>
        ))}
      </div>
    </div>
  );
}

function ReaderMockup({ onNavigate, onOpenAssistant }: { onNavigate: (panel: TourPanel) => void; onOpenAssistant: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const verses = [
    "Cuando el rey David era viejo y avanzado en días, le cubrían de ropas, pero no se calentaba.",
    "Le dijeron, por tanto, sus siervos: Busquen para mi señor el rey una joven virgen, para que esté delante del rey y lo abrigue.",
    "Y buscaron una joven hermosa por toda la tierra de Israel, y hallaron a Abisag sunamita, y la trajeron al rey.",
    "Y la joven era hermosa; y ella abrigaba al rey, y le servía; pero el rey nunca la conoció.",
    "Entonces Adonías hijo de Haguit se rebeló, diciendo: Yo reinaré. Y se hizo de carros y de gente de a caballo.",
    "Y su padre nunca le había entristecido en todos sus días con decirle: ¿Por qué haces así?",
  ];
  return (
    <div className="mock-reader-page">
      <header className="mock-reader-bar">
        <button aria-label="Volver a libros" onClick={() => onNavigate("books")} type="button"><ChevronLeft /></button>
        <button type="button">1 Reyes 1 <ChevronDown /></button>
        <div><span>RVR1960</span><button aria-label="Opciones de lectura" onClick={() => setMenuOpen((open) => !open)} type="button"><MoreVertical /></button></div>
      </header>
      <div className="mock-reader-text" style={{ fontSize: `${fontSize / 8.5}cqw` }}>
        <strong>Abisag sirve a David</strong>
        {verses.slice(0, 4).map((verse, index) => <p key={verse}><sup>{index + 1}</sup>{verse}</p>)}
        <strong>Adonías usurpa el trono</strong>
        {verses.slice(4).map((verse, index) => <p key={verse}><sup>{index + 5}</sup>{verse}</p>)}
      </div>
      {menuOpen ? (
        <div className="mock-reader-menu">
          <span>Tamaño del texto <strong>{fontSize}px</strong></span>
          <input aria-label="Tamaño del texto" min="13" max="22" value={fontSize} onInput={(event) => setFontSize(Number(event.currentTarget.value))} type="range" />
        </div>
      ) : null}
      <button className="mock-bibi-fab" aria-label="Pregúntale a Bibi" onClick={onOpenAssistant} type="button"><Image alt="" src="/logos/bibi/bibi-logo-blanco.png" width={36} height={36} /></button>
    </div>
  );
}

function SearchMockup() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("all");
  return (
    <div className="mock-page mock-search-page">
      <h2>Buscar pasajes</h2><p>Encuentra pasajes, palabras y conexiones bíblicas.</p>
      <label className="mock-search-input"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar Salmo 23..." /></label>
      <section className="mock-search-filters">
        <strong><Filter /> Dónde buscar</strong>
        <div>{[["all", "Toda la Biblia"], ["old", "Antiguo Testamento"], ["new", "Nuevo Testamento"]].map(([id, label]) => <button className={scope === id ? "active" : ""} key={id} onClick={() => setScope(id)} type="button">{label}</button>)}</div>
        <button className="mock-book-filter" type="button"><BookOpen /> Todos los libros <ChevronDown /></button>
      </section>
      <div className="mock-recent-search"><strong><History /> Búsquedas recientes</strong><p>{query ? `Buscaste “${query}” en ${scope === "all" ? "toda la Biblia" : scope === "old" ? "el Antiguo Testamento" : "el Nuevo Testamento"}.` : "Aún no hay búsquedas recientes. Prueba escribiendo arriba."}</p></div>
      <div className="mock-popular-topics"><strong><Star /> Temas populares</strong><div>{[["F", "Fornicación"], ["S", "Soberanía divina"], ["E", "Esperanza"], ["S", "Salvación"]].map(([letter, topic]) => <article key={topic}><span>{letter}</span><strong>{topic}</strong><p>Explora pasajes y relaciones bíblicas.</p></article>)}</div></div>
      <button className="mock-explore-row" type="button"><Grid2X2 /> <span><strong>Explorar temas</strong><small>Descubre conexiones por temas</small></span><ChevronRight /></button>
    </div>
  );
}

function StudyMockup({ onNavigate }: { onNavigate: (panel: TourPanel) => void }) {
  const [query, setQuery] = useState("");
  return (
    <div className="mock-page mock-study-page">
      <header><div><h2>Mis enseñanzas</h2><span>2 enseñanzas guardadas</span></div><button onClick={() => onNavigate("editor")} type="button"><Plus /> Nueva enseñanza</button></header>
      <section className="mock-study-filters"><label><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por título" /></label><strong><Bookmark /> Filtrar por</strong><div>{["Propósito", "Audiencia", "Tema", "Estado"].map((filter) => <button key={filter} type="button">{filter}<ChevronDown /></button>)}</div></section>
      <div className="mock-study-cards">
        {["prueba 2", "prueba"].filter((title) => title.includes(query.toLowerCase())).map((title, index) => <button key={title} onClick={() => onNavigate("editor")} type="button"><span className="mock-study-book"><Bookmark /></span><div><em>PREDICACIÓN</em><h3>{title}</h3><small>▣ Actualizada {index ? "29" : "30"} jul 2026</small><p>{title}</p><div><span>#jóvenes</span><span>#identidad</span><span>#borrador</span></div><footer>1 página <b>Leer <ChevronRight /></b></footer></div><MoreVertical /></button>)}
      </div>
    </div>
  );
}

function EditorMockup({ assistantOpen, onCloseAssistant, onNavigate, onOpenAssistant }: { assistantOpen: boolean; onCloseAssistant: () => void; onNavigate: (panel: TourPanel) => void; onOpenAssistant: () => void }) {
  return (
    <div className="mock-editor-page">
      <TabletStatusBar />
      <section className="mock-editor-bible"><MockBrandBar /><article className="mock-editor-verse"><strong><Sparkles /> VERSÍCULO DEL DÍA</strong><p>“Lo mismo harás con el de tu buey y de tu oveja; siete días estará con su madre.”</p><span>Éxodo 22:30</span></article><article className="mock-editor-reading"><strong><BookOpen /> CONTINUAR LECTURA</strong><p><b>1 Reyes 1</b><span>Última lectura</span></p></article></section>
      <section className="mock-editor-document">
        <header><button aria-label="Cerrar editor" onClick={() => onNavigate("study")} type="button"><X /></button><span>Documento sin título</span><small>Cambios sin guardar</small><button type="button"><Undo2 /></button><button type="button"><Redo2 /></button><button type="button"><Maximize2 /></button><button type="button"><Menu /></button><button type="button"><Save /></button></header>
        <div className="mock-editor-toolbar"><b>B</b><i>I</i><u>U</u><span>A</span><span>▤</span><span>☷</span><span>≡</span><button type="button">16 <ChevronDown /></button></div>
        <textarea aria-label="Documento de enseñanza" placeholder="Comienza a escribir tu enseñanza..." />
        <button className="mock-bibi-fab" aria-label="Abrir a Bibi en el editor" onClick={onOpenAssistant} type="button"><Image alt="" src="/logos/bibi/bibi-logo-blanco.png" width={36} height={36} /></button>
      </section>
      <MockBottomNavigation activePanel="editor" onNavigate={onNavigate} />
      {assistantOpen ? <BibiTabletOverlay onClose={onCloseAssistant} /> : null}
    </div>
  );
}

function ProfileMockup({ onCloseSettings, settingsOpen }: { onCloseSettings: () => void; settingsOpen: boolean }) {
  const [textSize, setTextSize] = useState(16);
  return (
    <div className="mock-page mock-profile-page">
      <h2>Perfil</h2><p>Tu recorrido dentro de BIBLION</p>
      <div className="mock-profile-grid">
        <article className="mock-profile-card"><div className="mock-avatar"><UserRound /><button aria-label="Cambiar foto"><Camera /></button></div><div><h3>Tu perfil</h3><strong>Cuenta de BIBLION</strong><span><MapPin /> Tu ubicación</span><p>Tu nombre, alias y biografía aparecerán aquí cuando completes el perfil.</p><div><button type="button">Editar perfil</button><button type="button">Cerrar sesión</button></div></div><footer><span>Rol<b>Lector</b></span><span>Plan<b>FREE</b></span><span>Perfil<b>Privado</b></span></footer></article>
        <article className="mock-profile-completion"><strong>Completa tu perfil <em>80%</em></strong><span>Te falta 1 paso.</span><div><i /></div><p>Siguiente paso: agrega tu biografía.</p><button type="button">Completar ahora</button></article>
        <article className="mock-profile-activity"><strong>Tu actividad</strong><p>Un vistazo a tu recorrido de estudio.</p><div><span>✎<b>2</b><small>Enseñanzas</small></span><span>★<b>0</b><small>Guardadas</small></span><span>●<b>0</b><small>Comentarios</small></span></div></article>
        <article className="mock-profile-achievements"><strong>Logros recientes <small>Ver todos</small></strong><span>2 de 24 desbloqueados</span><div><span><Link2 />Tejedor de Escrituras</span><span><UserRound />Identidad Completa</span><span>📅 Peregrino Constante</span></div></article>
      </div>
      {settingsOpen ? <div className="mock-settings-backdrop" onClick={onCloseSettings}><div className="mock-settings-dialog" role="dialog" aria-label="Configuración" onClick={(event) => event.stopPropagation()}><header><div><strong>Configuración</strong><small>Personaliza tu experiencia de lectura.</small></div><button aria-label="Cerrar configuración" onClick={onCloseSettings} type="button"><X /></button></header><label>Versión de la Biblia<select defaultValue="RVR1960"><option>RVR1960</option><option>PDT</option></select></label><label>Tamaño del texto <span>{textSize} sp</span><input min="12" max="35" value={textSize} onInput={(event) => setTextSize(Number(event.currentTarget.value))} type="range" /></label><fieldset><legend>Tema de la aplicación</legend><div><button type="button">Claro</button><button className="active" type="button">Azul</button><button type="button">Oscuro</button></div></fieldset><button className="mock-tutorial-reset" type="button">Reiniciar tutorial de lectura</button></div></div> : null}
    </div>
  );
}

function MockBottomNavigation({ activePanel, onNavigate }: { activePanel: TourPanel; onNavigate: (panel: TourPanel) => void }) {
  const resolvedActive = activePanel === "reader" ? "books" : activePanel === "editor" ? "study" : activePanel;
  return (
    <nav className="mock-bottom-navigation" aria-label="Navegación de BIBLION App">
      {mainNavigation.map((item) => { const Icon = item.icon; return <button className={resolvedActive === item.id ? "active" : ""} key={item.id} onClick={() => onNavigate(item.id)} type="button"><Icon /><span>{item.label}</span></button>; })}
    </nav>
  );
}

function BibiTabletOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="mock-bibi-overlay" role="dialog" aria-label="Bibi, asistente bíblica">
      <header><Image alt="" src="/logos/bibi/bibi-logo-blanco.png" width={38} height={38} /><div><strong>Bibi</strong><span>Asistente bíblica</span></div><button aria-label="Cerrar Bibi" onClick={onClose} type="button"><X /></button></header>
      <p>Estoy aquí para ayudarte a comprender el pasaje sin sacarte de tu lectura.</p>
      <button type="button">¿Qué significa este versículo?</button><button type="button">Explícame el contexto histórico</button>
      <label><input placeholder="Pregunta sobre este pasaje..." /><MessageCircleMore /></label>
    </div>
  );
}

const bibiPrompts = [
  { question: "¿Qué significa gracia?", answer: "La gracia es el favor inmerecido de Dios. En el Nuevo Testamento señala especialmente su iniciativa salvadora manifestada en Cristo.", reference: "Efesios 2:8-9" },
  { question: "Explícame Romanos 8:28", answer: "El pasaje no promete ausencia de dificultad. Afirma que Dios puede obrar incluso en medio de ella conforme a su propósito.", reference: "Romanos 8:28" },
  { question: "Pasajes relacionados con esperanza", answer: "Puedes comenzar con Romanos 5:3-5, Romanos 15:13 y 1 Pedro 1:3. Cada texto presenta una dimensión distinta de la esperanza cristiana.", reference: "3 conexiones" },
];

export function BibiInteractiveDemo() {
  const [activePrompt, setActivePrompt] = useState(0);
  const current = bibiPrompts[activePrompt];
  return (
    <div className="bibi-live-demo" data-reveal>
      <div className="bibi-live-sidebar"><span>PRUEBA UNA PREGUNTA</span>{bibiPrompts.map((prompt, index) => <button className={index === activePrompt ? "active" : ""} key={prompt.question} onClick={() => setActivePrompt(index)} type="button">{prompt.question}<ChevronRight aria-hidden="true" size={16} /></button>)}</div>
      <div className="bibi-live-conversation" key={current.question}><div className="bibi-live-brand"><Image alt="" height={44} src="/logos/bibi/logo-bibi-normal.png" width={44} /><div><strong>Bibi</strong><span>Contexto bíblico, no respuestas generales</span></div></div><div className="bibi-live-user">{current.question}</div><div className="bibi-live-answer"><Sparkles aria-hidden="true" size={17} /><p>{current.answer}</p><span>{current.reference}</span></div><p className="bibi-live-note">Bibi te acompaña y conserva el contexto, pero no modifica tu enseñanza.</p></div>
    </div>
  );
}
