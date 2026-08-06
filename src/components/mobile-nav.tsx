"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Bot,
  FilePenLine,
  Fingerprint,
  House,
  LayoutGrid,
  Menu,
  Palette,
  X,
} from "lucide-react";
import { ThemeControl } from "@/components/theme-control";
import { WaitlistTrigger } from "@/components/waitlist-dialog";

type MobileNavProps = {
  items: Array<{
    href: string;
    label: string;
  }>;
};

const mobileItemDetails = {
  "/": { icon: House, label: "Inicio" },
  "/identidad": { icon: Fingerprint, label: "Identidad" },
  "/funciones": { icon: LayoutGrid, label: "Funciones" },
  "/modo-estudio": { icon: FilePenLine, label: "Estudio" },
  "/bibi": { icon: Bot, label: "Bibi" },
} as const;

export function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!themeOpen) return;

    const closeOutside = (event: PointerEvent) => {
      if (!mobileNavRef.current?.contains(event.target as Node)) {
        setThemeOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setThemeOpen(false);
    };

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [themeOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="mobile-nav" ref={mobileNavRef}>
      <button
        aria-expanded={open}
        aria-label="Abrir menú"
        className="menu-button mobile-nav-tablet-trigger"
        onClick={() => {
          setThemeOpen(false);
          setOpen(true);
        }}
        type="button"
      >
        <Menu size={22} />
      </button>

      <div className="mobile-nav-capsule">
        <nav aria-label="Navegación principal móvil">
          {items.map((item) => {
            const details = mobileItemDetails[item.href as keyof typeof mobileItemDetails];

            if (!details) return null;

            const Icon = details.icon;
            const active = isActive(item.href);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
                className={
                  active
                    ? "mobile-capsule-link mobile-capsule-link-active"
                    : "mobile-capsule-link"
                }
                href={item.href}
                key={item.href}
                onClick={() => {
                  setOpen(false);
                  setThemeOpen(false);
                }}
              >
                <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
                <span>{details.label}</span>
              </Link>
            );
          })}
        </nav>
        <button
          aria-expanded={themeOpen}
          aria-haspopup="dialog"
          aria-label={themeOpen ? "Cerrar selector de tema" : "Cambiar tema de la página"}
          className="mobile-capsule-link mobile-capsule-more"
          onClick={() => setThemeOpen((current) => !current)}
          type="button"
        >
          <Palette aria-hidden="true" size={20} strokeWidth={1.9} />
          <span>Tema</span>
        </button>
      </div>

      {themeOpen ? (
        <div className="mobile-theme-popover" role="dialog" aria-label="Cambiar tema de la página">
          <span>Tema de la página</span>
          <ThemeControl compactLabels onThemeChange={() => setThemeOpen(false)} />
        </div>
      ) : null}

      {open ? createPortal(
        <div className="mobile-nav-panel" role="dialog" aria-label="Menú principal">
          <div className="mobile-nav-panel-inner">
            <div className="mobile-nav-top">
              <Link
                aria-label="BIBLION, ir al inicio"
                className="mobile-brand"
                href="/"
                onClick={() => setOpen(false)}
              >
                <Image
                  alt=""
                  className="mobile-brand-color"
                  height={48}
                  src="/logos/biblion/logo-biblion-light-app.png"
                  width={48}
                />
                <Image
                  alt=""
                  className="mobile-brand-inverse"
                  height={48}
                  src="/logos/biblion/logo-biblion-dark-app.png"
                  width={48}
                />
                <span>BIBLION</span>
              </Link>
              <button
                aria-label="Cerrar menú"
                className="mobile-nav-close"
                onClick={() => setOpen(false)}
                type="button"
              >
                <X size={22} />
              </button>
            </div>
            <nav aria-label="Navegación móvil">
              {items.map((item) => (
                <Link
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={
                    isActive(item.href)
                      ? "mobile-nav-link mobile-nav-link-active"
                      : "mobile-nav-link"
                  }
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mobile-theme-section">
              <span>Tema de la página</span>
              <ThemeControl expanded />
            </div>
            <WaitlistTrigger className="mobile-nav-cta" source="mobile-menu">
              Acceso anticipado
            </WaitlistTrigger>
          </div>
        </div>,
        document.body,
      ) : null}
    </div>
  );
}
