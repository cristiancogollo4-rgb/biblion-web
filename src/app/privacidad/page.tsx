import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Cloud,
  Database,
  Mail,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import {
  PageHero,
  SectionHeading,
  SiteFooter,
} from "@/components/site";

const dataAreas = [
  {
    icon: Database,
    title: "Información local",
    text: "Lecturas, resaltados, búsquedas, conversaciones y borradores pueden almacenarse en el dispositivo.",
  },
  {
    icon: Cloud,
    title: "Cuenta y sincronización",
    text: "Firebase puede gestionar autenticación, perfil, fotografía, preferencias y enseñanzas finalizadas.",
  },
  {
    icon: Bot,
    title: "Consultas a Bibi",
    text: "Una profundización puede enviar la pregunta y el contexto bíblico o del documento necesario.",
  },
  {
    icon: Mail,
    title: "Acceso anticipado",
    text: "El formulario recopila nombre, correo y los datos opcionales que decidas proporcionar.",
  },
];

export default function PrivacidadPage() {
  return (
    <main className="stitch-page">
      <PageHero
        compact
        eyebrow="PRIVACIDAD"
        title={<>Claridad sobre los datos que acompañan tu <em>experiencia.</em></>}
        text="Este aviso explica de forma comprensible cómo BIBLION utiliza información local, sincronización y servicios externos durante su etapa de desarrollo."
      />

      <section className="stitch-legal-principle" data-reveal>
        <ShieldCheck size={34} />
        <div>
          <span className="stitch-eyebrow">PRINCIPIO</span>
          <h2>Recopilar solo lo necesario para prestar cada función.</h2>
          <p>
            BIBLION no vende datos personales. Los servicios externos deben recibir
            únicamente la información necesaria para completar la tarea solicitada.
          </p>
        </div>
      </section>

      <section className="stitch-section" data-reveal>
        <SectionHeading
          eyebrow="DÓNDE VIVEN LOS DATOS"
          title="Cuatro áreas que debes conocer."
        />
        <div className="stitch-legal-area-grid">
          {dataAreas.map((area) => {
            const Icon = area.icon;
            return (
              <article key={area.title}>
                <Icon size={23} />
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="stitch-section stitch-legal-copy" data-reveal>
        <article>
          <span>01</span>
          <div>
            <h2>Datos almacenados en el dispositivo</h2>
            <p>
              BIBLION utiliza almacenamiento local y bases de datos internas para
              ofrecer lectura, historial de búsqueda, resaltados, preferencias,
              conversaciones con Bibi, logros y borradores de estudio.
            </p>
            <p>
              La eliminación de la aplicación puede borrar información que no se
              haya sincronizado o exportado previamente.
            </p>
          </div>
        </article>

        <article>
          <span>02</span>
          <div>
            <h2>Cuenta, Google y Firebase</h2>
            <p>
              Cuando decides iniciar sesión, Google y Firebase pueden procesar
              identificadores de cuenta, nombre, correo, fotografía y datos
              necesarios para autenticación y sincronización.
            </p>
            <p>
              Los borradores de Modo Estudio permanecen locales. Las enseñanzas
              finalizadas y otras funciones compatibles pueden sincronizarse.
            </p>
          </div>
        </article>

        <article>
          <span>03</span>
          <div>
            <h2>Bibi y el servicio de IA</h2>
            <p>
              Muchas consultas pueden resolverse localmente. Cuando solicitas una
              profundización, se puede enviar la pregunta, el pasaje, la versión,
              el texto seleccionado y el contexto del estudio necesario.
            </p>
            <p>
              El nombre visible del perfil no se incorpora automáticamente. No
              escribas información personal sensible dentro de una consulta.
            </p>
          </div>
        </article>

        <article>
          <span>04</span>
          <div>
            <h2>Lista de acceso anticipado</h2>
            <p>
              Recopilamos nombre o alias, correo, dispositivo Android y uso
              principal cuando decides proporcionarlos. También podemos registrar
              fecha, origen del formulario y navegador para administrar solicitudes.
            </p>
            <p>
              Puedes retirar tu consentimiento o solicitar la eliminación escribiendo
              a <a href="mailto:biblion2026@gmail.com">biblion2026@gmail.com</a>.
            </p>
          </div>
        </article>

        <article>
          <span>05</span>
          <div>
            <h2>Tus controles</h2>
            <p>
              Puedes cerrar sesión, eliminar conversaciones de Bibi, descartar
              borradores, desinstalar la aplicación y solicitar acceso, corrección
              o eliminación de la información asociada a los servicios en línea.
            </p>
          </div>
        </article>
      </section>

      <section className="stitch-legal-update" data-reveal>
        <UserRoundCheck size={24} />
        <div>
          <strong>Última actualización: 30 de julio de 2026</strong>
          <p>
            BIBLION continúa en desarrollo. Este documento debe revisarse y
            actualizarse cuando cambien los proveedores, los datos o las funciones.
          </p>
        </div>
        <Link className="stitch-text-link" href="/contacto">
          Contactar al equipo <ArrowRight size={17} />
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
