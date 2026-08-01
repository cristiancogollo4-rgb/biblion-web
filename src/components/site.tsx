import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  FileText,
  Filter,
  Instagram,
  Mail,
  Search,
  Sparkles,
} from "lucide-react";
import { ActiveNavLink } from "@/components/active-nav-link";
import { MobileNav } from "@/components/mobile-nav";
import { HeroMockups } from "@/components/hero-mockups";
import { ThemeControl } from "@/components/theme-control";
import { WaitlistTrigger } from "@/components/waitlist-dialog";

export const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/identidad", label: "Identidad" },
  { href: "/funciones", label: "Funciones" },
  { href: "/modo-estudio", label: "Modo estudio" },
  { href: "/bibi", label: "Bibi" },
  { href: "/descargar", label: "Acceso anticipado" },
];

export function SiteHeader() {
  return (
    <div className="stitch-header-wrap">
      <header className="stitch-header">
        <Link className="stitch-brand" href="/" aria-label="BIBLION, ir al inicio">
          <Image
            alt=""
            className="stitch-brand-logo stitch-brand-logo-color"
            height={56}
            priority
            src="/logos/biblion/logo-biblion-light-app.png"
            width={56}
          />
          <Image
            alt=""
            className="stitch-brand-logo stitch-brand-logo-inverse"
            height={56}
            priority
            src="/logos/biblion/logo-biblion-dark-app.png"
            width={56}
          />
          <span className="stitch-brand-name">BIBLION</span>
        </Link>

        <nav className="stitch-desktop-nav" aria-label="Navegación principal">
          {navItems.slice(0, -1).map((item) => (
            <ActiveNavLink href={item.href} key={item.href}>
              {item.label}
            </ActiveNavLink>
          ))}
        </nav>

        <div className="stitch-header-actions">
          <ThemeControl />
          <WaitlistTrigger className="stitch-header-cta" source="header">
            Acceso anticipado
          </WaitlistTrigger>
          <MobileNav items={navItems.slice(0, -1)} />
        </div>
      </header>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="stitch-footer">
      <div className="stitch-footer-main">
        <div className="stitch-footer-brand">
          <Link className="stitch-footer-wordmark" href="/" aria-label="BIBLION, ir al inicio">
            <Image
              alt=""
              height={64}
              src="/logos/biblion/logo-biblion-blanco.png"
              width={64}
            />
          </Link>
          <p>
            <strong>Ve más allá de la lectura.</strong>
            <span>Tu herramienta portátil de estudio.</span>
          </p>
        </div>

        <div className="stitch-footer-links">
          <div>
            <strong>Explorar</strong>
            <Link href="/identidad">Identidad</Link>
            <Link href="/funciones">Funciones</Link>
            <Link href="/modo-estudio">Modo estudio</Link>
            <Link href="/bibi">Bibi</Link>
          </div>
          <div>
            <strong>Proyecto</strong>
            <Link href="/descargar">Acceso anticipado</Link>
            <Link href="/funciones#futuro">Funciones futuras</Link>
            <Link href="/contacto">Contacto</Link>
          </div>
          <div>
            <strong>Información</strong>
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/terminos">Términos</Link>
            <a
              href="https://www.instagram.com/biblionoficial/?hl=es"
              rel="noreferrer"
              target="_blank"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="stitch-footer-bottom">
        <span>© {year} BIBLION. Proyecto en desarrollo para Android.</span>
        <div>
          <a
            aria-label="Instagram de BIBLION"
            href="https://www.instagram.com/biblionoficial/?hl=es"
            rel="noreferrer"
            target="_blank"
          >
            <Instagram size={18} />
          </a>
          <a aria-label="Correo de BIBLION" href="mailto:biblion2026@gmail.com">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  text: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt = "",
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <>
      <SiteHeader />
      <section className={compact ? "stitch-page-hero is-compact" : "stitch-page-hero"}>
        <div className="stitch-page-hero-copy" data-reveal>
          <span className="stitch-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{text}</p>
          {children ? <div className="stitch-hero-actions">{children}</div> : null}
        </div>
        {image ? (
          <div className="stitch-page-hero-art" data-reveal>
            <div className="stitch-brand-halo" />
            <Image alt={imageAlt} height={420} priority src={image} width={620} />
          </div>
        ) : null}
      </section>
    </>
  );
}

export function HomeHero() {
  return (
    <>
      <SiteHeader />
      <section className="stitch-home-hero">
        <div className="hero-grid">
          {/* Left Column: Copy & CTAs */}
          <div className="hero-copy" data-reveal>
            <span className="stitch-eyebrow">VE MÁS ALLÁ DE LA LECTURA</span>
            <h1>
              Estudia la Biblia
              <br />
              a <em>profundidad.</em>
              <br />
              <span className="hero-sub">Sin perder el hilo.</span>
            </h1>
            <p>
              Lee, busca, conecta pasajes y prepara enseñanzas con una experiencia
              diseñada para profundizar tu estudio en la Biblia sin perder el hilo
              de lo que estás estudiando.
            </p>
            <div className="stitch-hero-actions">
              <WaitlistTrigger className="stitch-button stitch-button-primary" source="home-hero">
                Solicitar acceso anticipado
              </WaitlistTrigger>
              <Link className="stitch-button stitch-button-ghost" href="/funciones">
                Explorar BIBLION <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Right Column: Mockups */}
          <div className="hero-mockups" data-reveal>
            <HeroMockups />
          </div>
        </div>
      </section>
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`stitch-section-heading is-${align}`}>
      <span className="stitch-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export function StatusPill({
  tone,
  children,
}: {
  tone: "local" | "beta" | "online" | "future";
  children: ReactNode;
}) {
  return <span className={`stitch-status is-${tone}`}>{children}</span>;
}

export function WaitlistCta() {
  return (
    <section className="stitch-final-cta" data-reveal>
      <div>
        <span className="stitch-eyebrow">DESARROLLO ACTIVO PARA ANDROID</span>
        <h2>Sé parte de las primeras pruebas de BIBLION.</h2>
        <p>
          Únete a la lista de acceso anticipado y ayúdanos a evaluar la lectura,
          el estudio y Bibi antes del lanzamiento general.
        </p>
      </div>
      <WaitlistTrigger className="stitch-button stitch-button-gold" source="footer-cta">
        Quiero participar
      </WaitlistTrigger>
    </section>
  );
}

export { BookOpen, Bot, CheckCircle2, FileText, Filter, Search };
