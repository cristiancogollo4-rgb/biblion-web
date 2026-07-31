import Link from "next/link";
import { ArrowRight, Scale, ShieldAlert } from "lucide-react";
import { PageHero, SiteFooter } from "@/components/site";

const terms = [
  {
    title: "Etapa de prueba",
    text: "BIBLION se encuentra en desarrollo. La disponibilidad, apariencia y funcionamiento pueden cambiar sin previo aviso durante las pruebas.",
  },
  {
    title: "Acceso anticipado",
    text: "Registrarse en la lista no garantiza acceso inmediato. Las invitaciones pueden habilitarse progresivamente según compatibilidad y capacidad de soporte.",
  },
  {
    title: "Contenido bíblico",
    text: "Las versiones bíblicas y recursos incorporados están sujetos a sus respectivas licencias. No deben extraerse o redistribuirse fuera de los usos permitidos.",
  },
  {
    title: "Contenido del usuario",
    text: "Conservas la responsabilidad y titularidad sobre las enseñanzas y documentos que creas. Debes contar con permiso para cualquier contenido de terceros que incorpores.",
  },
  {
    title: "Uso de Bibi",
    text: "Bibi puede cometer errores. Sus respuestas no sustituyen la lectura bíblica, el criterio pastoral, la investigación académica ni la asesoría profesional.",
  },
  {
    title: "Uso aceptable",
    text: "No debes intentar vulnerar el servicio, automatizar solicitudes abusivas, introducir contenido ilícito o utilizar Bibi como una asistente para actividades ajenas a su dominio.",
  },
  {
    title: "Disponibilidad y datos",
    text: "Una versión de prueba puede fallar o perder información local. Exporta los documentos importantes y no dependas de la beta como única copia.",
  },
  {
    title: "Terminación",
    text: "El acceso puede suspenderse por seguridad, abuso, cierre de una etapa de pruebas o cambios necesarios para proteger el proyecto y sus usuarios.",
  },
];

export default function TerminosPage() {
  return (
    <main className="stitch-page">
      <PageHero
        compact
        eyebrow="TÉRMINOS DE USO"
        title={<>Condiciones claras para una aplicación que continúa en <em>desarrollo.</em></>}
        text="Estos términos describen el uso esperado de la web, la lista de acceso anticipado y las versiones de prueba de BIBLION."
      />

      <section className="stitch-legal-principle" data-reveal>
        <Scale size={34} />
        <div>
          <span className="stitch-eyebrow">ALCANCE</span>
          <h2>Participar implica comprender que todavía estamos validando el producto.</h2>
          <p>
            Al usar la web, registrarte o instalar una versión de prueba aceptas
            estas condiciones y la política de privacidad correspondiente.
          </p>
        </div>
      </section>

      <section className="stitch-section stitch-terms-grid" data-reveal>
        {terms.map((term, index) => (
          <article key={term.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{term.title}</h2>
            <p>{term.text}</p>
          </article>
        ))}
      </section>

      <section className="stitch-legal-update" data-reveal>
        <ShieldAlert size={24} />
        <div>
          <strong>Documento provisional para la etapa de pruebas</strong>
          <p>
            Debe recibir revisión jurídica antes del lanzamiento general o de
            cualquier cambio relevante en licencias, pagos o distribución.
          </p>
        </div>
        <Link className="stitch-text-link" href="/contacto">
          Resolver una duda <ArrowRight size={17} />
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
