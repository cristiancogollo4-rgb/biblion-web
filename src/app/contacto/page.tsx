import Link from "next/link";
import {
  ArrowRight,
  Bug,
  Instagram,
  Mail,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { PageHero, SectionHeading, SiteFooter } from "@/components/site";

const contactOptions = [
  {
    icon: Mail,
    title: "Correo oficial",
    text: "Acceso anticipado, soporte, privacidad y solicitudes generales.",
    href: "mailto:biblion2026@gmail.com",
    label: "biblion2026@gmail.com",
  },
  {
    icon: Instagram,
    title: "Instagram",
    text: "Novedades, avances y comunicación pública del proyecto.",
    href: "https://www.instagram.com/biblionoficial/?hl=es",
    label: "@biblionoficial",
  },
  {
    icon: Smartphone,
    title: "Página oficial",
    text: "Información actualizada sobre BIBLION y sus funciones.",
    href: "https://biblion-web-roan.vercel.app",
    label: "biblion-web-roan.vercel.app",
  },
];

export default function ContactoPage() {
  return (
    <main className="stitch-page">
      <PageHero
        compact
        eyebrow="CONTACTO"
        title={<>Una vía real para cada <em>consulta.</em></>}
        text="Escríbenos para resolver dudas sobre el acceso, informar un problema o ejercer tus derechos sobre los datos."
      />

      <section className="stitch-section" data-reveal>
        <SectionHeading
          align="center"
          eyebrow="CANALES OFICIALES"
          title="Elige el canal que mejor corresponda."
        />
        <div className="stitch-contact-grid">
          {contactOptions.map((option) => {
            const Icon = option.icon;
            const external = option.href.startsWith("http");
            return (
              <a
                href={option.href}
                key={option.title}
                rel={external ? "noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                <Icon size={26} />
                <h2>{option.title}</h2>
                <p>{option.text}</p>
                <strong>{option.label} <ArrowRight size={17} /></strong>
              </a>
            );
          })}
        </div>
      </section>

      <section className="stitch-report-section" data-reveal>
        <div>
          <Bug size={30} />
          <span className="stitch-eyebrow">REPORTAR UN ERROR</span>
          <h2>Cuéntanos qué ocurrió y cómo podemos reproducirlo.</h2>
        </div>
        <ol>
          <li>Describe la pantalla y la acción que estabas realizando.</li>
          <li>Indica el modelo del dispositivo y la versión de Android.</li>
          <li>Incluye una captura si no contiene información personal.</li>
          <li>Evita enviar contraseñas, textos privados o datos sensibles.</li>
        </ol>
        <a className="stitch-button stitch-button-gold" href="mailto:biblion2026@gmail.com?subject=Reporte%20de%20error%20BIBLION">
          Enviar reporte por correo
        </a>
      </section>

      <section className="stitch-privacy-banner" data-reveal>
        <ShieldCheck size={25} />
        <div>
          <strong>Privacidad y eliminación de datos</strong>
          <p>Utiliza el correo oficial para solicitar acceso, corrección o eliminación.</p>
        </div>
        <Link className="stitch-text-link" href="/privacidad">
          Ver privacidad <ArrowRight size={17} />
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
