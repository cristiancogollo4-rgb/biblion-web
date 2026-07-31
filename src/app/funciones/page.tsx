import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Bot,
  Cloud,
  FileDown,
  FilePenLine,
  Highlighter,
  Search,
  Settings2,
  Sparkles,
} from "lucide-react";
import { ProductTour } from "@/components/product-tour";
import {
  PageHero,
  SectionHeading,
  SiteFooter,
  StatusPill,
  WaitlistCta,
} from "@/components/site";

const actions = [
  [BookOpen, "Leer", "Navega, personaliza y continúa desde el último capítulo."],
  [Search, "Descubrir", "Encuentra palabras, conceptos y conexiones bíblicas."],
  [Bot, "Preguntar", "Conversa con Bibi usando el contexto disponible."],
  [FilePenLine, "Construir", "Organiza tus hallazgos como una enseñanza."],
];

const functions = [
  {
    id: "lectura",
    icon: BookOpen,
    title: "Lectura bíblica",
    tone: "local" as const,
    status: "Funciona sin conexión",
    text: "Biblioteca por testamento, libro y capítulo con navegación por gestos.",
    details: ["Versiones instaladas", "Tamaño de texto", "Capítulo visible", "Continuar lectura"],
  },
  {
    icon: Highlighter,
    title: "Resaltados y pasajes",
    tone: "beta" as const,
    status: "Incluido en la beta",
    text: "Cuatro colores de resaltado, guardado, copiado y compartido con referencia.",
    details: ["Referencia y versión", "Formato para compartir", "Persistencia local"],
  },
  {
    id: "descubrir",
    icon: Search,
    title: "Búsqueda en tiempo real",
    tone: "local" as const,
    status: "Funciona sin conexión",
    text: "Busca palabras o frases y filtra por toda la Biblia, testamento o libro.",
    details: ["Filtros combinables", "Historial reciente", "Acceso directo al capítulo"],
  },
  {
    icon: BookMarked,
    title: "Diccionario bíblico",
    tone: "local" as const,
    status: "Funciona sin conexión",
    text: "Más de 6.000 entradas sobre personas, lugares, conceptos, objetos y eventos.",
    details: ["Ocho categorías", "Alias", "Fechas y ubicaciones disponibles"],
  },
  {
    icon: Sparkles,
    title: "Temas y conexiones",
    tone: "beta" as const,
    status: "Incluido en la beta",
    text: "Explora temas canónicos y sigue referencias relacionadas entre pasajes.",
    details: ["Categorías", "Relaciones temáticas", "Referencias cruzadas"],
  },
  {
    icon: Bot,
    title: "Bibi",
    tone: "online" as const,
    status: "Local + conexión",
    text: "Respuestas locales para consultas básicas y profundización en línea.",
    details: ["Contexto del lector", "Cinco conversaciones", "Sugerencias relacionadas"],
  },
  {
    icon: FilePenLine,
    title: "Modo Estudio",
    tone: "beta" as const,
    status: "Incluido en la beta",
    text: "Editor paginado para construir enseñanzas con seis tipos de bloque.",
    details: ["Borradores locales", "Etiquetas", "Zoom y deshacer/rehacer"],
  },
  {
    icon: FileDown,
    title: "Compartir enseñanzas",
    tone: "beta" as const,
    status: "Incluido en la beta",
    text: "Comparte como PDF o conserva la estructura mediante el formato .bib.",
    details: ["Exportar PDF", "Exportar .bib", "Importar .bib"],
  },
  {
    icon: Settings2,
    title: "Personalización",
    tone: "beta" as const,
    status: "Incluido en la beta",
    text: "Tema Claro, Azul Rey Oscuro y Oscuro, además de preferencias de lectura.",
    details: ["Tema", "Versión predeterminada", "Tamaño de lectura"],
  },
  {
    icon: Cloud,
    title: "Cuenta y sincronización",
    tone: "online" as const,
    status: "Requiere cuenta",
    text: "Sincroniza funciones compatibles al iniciar sesión; los borradores siguen locales.",
    details: ["Perfil", "Preferencias", "Enseñanzas finalizadas"],
  },
];

const future = [
  ["Repositorio de enseñanzas", "Planeado", "Descubrir recursos creados dentro de BIBLION."],
  ["Planes de estudio", "En evaluación", "Recorridos guiados por temas o libros."],
  ["Colaboración", "Visión futura", "Herramientas compartidas para comunidades."],
  ["Otras plataformas", "No confirmado", "La primera etapa continúa enfocada en Android."],
];

export default function FuncionesPage() {
  return (
    <main className="stitch-page">
      <PageHero
        eyebrow="FUNCIONES"
        title={<>Todo lo necesario para ir <em>más allá de la lectura.</em></>}
        text="BIBLION reúne lectura, búsqueda, descubrimiento, asistencia bíblica y creación de enseñanzas en una sola experiencia."
      />

      <section className="stitch-section stitch-action-overview" data-reveal>
        {actions.map(([Icon, title, text]) => {
          const ActionIcon = Icon as typeof BookOpen;
          return (
            <article key={String(title)}>
              <ActionIcon size={24} />
              <h2>{String(title)}</h2>
              <p>{String(text)}</p>
            </article>
          );
        })}
      </section>

      <section className="stitch-section stitch-product-tour-section" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="RECORRIDO INTERACTIVO"
          title="No imagines el flujo. Recorre sus pantallas."
          text="Cambia entre Home, Biblia, Buscar, Estudio y Bibi para conocer la experiencia que estamos preparando para Android."
        />
        <ProductTour initialPanel="reader" />
      </section>

      <section className="stitch-section" data-reveal>
        <SectionHeading
          eyebrow="HERRAMIENTAS DE LA VERSIÓN DE PRUEBA"
          title="Qué funciona, dónde vive y cuándo necesita conexión."
          text="Los estados describen el comportamiento real de cada capacidad; no representan disponibilidad pública en Google Play."
        />
        <div className="stitch-functions-grid">
          {functions.map((item) => {
            const Icon = item.icon;
            return (
              <article id={item.id} key={item.title}>
                <div className="stitch-function-top">
                  <Icon size={24} />
                  <StatusPill tone={item.tone}>{item.status}</StatusPill>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul>
                  {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="stitch-future-roadmap" id="futuro" data-reveal>
        <div>
          <span className="stitch-eyebrow">FUNCIONES FUTURAS</span>
          <h2>Una visión abierta, sin fechas inventadas.</h2>
          <p>
            Estas ideas no forman parte de la beta actual y pueden cambiar según
            la validación técnica, de contenido y de uso.
          </p>
          <Link className="stitch-text-link" href="/descargar">
            Participar en las pruebas <ArrowRight size={18} />
          </Link>
        </div>
        <div className="stitch-roadmap-list">
          {future.map(([title, status, text]) => (
            <article key={title}>
              <div><strong>{title}</strong><StatusPill tone="future">{status}</StatusPill></div>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <WaitlistCta />
      <SiteFooter />
    </main>
  );
}
