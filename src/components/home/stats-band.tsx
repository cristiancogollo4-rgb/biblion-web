"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  text: string;
};

const stats: Stat[] = [
  {
    value: 6,
    label: "Versiones bíblicas",
    text: "RVR1960, NVI, NTV, DHH, TLA y PDT, disponibles sin conexión.",
  },
  {
    value: 6346,
    label: "Entradas de diccionario",
    text: "Personas, lugares, conceptos y prácticas en ocho categorías.",
  },
  {
    value: 340645,
    label: "Referencias cruzadas",
    text: "Conexiones entre versículos para seguir el hilo de un pasaje.",
  },
  {
    value: 693,
    label: "Temas bíblicos",
    text: "Doctrina, vida cristiana, personajes, lugares y eventos.",
  },
];

const formatter = new Intl.NumberFormat("es-CO");

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const value = useCountUp(stat.value, active);
  return (
    <div className="home-stat">
      <strong aria-hidden="true">
        {formatter.format(value)}
        {stat.suffix}
      </strong>
      <span className="stitch-sr-only">{formatter.format(stat.value)}</span>
      <h3>{stat.label}</h3>
      <p>{stat.text}</p>
    </div>
  );
}

export function StatsBand() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="home-stats-title" className="home-stats" ref={ref}>
      <h2 className="stitch-sr-only" id="home-stats-title">
        BIBLION App en cifras
      </h2>
      <div className="home-stats-grid">
        {stats.map((stat) => (
          <StatItem active={active} key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
