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

  const themeClass = `mock-theme-${mockTheme}`;

  return (
    <div className="hero-mockups-stage">
      {/* Constellation Background */}
      <svg className="hero-constellation" viewBox="0 0 900 700" fill="none">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C59B27" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#0C2340" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C59B27" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8CA68" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C59B27" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M 150 400 C 350 200, 550 150, 750 180" stroke="url(#goldGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 200 480 C 400 300, 600 220, 820 300" stroke="url(#goldGrad)" strokeWidth="2" />
        <path d="M 280 250 C 450 100, 650 180, 850 220" stroke="url(#goldGrad)" strokeWidth="1.5" />
        <path d="M 320 520 C 500 400, 700 350, 880 420" stroke="url(#goldGrad)" strokeWidth="1.5" />
        <g transform="translate(680, 190)">
          <circle r="22" fill="#FFFFFF" fillOpacity="0.9" stroke="#E8CA68" strokeWidth="1.5" />
          <circle r="30" fill="url(#nodeGlow)" className="node-pulse" />
          <text x="0" y="5" fontSize="14" textAnchor="middle" fill="#0C2340" fontWeight="bold">✝</text>
        </g>
        <g transform="translate(790, 260)">
          <circle r="16" fill="#FFFFFF" fillOpacity="0.85" stroke="#C59B27" strokeWidth="1" />
          <circle r="22" fill="url(#nodeGlow)" className="node-pulse" style={{ animationDelay: "1s" }} />
          <text x="0" y="4" fontSize="11" textAnchor="middle" fill="#0C2340">📄</text>
        </g>
        <g transform="translate(530, 330)">
          <circle r="14" fill="#FFFFFF" fillOpacity="0.8" stroke="#0C2340" strokeWidth="1" />
          <text x="0" y="4" fontSize="10" textAnchor="middle" fill="#0C2340">📑</text>
        </g>
      </svg>

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

      {/* Phone Mockup - positioned top-right */}
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
    <div className="mock-status-bar">
      <span>10:06 p.m.</span>
      <div className="mock-brand">
        <Image
          className="mock-brand-logo mock-brand-logo-light"
          src="/logos/biblion/logo-biblion-light-app.png"
          alt="Biblion"
          width={20}
          height={20}
        />
        <Image
          className="mock-brand-logo mock-brand-logo-dark"
          src="/logos/biblion/logo-biblion-blanco.png"
          alt="Biblion"
          width={20}
          height={20}
        />
        <span className="mock-brand-text">BIBLION</span>
      </div>
      <div className="mock-status-icons">
        <Wifi size={12} />
        <Battery size={14} />
      </div>
    </div>
  );
}

function TabletContent() {
  return (
    <div className="mock-scroll-content">
      <div className="mock-verse-card">
        <div className="mock-verse-label">
          <Sparkles size={12} />
          <span>VERSÍCULO DEL DÍA</span>
        </div>
        <p className="mock-verse-text">
          &ldquo;Y aun el hombre valiente, cuyo corazón sea como corazón de león,
          desmayará por completo; porque todo Israel sabe que tu padre es hombre
          valiente, y que los que están con él son esforzados.&rdquo;
        </p>
        <span className="mock-verse-ref">2 Samuel 17:10</span>
      </div>

      <div className="mock-card">
        <div className="mock-card-header">
          <div className="mock-card-label">
            <BookOpen size={12} />
            <span>CONTINUAR LECTURA</span>
          </div>
          <span className="mock-card-link">Ir <ArrowRight size={10} /></span>
        </div>
        <div className="mock-card-body">
          <div className="mock-book-cover">
            <BookOpen size={10} />
            <div>
              <span>GENESIS</span>
              <small>BIBLION</small>
            </div>
          </div>
          <div className="mock-card-info">
            <strong>Genesis 1</strong>
            <span>Última lectura</span>
            <p>Génesis presenta la creación del mundo, el origen de la humanidad y los comienzos del pacto con Abraham.</p>
          </div>
        </div>
      </div>

      <div className="mock-card">
        <div className="mock-card-body">
          <div className="mock-promo-icon">
            <Sparkles size={14} />
          </div>
          <div className="mock-card-info">
            <strong>Descubre conexiones ocultas</strong>
            <p>Explora cómo versículos de Mateo se conectan con pasajes de Isaías.</p>
            <button className="mock-promo-btn">
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
    <div className="mock-bottom-nav">
      <span className="active"><Home size={12} /><span>Home</span></span>
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
    <div className="mock-status-bar phone-status">
      <span>10:05</span>
      <div className="mock-status-icons">
        <Wifi size={8} />
        <Battery size={8} />
      </div>
    </div>
  );
}

function PhoneHeader() {
  return (
    <div className="mock-phone-header">
      <Image
        className="mock-brand-logo mock-brand-logo-light"
        src="/logos/biblion/logo-biblion-light-app.png"
        alt="Biblion"
        width={16}
        height={16}
      />
      <Image
        className="mock-brand-logo mock-brand-logo-dark"
        src="/logos/biblion/logo-biblion-blanco.png"
        alt="Biblion"
        width={16}
        height={16}
      />
      <span className="mock-brand-text">BIBLION</span>
    </div>
  );
}

function PhoneContent() {
  return (
    <div className="mock-scroll-content phone-scroll">
      <div className="mock-verse-card phone-verse">
        <div className="mock-verse-label">
          <Sparkles size={8} />
          <span>VERSÍCULO DEL DÍA</span>
        </div>
        <p className="mock-verse-text">
          &ldquo;Jehová es mi pastor; nada me faltará.&rdquo;
        </p>
        <span className="mock-verse-ref">Salmo 23:1</span>
      </div>

      <div className="mock-card phone-card">
        <div className="mock-card-header">
          <div className="mock-card-label">
            <BookOpen size={8} />
            <span>CONTINUAR LECTURA</span>
          </div>
          <span className="mock-card-link">Ir →</span>
        </div>
        <div className="mock-card-body">
          <div className="mock-book-cover phone-book">
            <span>ESDRAS</span>
          </div>
          <div className="mock-card-info">
            <strong>Esdras 2</strong>
            <p>El libro de Esdras narra la restauración de Jerusalén...</p>
          </div>
        </div>
      </div>

      <div className="mock-card phone-card">
        <div className="mock-card-body">
          <div className="mock-promo-icon phone-promo-icon">
            <WifiOff size={10} />
          </div>
          <div className="mock-card-info">
            <strong>Tu Biblia siempre contigo</strong>
            <p className="phone-small-text">Lee sin conexión a internet.</p>
            <button className="mock-promo-btn phone-btn">
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
    <div className="mock-bottom-nav phone-nav">
      <span className="active"><Home size={10} /></span>
      <span><BookOpen size={10} /></span>
      <span><Search size={10} /></span>
      <span><AlignLeft size={10} /></span>
      <span><User size={10} /></span>
    </div>
  );
}
