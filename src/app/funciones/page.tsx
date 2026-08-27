import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Bot,
  Cloud,
  Compass,
  FileDown,
  FilePenLine,
  Highlighter,
  Palette,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import { PassageLayers } from "@/components/passage-layers";
import { ProductTour } from "@/components/product-tour";
import {
  PageHero,
  SectionHeading,
  SiteFooter,
  StatusPill,
  WaitlistCta,
} from "@/components/site";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Funciones de BIBLION App",
  description: "Explora las herramientas de lectura, búsqueda, descubrimiento, Bibi y creación de enseñanzas de BIBLION App.",
  path: "/funciones",
});

const functionGroups = [
  {
    id: "lectura",
    icon: BookOpen,
    action: "LEER",
    title: "La lectura continúa donde la dejaste.",
    text: "Una experiencia bíblica local, personalizable y preparada para acompañar el ritmo de cada persona.",
    features: [
      {
        icon: BookOpen,
        title: "Lectura bíblica",
        text: "Navega por testamento, libro y capítulo, cambia de versión y avanza con gestos.",
        requirement: "Sin conexión",
      },
      {
        icon: Compass,
        title: "Inicio y continuidad",
        text: "Recibe un versículo diario y regresa directamente al último capítulo consultado.",
        requirement: "Sin conexión",
      },
      {
        icon: Highlighter,
        title: "Resaltados y pasajes",
        text: "Usa cuatro colores, guarda pasajes y comparte el texto con referencia y versión.",
        requirement: "Guardado local",
      },
    ],
  },
  {
    id: "descubrir",
    icon: Search,
    action: "DESCUBRIR",
    title: "Encuentra relaciones que amplían el pasaje.",
    text: "Búsqueda, contexto y conexiones trabajan juntos sin convertir el estudio en una colección de pantallas aisladas.",
    features: [
      {
        icon: Search,
        title: "Búsqueda en tiempo real",
        text: "Busca palabras o frases y filtra por toda la Biblia, testamento o libro.",
        requirement: "Sin conexión",
      },
      {
        icon: BookMarked,
        title: "Diccionario bíblico",
        text: "Consulta más de 6.000 entradas organizadas en ocho categorías.",
        requirement: "Sin conexión",
      },
      {
        icon: Sparkles,
        title: "Temas y conexiones",
        text: "Explora temas canónicos y sigue referencias relacionadas entre pasajes.",
        requirement: "Sin conexión",
      },
    ],
  },
  {
    id: "bibi",
    icon: Bot,
    action: "PREGUNTAR",
    title: "Bibi conversa dentro del contexto.",
    text: "La asistente aparece sobre la lectura o el editor para responder sin sacar al usuario de lo que está estudiando.",
    features: [
      {
        icon: Bot,
        title: "Respuestas bíblicas",
        text: "Resuelve consultas básicas con recursos locales y usa conexión al profundizar.",
        requirement: "Local + conexión",
      },
      {
        icon: BookOpen,
        title: "Contexto del lector",
        text: "Puede recibir el pasaje actual o una referencia seleccionada desde otra parte de la aplicación.",
        requirement: "Contextual",
      },
      {
        icon: BookMarked,
        title: "Historial de conversaciones",
        text: "Permite crear, retomar o eliminar hasta cinco conversaciones independientes.",
        requirement: "Guardado local",
      },
    ],
  },
  {
    id: "estudio",
    icon: FilePenLine,
    action: "CONSTRUIR",
    title: "Convierte el estudio en una enseñanza.",
    text: "Un espacio de escritura paginado para organizar ideas, citar pasajes y conservar una estructura reutilizable.",
    features: [
      {
        icon: FilePenLine,
        title: "Editor paginado",
        text: "Construye documentos con seis tipos de bloque, formato de texto, zoom y deshacer o rehacer.",
        requirement: "Sin conexión",
      },
      {
        icon: BookMarked,
        title: "Borradores y organización",
        text: "Guarda borradores localmente y clasifica las enseñanzas terminadas mediante etiquetas.",
        requirement: "Guardado local",
      },
      {
        icon: FileDown,
        title: "Compartir enseñanzas",
        text: "Exporta como PDF o conserva la estructura mediante archivos .bib importables.",
        requirement: "Sin conexión",
      },
    ],
  },
];

const experienceFoundations = [
  {
    icon: Palette,
    title: "Tres temas",
    text: "Claro, Azul Rey Oscuro y Oscuro, con preferencias de lectura coherentes.",
    requirement: "En el dispositivo",
  },
  {
    icon: UserRound,
    title: "Perfil personal",
    text: "Identidad, preferencias y acceso mediante una cuenta de usuario.",
    requirement: "Requiere cuenta",
  },
  {
    icon: Cloud,
    title: "Sincronización selectiva",
    text: "Sincroniza datos compatibles; los borradores permanecen locales hasta publicarse.",
    requirement: "Cuenta + conexión",
  },
  {
    icon: Compass,
    title: "Tutorial guiado",
    text: "Presenta lectura, resaltados, versiones y Bibi en sus posiciones reales.",
    requirement: "Primera instalación",
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
    <main className="stitch-page" id="main-content">
      <PageHero
        eyebrow="FUNCIONES"
        title={<>Todo lo necesario para ir <em>más allá de la lectura.</em></>}
        text="BIBLION reúne lectura, búsqueda, descubrimiento, asistencia bíblica y creación de enseñanzas en una sola experiencia."
      />

      <PassageLayers />

      <section className="stitch-section stitch-product-tour-section" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="RECORRIDO INTERACTIVO"
          title="Recorre BIBLION App tal como funciona hoy."
          text="Explora mockups interactivos construidos sobre el flujo real en tablet: desde el inicio y la selección de libros hasta la lectura, la búsqueda, las enseñanzas, el editor y el perfil."
        />
        <ProductTour initialPanel="home" />
      </section>

      <section className="stitch-section functions-capabilities" data-reveal>
        <SectionHeading
          eyebrow="CAPACIDADES DE LA VERSIÓN DE PRUEBA"
          title="Cuatro momentos, una sola experiencia."
          text="Cada capacidad está ubicada en el momento donde realmente ayuda: leer, descubrir, preguntar o construir."
        />
        <p className="functions-swipe-hint">
          Desliza para recorrer los cuatro momentos <ArrowRight aria-hidden="true" size={16} />
        </p>
        <div className="functions-group-grid">
          {functionGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <article className="functions-group-card" id={group.id} key={group.id}>
                <header>
                  <span className="functions-group-icon"><GroupIcon aria-hidden="true" size={25} /></span>
                  <div>
                    <span>{group.action}</span>
                    <StatusPill tone="beta">Disponible en pruebas</StatusPill>
                  </div>
                  <h3>{group.title}</h3>
                  <p>{group.text}</p>
                </header>
                <div className="functions-group-list">
                  {group.features.map((feature) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div className="functions-feature-row" key={feature.title}>
                        <FeatureIcon aria-hidden="true" size={19} />
                        <div>
                          <strong>{feature.title}</strong>
                          <p>{feature.text}</p>
                        </div>
                        <span>{feature.requirement}</span>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <div className="functions-foundations-heading">
          <span className="stitch-eyebrow">EN TODA LA EXPERIENCIA</span>
          <h3>Tu Biblia, tus preferencias y tus datos.</h3>
          <p>Estas capacidades acompañan transversalmente la lectura, la búsqueda y el estudio.</p>
        </div>
        <div className="functions-foundations-grid">
          {experienceFoundations.map((foundation) => {
            const FoundationIcon = foundation.icon;
            return (
              <article key={foundation.title}>
                <FoundationIcon aria-hidden="true" size={22} />
                <span>{foundation.requirement}</span>
                <h4>{foundation.title}</h4>
                <p>{foundation.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="stitch-future-roadmap" id="futuro" data-reveal>
        <div>
          <span className="stitch-eyebrow">FUTURO DE BIBLION APP</span>
          <h2>Lo siguiente se decidirá con quienes la prueben.</h2>
          <p>
            Estas ideas pertenecen al futuro de la aplicación, no a otros productos del ecosistema,
            y pueden cambiar según la validación técnica, de contenido y de uso.
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
