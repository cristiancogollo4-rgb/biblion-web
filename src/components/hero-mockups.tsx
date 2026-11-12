"use client";

import Image from "next/image";
import {
  Battery,
  BookOpen,
  Home,
  Search,
  Sparkles,
  User,
  Wifi,
  AlignLeft,
  ArrowRight,
  WifiOff,
} from "lucide-react";
import { useEffect, useState } from "react";

type MockTheme = "light" | "blue" | "dark";

export function HeroMockups() {
  const [mockTheme, setMockTheme] = useState<MockTheme>("blue");

  useEffect(() => {
    const syncTheme = () => {
      const current = document.documentElement.dataset.theme;
      if (current === "light" || current === "blue" || current === "dark") {
        setMockTheme(current);
      }
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const themeClass = `hero-preview-theme-${mockTheme}`;

  return (
    <div className="hero-mockups-stage">
      {/* Tablet Mockup */}
      <div className="hero-tablet-wrapper">
        <div className="tablet-chassis">
          <div className="tablet-inner">
            <div className="glass-glare" />
            <div className="tablet-camera">
              <span /><span />
            </div>
            <div className={`tablet-screen ${themeClass}`}>
              <TabletStatus />
              <TabletContent />
              <TabletNav />
            </div>
          </div>
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="hero-phone-wrapper">
        <div className="phone-chassis">
          <div className="phone-inner">
            <div className="glass-glare" />
            <div className="phone-notch" />
            <div className={`phone-screen ${themeClass}`}>
              <PhoneStatus />
              <PhoneHeader />
              <PhoneContent />
              <PhoneNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Tablet Components ── */

function TabletStatus() {
  return (
    <div className="hero-preview-status-bar">
      <span>10:06 p.m.</span>
      <div className="hero-preview-brand">
        <Image
          className="hero-preview-brand-logo hero-preview-brand-logo-light"
          src="/logos/biblion/logo-biblion-light-app.png"
          alt="Biblion"
          width={20}
          height={20}
        />
        <Image
          className="hero-preview-brand-logo hero-preview-brand-logo-dark"
          src="/logos/biblion/logo-biblion-dark-app.png"
          alt="Biblion"
          width={20}
          height={20}
        />
        <span className="hero-preview-brand-text">BIBLION</span>
      </div>
      <div className="hero-preview-status-icons">
        <Wifi size={12} />
        <Battery size={14} />
      </div>
    </div>
  );
}

function TabletContent() {
  return (
    <div className="hero-preview-scroll-content">
      <div className="hero-preview-verse-card">
        <div className="hero-preview-verse-label">
          <Sparkles size={12} />
          <span>VERSÍCULO DEL DÍA</span>
        </div>
        <p className="hero-preview-verse-text">
          &ldquo;Y aun el hombre valiente, cuyo corazón sea como corazón de león,
          desmayará por completo; porque todo Israel sabe que tu padre es hombre
          valiente, y que los que están con él son esforzados.&rdquo;
        </p>
        <span className="hero-preview-verse-ref">2 Samuel 17:10</span>
      </div>

      <div className="hero-preview-card">
        <div className="hero-preview-card-header">
          <div className="hero-preview-card-label">
            <BookOpen size={12} />
            <span>CONTINUAR LECTURA</span>
          </div>
          <span className="hero-preview-card-link">Ir <ArrowRight size={10} /></span>
        </div>
        <div className="hero-preview-card-body">
          <div className="hero-preview-book-cover">
            <BookOpen size={10} />
            <div>
              <span>GÉNESIS</span>
              <small>BIBLION</small>
            </div>
          </div>
          <div className="hero-preview-card-info">
            <strong>Génesis 1</strong>
            <span>Última lectura</span>
            <p>Génesis presenta la creación del mundo, el origen de la humanidad y los comienzos del pacto con Abraham.</p>
          </div>
        </div>
      </div>

      <div className="hero-preview-card">
        <div className="hero-preview-card-body">
          <div className="hero-preview-promo-icon">
            <Sparkles size={14} />
          </div>
          <div className="hero-preview-card-info">
            <strong>Descubre conexiones ocultas</strong>
            <p>Explora cómo versículos de Mateo se conectan con pasajes de Isaías.</p>
            <button className="hero-preview-promo-btn">
              Explorar pasajes <ArrowRight size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabletNav() {
  return (
    <div className="hero-preview-bottom-nav">
      <span className="active"><Home size={12} /><span>Inicio</span></span>
      <span><BookOpen size={12} /><span>Biblia</span></span>
      <span><Search size={12} /><span>Buscar</span></span>
      <span><AlignLeft size={12} /><span>Estudio</span></span>
      <span><User size={12} /><span>Perfil</span></span>
    </div>
  );
}

/* ── Phone Components ── */

function PhoneStatus() {
  return (
    <div className="hero-preview-status-bar phone-status">
      <span>10:05</span>
      <div className="hero-preview-status-icons">
        <Wifi size={8} />
        <Battery size={8} />
      </div>
    </div>
  );
}

function PhoneHeader() {
  return (
    <div className="hero-preview-phone-header">
      <Image
        className="hero-preview-brand-logo hero-preview-brand-logo-light"
        src="/logos/biblion/logo-biblion-light-app.png"
        alt="Biblion"
        width={16}
        height={16}
      />
      <Image
        className="hero-preview-brand-logo hero-preview-brand-logo-dark"
        src="/logos/biblion/logo-biblion-dark-app.png"
        alt="Biblion"
        width={16}
        height={16}
      />
      <span className="hero-preview-brand-text">BIBLION</span>
    </div>
  );
}

function PhoneContent() {
  return (
    <div className="hero-preview-scroll-content phone-scroll">
      <div className="hero-preview-verse-card phone-verse">
        <div className="hero-preview-verse-label">
          <Sparkles size={8} />
          <span>VERSÍCULO DEL DÍA</span>
        </div>
        <p className="hero-preview-verse-text">
          &ldquo;Jehová es mi pastor; nada me faltará.&rdquo;
        </p>
        <span className="hero-preview-verse-ref">Salmo 23:1</span>
      </div>

      <div className="hero-preview-card phone-card">
        <div className="hero-preview-card-header">
          <div className="hero-preview-card-label">
            <BookOpen size={8} />
            <span>CONTINUAR LECTURA</span>
          </div>
          <span className="hero-preview-card-link">Ir →</span>
        </div>
        <div className="hero-preview-card-body">
          <div className="hero-preview-book-cover phone-book">
            <span>ESDRAS</span>
          </div>
          <div className="hero-preview-card-info">
            <strong>Esdras 2</strong>
            <p>El libro de Esdras narra la restauración de Jerusalén...</p>
          </div>
        </div>
      </div>

      <div className="hero-preview-card phone-card">
        <div className="hero-preview-card-body">
          <div className="hero-preview-promo-icon phone-promo-icon">
            <WifiOff size={10} />
          </div>
          <div className="hero-preview-card-info">
            <strong>Tu Biblia siempre contigo</strong>
            <p className="phone-small-text">Lee sin conexión a internet.</p>
            <button className="hero-preview-promo-btn phone-btn">
              Abrir Biblia <ArrowRight size={8} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneNav() {
  return (
    <div className="hero-preview-bottom-nav phone-nav">
      <span className="active"><Home size={10} /></span>
      <span><BookOpen size={10} /></span>
      <span><Search size={10} /></span>
      <span><AlignLeft size={10} /></span>
      <span><User size={10} /></span>
    </div>
  );
}
