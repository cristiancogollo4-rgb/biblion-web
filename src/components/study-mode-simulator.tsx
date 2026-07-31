"use client";

import {
  Bold,
  BookOpen,
  FileText,
  Highlighter,
  Italic,
  List,
  Quote,
  Redo2,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

type TextStyle = "bold" | "italic" | "highlight";

export function StudyModeSimulator() {
  const [styles, setStyles] = useState<TextStyle[]>(["highlight"]);
  const [blockType, setBlockType] = useState<"paragraph" | "list" | "quote">("paragraph");
  const [zoom, setZoom] = useState(100);
  const [compactPanel, setCompactPanel] = useState<"bible" | "document">("document");

  const toggleStyle = (style: TextStyle) => {
    setStyles((current) =>
      current.includes(style)
        ? current.filter((item) => item !== style)
        : [...current, style]
    );
  };

  const selectedTextClass = [
    "study-demo-selected-text",
    styles.includes("bold") ? "is-bold" : "",
    styles.includes("italic") ? "is-italic" : "",
    styles.includes("highlight") ? "is-highlighted" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="section study-simulator-section" data-reveal>
      <div className="section-heading left">
        <span>Editor interactivo</span>
        <h2>Prueba cómo se siente construir una enseñanza.</h2>
        <p>
          Cambia el formato, transforma el bloque y ajusta el zoom. La demostración
          refleja el flujo paginado actual de BIBLION.
        </p>
      </div>

      <div className="study-demo">
        <div className="study-demo-topbar">
          <div>
            <span className="study-demo-status-dot" />
            <strong>Permanecer para dar fruto</strong>
            <small>Guardado como borrador</small>
          </div>
          <div className="study-demo-history">
            <button aria-label="Deshacer" type="button"><Undo2 size={17} /></button>
            <button aria-label="Rehacer" type="button"><Redo2 size={17} /></button>
          </div>
        </div>

        <div className="study-demo-toolbar" aria-label="Herramientas de formato">
          <ToolButton
            active={styles.includes("bold")}
            label="Negrita"
            onClick={() => toggleStyle("bold")}
          >
            <Bold size={17} />
          </ToolButton>
          <ToolButton
            active={styles.includes("italic")}
            label="Cursiva"
            onClick={() => toggleStyle("italic")}
          >
            <Italic size={17} />
          </ToolButton>
          <ToolButton
            active={styles.includes("highlight")}
            label="Resaltar"
            onClick={() => toggleStyle("highlight")}
          >
            <Highlighter size={17} />
          </ToolButton>
          <span className="study-demo-separator" />
          <ToolButton
            active={blockType === "paragraph"}
            label="Párrafo"
            onClick={() => setBlockType("paragraph")}
          >
            <FileText size={17} />
          </ToolButton>
          <ToolButton
            active={blockType === "list"}
            label="Lista"
            onClick={() => setBlockType("list")}
          >
            <List size={17} />
          </ToolButton>
          <ToolButton
            active={blockType === "quote"}
            label="Cita"
            onClick={() => setBlockType("quote")}
          >
            <Quote size={17} />
          </ToolButton>
          <span className="study-demo-toolbar-spacer" />
          <button
            aria-label="Reducir zoom"
            disabled={zoom <= 80}
            onClick={() => setZoom((current) => Math.max(80, current - 10))}
            type="button"
          >
            <ZoomOut size={17} />
          </button>
          <span className="study-demo-zoom">{zoom}%</span>
          <button
            aria-label="Aumentar zoom"
            disabled={zoom >= 130}
            onClick={() => setZoom((current) => Math.min(130, current + 10))}
            type="button"
          >
            <ZoomIn size={17} />
          </button>
        </div>

        <div className="study-demo-mobile-switch">
          <button
            className={compactPanel === "bible" ? "active" : ""}
            onClick={() => setCompactPanel("bible")}
            type="button"
          >
            <BookOpen size={16} /> Biblia
          </button>
          <button
            className={compactPanel === "document" ? "active" : ""}
            onClick={() => setCompactPanel("document")}
            type="button"
          >
            <FileText size={16} /> Documento
          </button>
        </div>

        <div className={`study-demo-workspace show-${compactPanel}`}>
          <aside className="study-demo-bible">
            <div>
              <span>Juan 15</span>
              <strong>RVR1960</strong>
            </div>
            <h3>Jesús, la vid verdadera</h3>
            <p><sup>4</sup> Permaneced en mí, y yo en vosotros.</p>
            <p className="selected"><sup>5</sup> Yo soy la vid, vosotros los pámpanos.</p>
            <p><sup>8</sup> En esto es glorificado mi Padre, en que llevéis mucho fruto.</p>
            <button type="button"><Quote size={15} /> Citar selección</button>
          </aside>

          <div className="study-demo-canvas">
            <article
              className="study-demo-page"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <small>PÁGINA 1 DE 2</small>
              <h2>Permanecer para dar fruto</h2>
              <p>
                Jesús no presenta el fruto como una meta aislada, sino como el
                resultado de permanecer unidos a Él.
              </p>
              {blockType === "paragraph" ? (
                <p className={selectedTextClass}>
                  La comunión precede a la misión y sostiene todo crecimiento.
                </p>
              ) : null}
              {blockType === "list" ? (
                <ul className={selectedTextClass}>
                  <li>Permanecer en la Palabra.</li>
                  <li>Depender de Cristo.</li>
                  <li>Dar fruto con constancia.</li>
                </ul>
              ) : null}
              {blockType === "quote" ? (
                <blockquote className={selectedTextClass}>
                  “Yo soy la vid, vosotros los pámpanos.”
                  <cite>Juan 15:5 · RVR1960</cite>
                </blockquote>
              ) : null}
              <div className="study-demo-verse-block">
                <span>JUAN 15:5</span>
                <p>El que permanece en mí, y yo en él, éste lleva mucho fruto.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolButton({
  active,
  children,
  label,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      className={active ? "active" : ""}
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}
