"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const connectionPaths = [
  "M-80 176 C170 38 356 286 642 170 S1112 38 1520 186",
  "M-70 642 C210 462 410 706 704 542 S1180 408 1510 598",
  "M122 930 C226 692 354 482 620 400 S1064 258 1346 -42",
  "M-120 410 C178 306 340 410 548 350 S938 202 1116 336 S1360 496 1540 354",
];

const connectionNodes = [
  [106, 132],
  [318, 226],
  [548, 194],
  [774, 118],
  [1010, 132],
  [1284, 78],
  [102, 620],
  [344, 562],
  [610, 574],
  [862, 466],
  [1118, 470],
  [1358, 568],
  [230, 720],
  [520, 434],
  [742, 346],
  [976, 266],
  [1224, 112],
] as const;

function ConnectionMap({ className }: { className: string }) {
  return (
    <svg
      className={className}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 900"
    >
      <g className="biblion-ambient-paths">
        {connectionPaths.map((path) => (
          <path d={path} key={path} />
        ))}
      </g>
      <g className="biblion-ambient-nodes">
        {connectionNodes.map(([cx, cy], index) => (
          <circle cx={cx} cy={cy} key={`${cx}-${cy}`} r={index % 3 === 0 ? 4 : 2.8} />
        ))}
      </g>
    </svg>
  );
}

export function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const matches = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal], main > section:not(:first-child), .section-heading, article"
      )
    );
    const candidates = matches
      .filter(
        (element) =>
          !matches.some(
            (possibleParent) =>
              possibleParent !== element && possibleParent.contains(element)
          )
      )
      .slice(0, 100);

    root.classList.add("motion-ready");
    document.body.classList.remove("page-enter");
    window.requestAnimationFrame(() => document.body.classList.add("page-enter"));

    if (reducedMotion) {
      candidates.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    candidates.forEach((element, index) => {
      element.classList.add("reveal-item");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
      observer.observe(element);
    });

    let frame = 0;
    const trackPointer = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
        root.style.setProperty(
          "--ambient-shift-x",
          `${(event.clientX / window.innerWidth - 0.5) * 16}px`
        );
        root.style.setProperty(
          "--ambient-shift-y",
          `${(event.clientY / window.innerHeight - 0.5) * 12}px`
        );
      });
    };

    const trackScroll = () => {
      root.style.setProperty(
        "--ambient-scroll",
        `${Math.min(window.scrollY * 0.035, 84)}px`
      );
      root.classList.toggle("is-past-hero", window.scrollY > window.innerHeight * 0.9);
    };

    window.addEventListener("pointermove", trackPointer, { passive: true });
    window.addEventListener("scroll", trackScroll, { passive: true });
    trackScroll();
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", trackPointer);
      window.removeEventListener("scroll", trackScroll);
      root.classList.remove("is-past-hero");
    };
  }, [pathname]);

  return (
    <div className="biblion-ambient" aria-hidden="true">
      <div className="biblion-ambient-texture" />
      <ConnectionMap className="biblion-ambient-network" />
      <ConnectionMap className="biblion-ambient-network biblion-ambient-network-focus" />
      <div className="biblion-ambient-halo" />
    </div>
  );
}
