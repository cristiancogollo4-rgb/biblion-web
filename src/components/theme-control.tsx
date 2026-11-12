"use client";

import { Moon, Palette, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

export type BiblionWebTheme = "light" | "blue" | "dark";

const themes = [
  { id: "light" as const, label: "Claro", shortLabel: "Claro", icon: Sun },
  { id: "blue" as const, label: "Azul", shortLabel: "Azul", icon: Palette },
  { id: "dark" as const, label: "Oscuro", shortLabel: "Oscuro", icon: Moon },
];

const themeEvent = "biblion-web-theme-change";

function getThemeSnapshot(): BiblionWebTheme {
  const current = document.documentElement.dataset.theme;
  return current === "light" || current === "blue" || current === "dark"
    ? current
    : "blue";
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener(themeEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(themeEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function setWebTheme(nextTheme: BiblionWebTheme) {
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("biblion-web-theme", nextTheme);
  window.dispatchEvent(new Event(themeEvent));
}

type ThemeControlProps = {
  compactLabels?: boolean;
  expanded?: boolean;
  onThemeChange?: (theme: BiblionWebTheme) => void;
};

export function ThemeControl({
  compactLabels = false,
  expanded = false,
  onThemeChange,
}: ThemeControlProps) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => "blue",
  );

  const selectTheme = (nextTheme: BiblionWebTheme) => {
    setWebTheme(nextTheme);
    onThemeChange?.(nextTheme);
  };

  const className = [
    "theme-control",
    expanded ? "theme-control-expanded" : "",
    compactLabels ? "theme-control-compact-labels" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      aria-label="Tema de la página"
      role="group"
    >
      {themes.map((item) => {
        const Icon = item.icon;
        const selected = theme === item.id;

        return (
          <button
            aria-label={`Usar tema ${item.label.toLowerCase()}`}
            aria-pressed={selected}
            className={selected ? "theme-choice theme-choice-active" : "theme-choice"}
            key={item.id}
            onClick={() => selectTheme(item.id)}
            title={`Tema ${item.label}`}
            type="button"
          >
            <Icon aria-hidden="true" size={expanded ? 19 : 16} />
            <span>{compactLabels ? item.shortLabel : item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
