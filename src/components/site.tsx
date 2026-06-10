import Image from "next/image";
import Link from "next/link";
import { ActiveNavLink } from "@/components/active-nav-link";
import { MobileNav } from "@/components/mobile-nav";
import { WaitlistTrigger } from "@/components/waitlist-dialog";
import {
  ArrowLeft,
  BookOpen,
  Bot,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  FileText,
  Filter,
  Highlighter,
  Library,
  ListChecks,
  Maximize,
  Menu,
  MessageSquareText,
  Minus,
  Moon,
  PenLine,
  Plus,
  Quote,
  RotateCcw,
  Save,
  Search,
  Send,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Tags,
  Trash2,
  Users,
  X,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/identidad", label: "Identidad" },
  { href: "/funciones", label: "Funciones" },
  { href: "/modo-estudio", label: "Modo estudio" },
  { href: "/bibi", label: "Bibi" },
  { href: "/descargar", label: "Descargar" },
];

export const features = [
  {
    icon: BookOpen,
    title: "Lectura bíblica",
    text: "Navega por testamento, libro y capítulo con una experiencia clara.",
    details: ["Selector de libro y capítulo", "Indicadores de versículo", "Lectura limpia"],
  },
  {
    icon: Search,
    title: "Búsqueda",
    text: "Encuentra versículos por texto y vuelve al pasaje sin perder contexto.",
    details: ["Búsqueda por palabras", "Resultados por referencia", "Acceso directo al lector"],
  },
  {
    icon: Library,
    title: "Versiones",
    text: "Cambia de versión bíblica y conserva tu flujo de lectura.",
    details: ["Versión seleccionada", "Comparación en citas", "Contexto para Bibi"],
  },
  {
    icon: Highlighter,
    title: "Resaltado",
    text: "Marca pasajes importantes y sincronizalos con tu cuenta.",
    details: ["Colores de resaltado", "Persistencia local", "Sincronización remota"],
  },
  {
    icon: Moon,
    title: "Modo claro y oscuro",
    text: "Ajusta la lectura para sesiones cortas o estudio prolongado.",
    details: ["Tema global", "Contraste de lectura", "Control desde pantallas clave"],
  },
  {
    icon: Cloud,
    title: "Sincronización",
    text: "Mantiene perfil, preferencias y estudios disponibles en la nube.",
    details: ["Firebase Auth", "Firestore", "Perfil y preferencias"],
  },
];

export const studyTools = [
  {
    icon: FileText,
    title: "Editor por bloques",
    text: "Construye enseñanzas con párrafos, encabezados, listas, notas, reflexiones y citas bíblicas.",
  },
  {
    icon: Quote,
    title: "Citas bíblicas vinculadas",
    text: "Agrupa versículos contiguos, conserva referencia, versión y texto con indicadores inline.",
  },
  {
    icon: Tags,
    title: "Etiquetas obligatorias",
    text: "Clasifica por propósito, audiencia, tema y estado para mantener cada estudio ordenado.",
  },
  {
    icon: ListChecks,
    title: "Lectura de enseñanzas",
    text: "Abre documentos estructurados, ajusta fuente, compara versiones y revisa en pantalla dividida.",
  },
];

export const bibiDetails = [
  {
    icon: MessageSquareText,
    title: "Dominio bíblico",
    text: "Bibi responde sobre Biblia, contexto, doctrina cristiana, discipulado, devocionales y enseñanza.",
  },
  {
    icon: Server,
    title: "Worker online",
    text: "Android llama un Cloudflare Worker por un endpoint compatible con OpenAI configurado fuera del APK.",
  },
  {
    icon: Settings,
    title: "Modelo configurable",
    text: "El proveedor principal usa Qwen3-8B; NVIDIA queda como fallback por variables y secrets del Worker.",
  },
  {
    icon: ShieldCheck,
    title: "Respuestas controladas",
    text: "La app limpia JSON malformado, usa fallback local y redirige preguntas fuera del dominio bíblico.",
  },
];

export const brandElements = [
  {
    title: "Biblion - marca principal",
    text: "Representa la plataforma completa de estudio bíblico: lectura, contexto, organización y preparación.",
    image: "/logos/biblion/logo-biblion-normal.png",
  },
  {
    title: "App Biblion - isotipo B",
    text: "Versión simplificada para la app, íconos y espacios reducidos donde la marca debe reconocerse rápido.",
    image: "/logos/biblion/logo-biblion-app-normal.png",
  },
  {
    title: "Bibi - asistente virtual",
    text: "Acompaña al usuario dentro del ecosistema Biblion para investigar, organizar y comprender.",
    image: "/logos/bibi/logo-bibi-normal.png",
  },
];

export const logoMeaning = [
  "Libro abierto: la Biblia, el conocimiento revelado y la apertura al aprendizaje.",
  "Letras hebreas: los idiomas originales y la riqueza histórica del texto bíblico.",
  "Pluma dorada: inspiración, guía y dirección para escribir ideas y enseñanzas.",
  "B central: reconocimiento inmediato de Biblion incluso cuando el libro no está presente.",
  "Azul profundo y dorado: confianza, sabiduría, valor eterno y profundidad espiritual.",
];

export const logoRelation = [
  ["Libro", true, false, false],
  ["Letras hebreas", true, false, false],
  ["B central", true, true, false],
  ["Pluma", true, true, true],
  ["Conversación", false, false, true],
  ["IA", false, false, true],
] as const;

export const slogans = [
  {
    title: "Biblion",
    subtitle: "Ve más allá de la lectura.",
    text: "Plataforma que transforma la lectura bíblica en estudio, análisis y construcción de conocimiento.",
    image: "/logos/biblion/logo-biblion-normal.png",
  },
  {
    title: "App Biblion",
    subtitle: "Tu herramienta portátil de estudio.",
    text: "Lleva tus notas, sermones, referencias y recursos bíblicos a donde vayas.",
    image: "/logos/biblion/logo-biblion-app-normal.png",
  },
  {
    title: "Bibi",
    subtitle: "Tu compañero inteligente de estudio bíblico.",
    text: "Asistente impulsado por IA para explorar, organizar y profundizar en las Escrituras.",
    image: "/logos/bibi/logo-bibi-normal.png",
  },
];

export const bibiMeaning = [
  {
    title: "Burbuja de conversación",
    text: "Comunica interacción, asistencia y acompañamiento.",
  },
  {
    title: "Rostro sonriente",
    text: "Transmite cercanía, amabilidad y disponibilidad.",
  },
  {
    title: "Pluma integrada",
    text: "Conecta a Bibi con Biblion y orienta la ayuda al estudio bíblico.",
  },
  {
    title: "Nombre Bibi",
    text: "Humaniza la experiencia y facilita recordarla.",
  },
];

export const brandPillars = [
  "Fundamentado en la Palabra",
  "Inspirado por el Espíritu Santo",
  "Profundidad y contexto",
  "Accesible y portátil",
  "Inteligencia al servicio de Dios",
  "Para maestros, líderes y estudiantes",
];

export const launchItems = [
  {
    icon: Users,
    title: "Primeros usuarios",
    text: "La lista de espera servirá para invitar lectores, líderes y equipos que preparan enseñanzas.",
  },
  {
    icon: Database,
    title: "Contenido sincronizado",
    text: "El lanzamiento prioriza que perfil, estudios, citas y preferencias viajen con la cuenta.",
  },
  {
    icon: Cpu,
    title: "Bibi en evolucion",
    text: "El asistente se evalúa con pruebas de dominio, idioma, referencias permitidas y latencia.",
  },
];

export const repositoryRoadmap = [
  {
    icon: FileText,
    title: "Repositorio de enseñanzas",
    text: "Un espacio futuro para reunir estudios, devocionales, clases y sermones creados dentro de Biblion.",
  },
  {
    icon: Tags,
    title: "Búsqueda por etiquetas",
    text: "Explorar recursos por propósito, audiencia, tema y estado para encontrar contenido útil con rapidez.",
  },
  {
    icon: Users,
    title: "Publicadores aprobados",
    text: "La idea es que líderes, maestros y creadores confiables puedan compartir enseñanzas con su perfil.",
  },
  {
    icon: ShieldCheck,
    title: "Cuidado responsable",
    text: "El repositorio debe favorecer contenido bíblico ordenado, revisable y conectado con la Palabra.",
  },
];

export const teachings = [
  {
    title: "La gracia que sostiene",
    tags: ["predicacion", "iglesia"],
    status: "en preparacion",
    publisher: "Pastor Andrés Rivera",
    publisherRole: "Pastor principal",
  },
  {
    title: "Identidad en Cristo",
    tags: ["discipulado", "jovenes"],
    status: "borrador",
    publisher: "Predicadora Laura Méndez",
    publisherRole: "Maestra bíblica",
  },
  {
    title: "Esperanza en la prueba",
    tags: ["devocional", "familias"],
    status: "finalizado",
    publisher: "Pastor Miguel Torres",
    publisherRole: "Consejero familiar",
  },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Inicio de Biblion">
        <Image
          className="brand-logo-full"
          src="/logos/biblion/logo-biblion-normal.png"
          width={96}
          height={96}
          alt="Biblion"
          priority
        />
      </Link>
      <nav aria-label="Navegación principal">
        {navItems.map((item) => (
          <ActiveNavLink key={item.href} href={item.href}>
            {item.label}
          </ActiveNavLink>
        ))}
      </nav>
      <WaitlistTrigger className="header-cta" source="header">
        Unirme a la espera
      </WaitlistTrigger>
      <MobileNav items={navItems} />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <Link className="brand" href="/">
          <Image
            className="brand-logo-full"
            src="/logos/biblion/logo-biblion-blanco.png"
            width={154}
            height={54}
            alt="Biblion"
          />
        </Link>
        <div className="footer-slogans" aria-label="Eslogans de Biblion">
          <span>Ve más allá de la lectura.</span>
          <strong>Tu herramienta portátil de estudio.</strong>
        </div>
      </div>
      <nav aria-label="Enlaces de pie de página">
        {navItems.slice(1).map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/privacidad">Privacidad</Link>
      </nav>
      <div className="footer-contact" aria-label="Contacto y redes sociales">
        <strong>Contacto</strong>
        <a href="mailto:biblion2026@gmail.com">biblion2026@gmail.com</a>
        <a
          href="https://www.instagram.com/biblionoficial/?hl=es"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}

export function ReaderMockup() {
  return (
    <div className="phone-mockup reader-phone biblion-reader" aria-label="Vista del lector bíblico de Biblion">
      <div className="app-topbar">
        <ArrowLeft size={18} />
        <strong>Lucas</strong>
        <div>
          <Search size={18} />
          <Minus size={18} />
          <Plus size={18} />
        </div>
      </div>
      <div className="chapter-strip">
        {["CAP 1", "CAP 2", "CAP 3", "CAP 4", "CAP 5"].map((chapter) => (
          <span className={chapter === "CAP 1" ? "active" : ""} key={chapter}>{chapter}</span>
        ))}
      </div>
      <div className="reader-lines">
        <h4>Dedicatoria a Teófilo</h4>
        <p><sup>1</sup> Puesto que ya muchos han tratado de poner en orden la historia de las cosas que entre nosotros han sido ciertísimas,</p>
        <p><sup>2</sup> tal como nos lo enseñaron los que desde el principio lo vieron con sus ojos, y fueron ministros de la palabra,</p>
        <p><sup>3</sup> me ha parecido también a mí, después de haber investigado con diligencia todas las cosas desde su origen, escribírtelas por orden.</p>
        <h4>Anuncio del nacimiento de Juan</h4>
        <p><sup>5</sup> Hubo en los días de Herodes, rey de Judea, un sacerdote llamado Zacarías.</p>
      </div>
      <div className="floating-bibi">
        <Image src="/logos/bibi/bibi-logo-blanco.png" width={44} height={44} alt="" />
      </div>
      <div className="floating-read"><BookOpen size={20} /></div>
    </div>
  );
}

export function StudyEditorMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "editor-mockup compact study-real-mockup" : "editor-mockup study-real-mockup"}>
      <div className="study-real-reader">
        <div className="app-topbar">
          <ArrowLeft size={16} />
          <strong>1 Samuel</strong>
          <div>
            <Search size={16} />
            <Minus size={16} />
            <Plus size={16} />
          </div>
        </div>
        <div className="chapter-strip">
          {["CAP 1", "CAP 2", "CAP 3", "CAP 4"].map((chapter) => (
            <span className={chapter === "CAP 1" ? "active" : ""} key={chapter}>{chapter}</span>
          ))}
        </div>
        <div className="reader-lines large">
          <h4>Nacimiento de Samuel</h4>
          <p><sup>1</sup> Hubo un varón de Ramataim de Zofim, del monte de Efraín, que se llamaba Elcana.</p>
          <p><sup>2</sup> Y tenía él dos mujeres; el nombre de una era Ana, y el de la otra, Penina.</p>
        </div>
      </div>
      <div className="study-real-editor">
        <div className="editor-real-top">
          <X size={16} />
          <strong>Editor de Estudio</strong>
          <Save size={16} />
          <Maximize size={16} />
        </div>
        <div className="study-document">
          <h3>IDENTIDAD SIN FILTRO</h3>
          <span>Nota</span>
          <p className="italic">Demo construida para probar el modo estudio: citas por rango, reflexiones, columnas, listas y texto destacado.</p>
          <span>Citar</span>
          <div className="quote-meta">1 Samuel 16:5-13 <b>RV1960</b> ocultar <b>TLA</b></div>
          <div className="quote-columns">
            <p><sup>5</sup> Él respondió: Sí, vengo a ofrecer sacrificio a Jehová; santificaos, y venid conmigo.</p>
            <p><sup>5</sup> Samuel les contestó: Todo está bien. No pasa nada. Solo vine a presentarle a Dios esta ofrenda.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RepositoryIntegrationSection() {
  return (
    <section className="section repository-section">
      <div className="repository-copy">
        <span>Próximas integraciones</span>
        <h2>El repositorio de Biblion está pensado para compartir conocimiento bíblico.</h2>
        <p>
          La visión es que las enseñanzas que nacen en el modo estudio puedan
          convertirse en recursos organizados: guardables, consultables y útiles
          para iglesias, líderes, maestros y estudiantes de la Palabra.
        </p>
      </div>
      <div className="repository-visual" aria-label="Vista conceptual del repositorio de Biblion">
        <div className="repository-window">
          <div className="repository-window-top">
            <Image
              src="/logos/biblion/logo-biblion-app-normal.png"
              width={42}
              height={42}
              alt=""
            />
            <div>
              <strong>Repositorio Biblion</strong>
              <span>Integración futura</span>
            </div>
          </div>
          <div className="repository-search">
            <Search size={18} />
            <span>Buscar enseñanzas por tema, audiencia o propósito</span>
          </div>
          <div className="repository-tags">
            <span>Predicación</span>
            <span>Discipulado</span>
            <span>Jóvenes</span>
            <span>Identidad</span>
          </div>
          <div className="repository-teaching-list">
            {teachings.map((teaching, index) => (
              <article key={teaching.title} className={`repository-teaching item-${index + 1}`}>
                <div className="repository-teaching-head">
                  <div>
                    <strong>{teaching.title}</strong>
                    <span>{teaching.status}</span>
                  </div>
                  <button type="button">Ver perfil</button>
                </div>
                <p>{teaching.tags.join(" · ")}</p>
                <div className="repository-publisher">
                  <span>Publicado por</span>
                  <strong>{teaching.publisher}</strong>
                  <small>{teaching.publisherRole}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="repository-orbit-pill primary">Guardar</div>
        <div className="repository-orbit-pill secondary">Descargar</div>
        <div className="repository-orbit-pill tertiary">Compartir</div>
      </div>
      <div className="repository-roadmap-grid">
        {repositoryRoadmap.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title}>
              <Icon size={23} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function BibiMockup() {
  return (
    <div className="bibi-card bibi-panel-real">
      <div className="bibi-panel-top">
        <Image src="/logos/bibi/bibi-logo-blanco.png" width={76} height={76} alt="Logo de Bibi" />
        <strong>Bibi</strong>
        <div>
          <RotateCcw size={22} />
          <Trash2 size={22} />
          <X size={24} />
        </div>
      </div>
      <div className="chat-line assistant intro">
        Hola, soy Bibi, tu asistente bíblico en Biblion. Puedo responder
        preguntas sencillas sobre el pasaje que estás leyendo.
      </div>
      <div className="chat-line user">¿Quién fue Jesús en la Biblia?</div>
      <div className="chat-line assistant">
        Jesús es el Mesías prometido, el Hijo de Dios encarnado, nacido de
        María por obra del Espíritu Santo. Su misión era salvar a la humanidad
        mediante su vida, muerte y resurrección.
      </div>
      <div className="bibi-input-row">
        <span>Pregunta sobre este pasaje...</span>
        <Send size={24} />
      </div>
    </div>
  );
}

export function BibiConversationMockups() {
  return (
    <div className="bibi-conversation-stage" aria-label="Conversaciones simuladas con Bibi">
      <div className="bibi-logo-orbit">
        <Image src="/logos/bibi/logo-bibi-normal.png" width={156} height={156} alt="Logo de Bibi" />
      </div>
      <article className="bibi-mini-chat primary">
        <div className="bibi-mini-chat-top">
          <Image src="/logos/bibi/bibi-logo-blanco.png" width={42} height={42} alt="" />
          <div>
            <strong>Bibi</strong>
            <span>Asistente biblico</span>
          </div>
        </div>
        <p className="chat-line user">Ayudame a explicar Romanos 8:28.</p>
        <p className="chat-line assistant">
          Puedes enfocarlo en la confianza: Dios obra con proposito aun en procesos dificiles.
        </p>
      </article>
      <article className="bibi-mini-chat secondary">
        <p className="chat-line user">Dame ideas para una ensenanza.</p>
        <p className="chat-line assistant">
          Bosquejo: contexto, promesa, aplicacion y una pregunta final para reflexionar.
        </p>
      </article>
      <article className="bibi-mini-chat tertiary">
        <p className="chat-line user">Que significa gracia?</p>
        <p className="chat-line assistant">
          Favor inmerecido de Dios, mostrado plenamente en Cristo y recibido por fe.
        </p>
      </article>
    </div>
  );
}

export function BibleLibraryMockup() {
  const books = [
    "Genesis",
    "Exodo",
    "Levitico",
    "Numeros",
    "Deuteronomio",
    "Josue",
    "Jueces",
    "Rut",
    "1 Samuel",
    "2 Samuel",
    "1 Reyes",
    "2 Reyes",
    "Salmos",
    "Proverbios",
    "Isaias",
    "Jeremias",
  ];

  return (
    <div className="library-phone" aria-label="Biblioteca de libros bíblicos en Biblion">
      <div className="library-appbar">
        <Menu size={19} />
        <Image src="/logos/biblion/logo-biblion-light-app.png" width={34} height={34} alt="" />
        <strong>BIBLION</strong>
        <Search size={19} />
      </div>
      <div className="testament-toggle">
        <span className="active">ANTIGUO</span>
        <span>NUEVO</span>
      </div>
      <h4>Libros del Antiguo Testamento</h4>
      <div className="book-grid">
        {books.map((book) => (
          <button key={book}>{book}</button>
        ))}
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="hero" id="inicio">
      <SiteHeader />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={16} />
            Acceso anticipado
          </span>
          <h1>BIBLION</h1>
          <div className="hero-slogans" aria-label="Eslogans de Biblion">
            <span>Ve más allá de la lectura.</span>
            <strong>Tu herramienta portátil de estudio.</strong>
          </div>
          <p>
            Lee la Biblia, prepara enseñanzas y organiza tu estudio con una app
            cristiana pensada para profundizar en la Palabra.
          </p>
          <div className="hero-actions">
            <WaitlistTrigger className="primary-button" source="home-hero" showIcon>
              Unirme a la espera
            </WaitlistTrigger>
            <Link className="secondary-button" href="/modo-estudio">
              Ver modo estudio
            </Link>
          </div>
          <div className="feature-chips" aria-label="Funciones destacadas">
            <span>Lectura bíblica</span>
            <span>Modo estudio</span>
            <span>Bibi</span>
            <span>Sincronización</span>
          </div>
        </div>
        <div className="hero-product" aria-hidden="true">
          <BibleLibraryMockup />
          <ReaderMockup />
          <BibiMockup />
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageTitle,
  showPlayStoreMark = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
  imageTitle?: string;
  showPlayStoreMark?: boolean;
}) {
  return (
    <section className={image ? "page-hero page-hero-with-image" : "page-hero"}>
      <SiteHeader />
      <div className="page-hero-inner">
        <div className="page-hero-copy">
          <span className="eyebrow">{eyebrow}</span>
          <div className={showPlayStoreMark ? "page-hero-title-row" : undefined}>
            <h1>{title}</h1>
            {showPlayStoreMark ? (
              <span className="play-store-mark" aria-label="Google Play Store">
                <svg
                  aria-hidden="true"
                  className="play-store-logo"
                  viewBox="0 0 512 512"
                >
                  <path
                    className="play-store-blue"
                    d="M96 67c-15 9-24 27-24 52v274c0 25 9 43 24 52l174-189L96 67Z"
                  />
                  <path
                    className="play-store-green"
                    d="M100 64c10-4 23-3 37 5l218 124-85 63L100 64Z"
                  />
                  <path
                    className="play-store-yellow"
                    d="M355 193l72 41c24 14 24 30 0 44l-72 41-85-63 85-63Z"
                  />
                  <path
                    className="play-store-red"
                    d="M100 448l170-192 85 63-218 124c-14 8-27 9-37 5Z"
                  />
                </svg>
              </span>
            ) : null}
          </div>
          <p>{text}</p>
        </div>
        {image ? (
          <div className="page-hero-image-panel">
            <Image src={image} width={980} height={620} alt="" priority />
            {imageTitle ? <h2>{imageTitle}</h2> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function WaitlistCta() {
  return (
    <section className="final-cta" id="descargar">
      <span>Próximamente en Play Store</span>
      <h2>Biblion se prepara para sus primeros usuarios.</h2>
      <p>
        Únete a la lista de espera y cuéntanos por qué quieres probar lectura,
        modo estudio y Bibi antes del lanzamiento público.
      </p>
      <div className="waitlist-actions">
        <WaitlistTrigger className="primary-button" source="final-cta" showIcon>
          Unirme a la espera
        </WaitlistTrigger>
        <span>Revisaremos tu solicitud para evaluar acceso anticipado.</span>
      </div>
    </section>
  );
}

export { BookOpen, Bot, CheckCircle2, FileText, Filter, Search };
