"use client";

import Image from "next/image";
import {
  BookOpenText,
  ChevronLeft,
  ChevronRight,
  Languages,
  Network,
  Tags,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const READ_TIME_MS = 9_000;

const statCards = [
  {
    id: "dictionary",
    value: "6,346",
    label: "Entradas de diccionario",
    description: "Personas, lugares y conceptos bíblicos disponibles para consultar.",
    icon: BookOpenText,
  },
  {
    id: "connections",
    value: "340,645",
    label: "Referencias cruzadas",
    description: "Conexiones que permiten seguir el hilo entre distintos pasajes.",
    icon: Network,
  },
  {
    id: "topics",
    value: "693",
    label: "Temas canónicos",
    description: "Temas curados y organizados para profundizar con mayor claridad.",
    icon: Tags,
  },
  {
    id: "versions",
    value: "4+",
    label: "Versiones bíblicas",
    description: "Compara la lectura y conserva el contexto sin salir de BIBLION.",
    icon: Languages,
  },
  {
    id: "bibi",
    value: "Bibi",
    label: "Asistente bíblica contextual",
    description: "Lee contigo y responde preguntas basándose en el pasaje estudiado.",
    image: "/bibi-logo.png",
  },
] as const;

const wrapIndex = (index: number) => (index + statCards.length) % statCards.length;

export function StatsCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const spinTimerRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const total = statCards.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (spinTimerRef.current !== null) window.clearTimeout(spinTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!isInView || isPaused || isSpinning || reduceMotion) return;

    const readTimer = window.setTimeout(() => {
      const target = wrapIndex(active + 1 + Math.floor(Math.random() * (total - 1)));
      const direction = Math.random() > 0.5 ? 1 : -1;
      const distance =
        direction === 1
          ? wrapIndex(target - active)
          : wrapIndex(active - target);
      const fullTurns = 1 + Math.floor(Math.random() * 2);
      const steps = fullTurns * total + distance;
      let completedSteps = 0;

      setIsSpinning(true);

      const advance = () => {
        completedSteps += 1;
        setActive((current) => wrapIndex(current + direction));

        if (completedSteps < steps) {
          const progress = completedSteps / steps;
          const delay = 70 + Math.pow(progress, 3) * 230;
          spinTimerRef.current = window.setTimeout(advance, delay);
        } else {
          spinTimerRef.current = null;
          setIsSpinning(false);
        }
      };

      advance();
    }, READ_TIME_MS);

    return () => window.clearTimeout(readTimer);
  }, [active, isInView, isPaused, isSpinning, reduceMotion, total]);

  const goTo = (index: number) => {
    if (spinTimerRef.current !== null) {
      window.clearTimeout(spinTimerRef.current);
      spinTimerRef.current = null;
    }
    setIsSpinning(false);
    setActive(wrapIndex(index));
  };

  const getPosition = (index: number) => {
    const forward = wrapIndex(index - active);
    return forward > Math.floor(total / 2) ? forward - total : forward;
  };

  const activeCard = statCards[active];

  return (
    <section
      aria-label="BIBLION en cifras"
      aria-roledescription="carrusel"
      className={[
        "stitch-stats-carousel",
        isSpinning ? "is-spinning" : "",
        isPaused || !isInView ? "is-paused" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-reveal
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      onFocusCapture={() => setIsPaused(true)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") event.preventDefault();
        if (event.key === "ArrowLeft") goTo(active - 1);
        if (event.key === "ArrowRight") goTo(active + 1);
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={sectionRef}
      role="region"
    >
      <div className="stitch-stats-heading">
        <div>
          <span className="stitch-stats-eyebrow">BIBLION EN CIFRAS</span>
          <h2>Una biblioteca que conecta cada hallazgo.</h2>
        </div>
        {isSpinning ? (
          <span className="stitch-stats-state is-active">Explorando</span>
        ) : null}
      </div>

      <div className="stitch-stats-stage">
        <div className="stitch-stats-track">
          {statCards.map((card, index) => {
            const position = getPosition(index);
            const Icon = "icon" in card ? card.icon : null;

            return (
              <button
                aria-hidden={Math.abs(position) === 2 ? "true" : undefined}
                aria-label={`${index + 1} de ${total}: ${card.value}, ${card.label}. ${card.description}`}
                className={
                  card.id === "bibi"
                    ? "stitch-stats-card stitch-stats-card-bibi"
                    : "stitch-stats-card"
                }
                data-position={position}
                key={card.id}
                onClick={() => goTo(index)}
                tabIndex={position === 0 ? 0 : -1}
                type="button"
              >
                {card.id === "bibi" ? (
                  <span className="stitch-stats-bibi-mark" aria-hidden="true">
                    <Image
                      alt=""
                      className="stitch-stats-bibi-mark-image"
                      height={72}
                      src={card.image}
                      width={72}
                    />
                  </span>
                ) : (
                  <>
                    <span className="stitch-stats-icon" aria-hidden="true">
                      {Icon ? <Icon size={24} strokeWidth={1.7} /> : null}
                    </span>
                    <span className="stitch-stats-value">{card.value}</span>
                  </>
                )}
                <span className="stitch-stats-label">{card.label}</span>
                <span className="stitch-stats-description">{card.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="stitch-stats-controls">
        <button aria-label="Ver dato anterior" onClick={() => goTo(active - 1)} type="button">
          <ChevronLeft aria-hidden="true" size={20} />
        </button>

        <div className="stitch-stats-navigation">
          <span className="stitch-stats-count">
            <strong>{String(active + 1).padStart(2, "0")}</strong> / {String(total).padStart(2, "0")}
          </span>
          <div className="stitch-stats-progress" role="group" aria-label="Seleccionar dato">
            {statCards.map((card, index) => (
              <button
                aria-label={`Ver ${card.label}`}
                aria-current={index === active ? "true" : undefined}
                className={index === active ? "is-active" : ""}
                key={card.id}
                onClick={() => goTo(index)}
                type="button"
              />
            ))}
          </div>
          {!isSpinning ? (
            <span className="stitch-stats-read-progress" aria-hidden="true" key={active} />
          ) : null}
        </div>

        <button aria-label="Ver siguiente dato" onClick={() => goTo(active + 1)} type="button">
          <ChevronRight aria-hidden="true" size={20} />
        </button>
      </div>

      <p className="stitch-sr-only" aria-live="polite">
        {isSpinning
          ? "El carrusel está girando."
          : `${activeCard.value}, ${activeCard.label}. ${activeCard.description}`}
      </p>
    </section>
  );
}
