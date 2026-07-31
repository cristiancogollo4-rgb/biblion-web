"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeControl } from "@/components/theme-control";
import { WaitlistTrigger } from "@/components/waitlist-dialog";

type MobileNavProps = {
  items: Array<{
    href: string;
    label: string;
  }>;
};

export function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="mobile-nav">
      <button
        aria-expanded={open}
        aria-label="Abrir menú"
        className="menu-button"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu size={22} />
      </button>

      {open ? (
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
        </div>
      ) : null}
    </div>
  );
}
