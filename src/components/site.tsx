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
} from "lucide-react";
import { ActiveNavLink } from "@/components/active-nav-link";
import { MobileNav } from "@/components/mobile-nav";
import { HeroMockups } from "@/components/hero-mockups";
import { ThemeControl } from "@/components/theme-control";
import { WaitlistTrigger } from "@/components/waitlist-dialog";

export const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/identidad", label: "Ecosistema" },
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
              height={120}
              src="/logos/biblion/logo-biblion-blanco.png"
              width={120}
            />
          </Link>
          <p>
            <strong>Ve más allá de la lectura.</strong>
            <span>Un ecosistema de herramientas para el estudio de la Biblia.</span>
          </p>
        </div>

        <div className="stitch-footer-links">
          <div>
            <strong>Explorar</strong>
            <Link href="/identidad">Ecosistema</Link>
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
        <span>© {year} BIBLION. BIBLION App estará disponible inicialmente para Android.</span>
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
            <span className="stitch-eyebrow">BIBLION APP · ANDROID · ACCESO ANTICIPADO</span>
            <h1>
              Ve más allá
              <br />
              de <em>la lectura.</em>
            </h1>
            <p>
              Lee la Biblia sin conexión, entiende cada pasaje con Bibi y convierte
              lo que descubres en estudios, devocionales o predicaciones. Todo en una
              sola aplicación.
            </p>
            <div className="stitch-hero-actions">
              <WaitlistTrigger className="stitch-button stitch-button-primary" source="home-hero">
                Solicitar acceso anticipado
              </WaitlistTrigger>
              <Link className="stitch-button stitch-button-ghost" href="#recorrido">
                Ver cómo funciona <ArrowRight size={18} />
              </Link>
            </div>
            <ul className="hero-trust" aria-label="Lo esencial de BIBLION App">
              <li><CheckCircle2 aria-hidden="true" size={16} /> Lectura sin conexión</li>
              <li><CheckCircle2 aria-hidden="true" size={16} /> Seis versiones bíblicas</li>
              <li><CheckCircle2 aria-hidden="true" size={16} /> Pruebas gratuitas</li>
            </ul>
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
      <div className="stitch-final-cta-copy">
        <span className="stitch-eyebrow">ÚNETE AL LANZAMIENTO</span>
        <h2>Sé de los primeros en probar BIBLION App.</h2>
        <p>
          Regístrate para participar en las primeras pruebas para Android.
          Ayúdanos a afinar la lectura, el estudio y Bibi, y recibe información
          sobre cada nueva etapa.
        </p>
        <WaitlistTrigger className="stitch-button stitch-button-gold" source="footer-cta">
          Quiero probar BIBLION App
        </WaitlistTrigger>
      </div>
      <div className="stitch-final-cta-features" aria-hidden="true">
        <div className="stitch-cta-feature">
          <BookOpen size={22} />
          <span>
            <strong>Lectura</strong>
            <small>Sin conexión, seis versiones.</small>
          </span>
        </div>
        <div className="stitch-cta-feature">
          <Search size={22} />
          <span>
            <strong>Estudio</strong>
            <small>Diccionario y referencias cruzadas.</small>
          </span>
        </div>
        <div className="stitch-cta-feature">
          <Bot size={22} />
          <span>
            <strong>Bibi</strong>
            <small>Contexto histórico y respuestas.</small>
          </span>
        </div>
      </div>
    </section>
  );
}

export { BookOpen, Bot, CheckCircle2, FileText, Filter, Search };
