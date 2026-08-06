"use client";

import { Moon, Palette, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export type BiblionWebTheme = "light" | "blue" | "dark";

const themes = [
  { id: "light" as const, label: "Claro", shortLabel: "Claro", icon: Sun },
  { id: "blue" as const, label: "Azul Rey Oscuro", shortLabel: "Azul", icon: Palette },
  { id: "dark" as const, label: "Oscuro", shortLabel: "Oscuro", icon: Moon },
];

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
  const [theme, setTheme] = useState<BiblionWebTheme>("blue");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "light" || current === "blue" || current === "dark") {
      setTheme(current);
    }
  }, []);

  const selectTheme = (nextTheme: BiblionWebTheme) => {
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("biblion-web-theme", nextTheme);
    setTheme(nextTheme);
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
