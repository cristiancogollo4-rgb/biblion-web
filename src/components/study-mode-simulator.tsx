"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ToolGroup = "format" | "structure" | "insert" | "assistant";

type StudyTool = {
  id: string;
  label: string;
  title: string;
  text: string;
  result: string;
  glyph: string;
  group: ToolGroup;
};

const studySimulatorTools: StudyTool[] = [
  {
    id: "h1",
    label: "H1",
    glyph: "H1",
    group: "format",
    title: "Encabezado",
    text: "Convierte el bloque activo en un título o sección.",
    result: "Ordena introducción, desarrollo, aplicación y cierre.",
  },
  {
    id: "p",
    label: "P",
    glyph: "P",
    group: "format",
    title: "Texto normal",
    text: "Devuelve el bloque a párrafo.",
    result: "Útil para continuar una idea sin tratarla como título.",
  },
  {
    id: "bold",
    label: "B",
    glyph: "B",
    group: "format",
    title: "Negrita",
    text: "Da énfasis a una frase seleccionada.",
    result: "Destaca la idea central dentro del mismo bloque.",
  },
  {
    id: "italic",
    label: "I",
    glyph: "/",
    group: "format",
    title: "Cursiva",
    text: "Marca un matiz, observación o énfasis suave.",
    result: "Sirve para frases secundarias sin separarlas del texto.",
  },
  {
    id: "underline",
    label: "U",
    glyph: "U",
    group: "format",
    title: "Subrayado",
    text: "Subraya una frase importante.",
    result: "Mantiene visible una línea que quieres recordar.",
  },
  {
    id: "uppercase",
    label: "AA",
    glyph: "AA",
    group: "format",
    title: "Mayúsculas",
    text: "Transforma la selección a mayúsculas.",
    result: "Útil para títulos cortos, énfasis o frases de bosquejo.",
  },
  {
    id: "lowercase",
    label: "aa",
    glyph: "aa",
    group: "format",
    title: "Minúsculas",
    text: "Transforma la selección a minúsculas.",
    result: "Ayuda a normalizar texto pegado o editado rápidamente.",
  },
  {
    id: "increase",
    label: "A+",
    glyph: "A+",
    group: "format",
    title: "Aumentar texto",
    text: "Sube el tamaño de la selección.",
    result: "Da jerarquía visual a ideas que deben resaltar.",
  },
  {
    id: "decrease",
    label: "A-",
    glyph: "A-",
    group: "format",
    title: "Reducir texto",
    text: "Baja el tamaño de la selección.",
    result: "Sirve para detalles, aclaraciones o notas breves.",
  },
  {
    id: "clear",
    label: "Tx",
    glyph: "Tx",
    group: "format",
    title: "Limpiar formato",
    text: "Quita estilos aplicados a la selección.",
    result: "Devuelve una frase a su apariencia base.",
  },
  {
    id: "color",
    label: "Color",
    glyph: "A",
    group: "structure",
    title: "Color de texto",
    text: "Aplica color a una palabra o frase seleccionada.",
    result: "Diferencia palabras clave, énfasis o ideas por tema.",
  },
  {
    id: "highlight",
    label: "Resaltar",
    glyph: "▰",
    group: "structure",
    title: "Resaltado",
    text: "Añade fondo a una frase importante.",
    result: "Marca la idea que sostiene el punto principal.",
  },
  {
    id: "bullets",
    label: "Viñetas",
    glyph: "☷",
    group: "structure",
    title: "Viñetas",
    text: "Convierte ideas en una lista sencilla.",
    result: "Ordena observaciones, aplicaciones o preguntas.",
  },
  {
    id: "numbered",
    label: "Numerada",
    glyph: "☰",
    group: "structure",
    title: "Lista numerada",
    text: "Organiza puntos en secuencia.",
    result: "Ideal para bosquejos, pasos o argumentos progresivos.",
  },
  {
    id: "columns",
    label: "Columnas",
    glyph: "Ⅱ",
    group: "structure",
    title: "Columnas",
    text: "Divide el bloque en dos columnas paralelas.",
    result: "Permite comparar ideas lado a lado.",
  },
  {
    id: "note",
    label: "Nota",
    glyph: "✎",
    group: "insert",
    title: "Nota",
    text: "Inserta una observación de estudio.",
    result: "Guarda contexto o recordatorios sin mezclarlo con el cuerpo principal.",
  },
  {
    id: "reflection",
    label: "Reflexión",
    glyph: "●",
    group: "insert",
    title: "Reflexión",
    text: "Añade una aplicación o pensamiento pastoral.",
    result: "Conecta explicación bíblica con respuesta práctica.",
  },
  {
    id: "quote",
    label: "Citar",
    glyph: "”",
    group: "insert",
    title: "Citar",
    text: "Inserta los versículos seleccionados y permite compararlos con otra versión bíblica.",
    result: "Conserva referencia, versión principal, texto citado y comparación.",
  },
  {
    id: "bibi",
    label: "Bibi",
    glyph: "B",
    group: "assistant",
    title: "Bibi",
    text: "Abre la asistente bíblica con el contexto del pasaje, la selección y tu enseñanza.",
    result: "Puede sugerir notas, reflexiones, ideas, pasajes relacionados o bosquejos para insertar.",
  },
];

const formatTools = studySimulatorTools.filter((tool) => tool.group === "format");
const structureTools = studySimulatorTools.filter((tool) => tool.group === "structure");
const insertTools = studySimulatorTools.filter((tool) => tool.group === "insert");

function ToolButton({
  tool,
  active,
  onSelect,
}: {
  tool: StudyTool;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={active ? "active" : ""}
      onClick={() => onSelect(tool.id)}
      title={tool.title}
      type="button"
    >
      <span>{tool.glyph}</span>
      <small>{tool.label}</small>
    </button>
  );
}

function ColorPanel({ mode }: { mode: "color" | "highlight" }) {
  return (
    <div className="study-color-panel">
      <div className="study-color-swatches">
        <button type="button">{mode === "color" ? "Auto" : "Sin fondo"}</button>
        <span className="swatch navy" />
        <span className="swatch white" />
        <span className="swatch yellow" />
        <span className="swatch gold" />
        <span className="swatch mint" />
        <span className="swatch green" />
        <span className="swatch blue" />
      </div>
      <div className="study-rgb-row">
        <span className="rgb-preview" />
        <div className="rgb-sliders">
          <label><b>R</b><i /></label>
          <label><b>G</b><i /></label>
          <label><b>B</b><i /></label>
        </div>
        <button type="button" className="rgb-apply">Aplicar</button>
      </div>
    </div>
  );
}

export function StudyModeSimulator() {
  const [selectedToolId, setSelectedToolId] = useState("quote");
  const selectedTool = useMemo(
    () => studySimulatorTools.find((tool) => tool.id === selectedToolId) ?? studySimulatorTools[0],
    [selectedToolId]
  );
  const expandedColorPanel =
    selectedTool.id === "color" || selectedTool.id === "highlight" ? selectedTool.id : null;

  return (
    <section className="section study-simulator-section">
      <div className="section-heading">
        <span>Simulador del editor</span>
        <h2>Elige una herramienta y mira cómo cambia tu enseñanza.</h2>
        <p>
          La burbuja flotante reúne formato, estructura, citas, notas y
          reflexiones tal como se usan dentro del modo estudio.
        </p>
      </div>

      <div className="study-simulator-shell">
        <aside className="study-tool-description">
          <div>
            <span>Herramienta activa</span>
            <h3>{selectedTool.title}</h3>
          </div>
          <p>{selectedTool.text}</p>
          <strong>{selectedTool.result}</strong>
        </aside>

        <div className="study-simulator-stage" data-tool={selectedTool.id}>
          <div className="study-reader-pane">
            <div className="sim-topbar">
              <span>←</span>
              <strong>1 Samuel</strong>
              <div>
                <span>⌕</span>
                <span>−</span>
                <span>+</span>
              </div>
            </div>
            <div className="sim-chapters">
              <span className="active">CAP 1</span>
              <span>CAP 2</span>
              <span>CAP 3</span>
              <span>CAP 4</span>
            </div>
            <div className="sim-reader-text">
              <h4>Nacimiento de Samuel</h4>
              <p><sup>9</sup> Y se levantó Ana después que hubo comido y bebido en Silo.</p>
              <p className="reader-selected"><sup>10</sup> Ella con amargura de alma oró a Jehová, y lloró abundantemente.</p>
              <p><sup>11</sup> E hizo voto, diciendo: Jehová de los ejércitos...</p>
            </div>
            <div className="reader-selection-pill">1 cita lista</div>
          </div>

          <div className="study-editor-pane">
            <div className="sim-editor-topbar">
              <span>×</span>
              <strong>Editor de Estudio</strong>
              <div>
                <span>▣</span>
                <span>▤</span>
              </div>
            </div>
            <div className="sim-document">
              <h3 className={selectedTool.id === "h1" ? "active-heading" : ""}>
                La oración que nace del quebranto
              </h3>
              <p className="sim-paragraph">
                Ana no esconde su dolor delante de Dios; lo convierte en una oración
                honesta y persistente.
              </p>
              <p
                className={[
                  "sim-selected-line",
                  selectedTool.id === "bold" ? "tool-bold" : "",
                  selectedTool.id === "italic" ? "tool-italic" : "",
                  selectedTool.id === "underline" ? "tool-underline" : "",
                  selectedTool.id === "color" ? "tool-color" : "",
                  selectedTool.id === "highlight" ? "tool-highlight" : "",
                  selectedTool.id === "uppercase" ? "tool-uppercase" : "",
                  selectedTool.id === "lowercase" ? "tool-lowercase" : "",
                  selectedTool.id === "increase" ? "tool-increase" : "",
                  selectedTool.id === "decrease" ? "tool-decrease" : "",
                  selectedTool.id === "clear" ? "tool-clear" : "",
                ].join(" ")}
              >
                {selectedTool.id === "uppercase"
                  ? "DIOS ESCUCHA UNA FE SIN MÁSCARAS."
                  : selectedTool.id === "lowercase"
                    ? "dios escucha una fe sin máscaras."
                    : "Dios escucha una fe que se atreve a presentarse sin máscaras."}
              </p>

              {selectedTool.id === "bullets" ? (
                <ul className="sim-list">
                  <li>Dolor presentado en oración.</li>
                  <li>Fe expresada con sinceridad.</li>
                  <li>Esperanza sostenida en Dios.</li>
                </ul>
              ) : null}

              {selectedTool.id === "numbered" ? (
                <ol className="sim-list numbered">
                  <li>Reconocer la carga.</li>
                  <li>Llevarla delante del Señor.</li>
                  <li>Responder con confianza.</li>
                </ol>
              ) : null}

              {selectedTool.id === "columns" ? (
                <div className="sim-columns">
                  <div>
                    <b>Antes</b>
                    <p>Amargura de alma y llanto abundante.</p>
                  </div>
                  <div>
                    <b>Después</b>
                    <p>Una oración que abre camino a la esperanza.</p>
                  </div>
                </div>
              ) : null}

              {selectedTool.id === "note" ? (
                <div className="sim-note-block">
                  <strong>Nota</strong>
                  <p>Observar que Ana ora desde su dolor, no desde una respuesta ya resuelta.</p>
                </div>
              ) : null}

              {selectedTool.id === "reflection" ? (
                <div className="sim-reflection-block">
                  <strong>Reflexión</strong>
                  <p>La fe madura no niega el quebranto; aprende a hablar con Dios en medio de él.</p>
                </div>
              ) : null}

              {selectedTool.id === "quote" ? (
                <div className="sim-quote-block">
                  <div className="sim-quote-header">
                    <strong>1 Samuel 1:10</strong>
                    <button type="button">RV1960 ▾</button>
                    <button type="button">ocultar</button>
                    <button type="button">TLA ▾</button>
                  </div>
                  <div className="sim-quote-compare">
                    <p>
                      <b>RV1960</b>
                      <sup>10</sup> Ella con amargura de alma oró a Jehová, y lloró abundantemente.
                    </p>
                    <p>
                      <b>TLA</b>
                      <sup>10</sup> Ana estaba muy triste, y lloraba amargamente mientras oraba a Dios.
                    </p>
                  </div>
                </div>
              ) : null}

            </div>

            {selectedTool.id === "bibi" ? (
              <aside className="sim-bibi-panel" aria-label="Panel de Bibi">
                <div className="sim-bibi-panel-header">
                  <Image
                    alt=""
                    height={48}
                    src="/logos/bibi/bibi-logo-blanco.png"
                    width={48}
                  />
                  <strong>Bibi</strong>
                  <div>
                    <button type="button" title="Reiniciar conversación">↻</button>
                    <button type="button" title="Limpiar conversación">▣</button>
                    <button
                      onClick={() => setSelectedToolId("quote")}
                      title="Cerrar Bibi"
                      type="button"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <p>
                  Hola, soy Bibi, tu asistente de estudio en Biblion. Puedo ayudarte
                  con ideas, pasajes relacionados, contexto bíblico y reflexiones para
                  tu enseñanza.
                </p>
                <div className="sim-bibi-panel-actions">
                  <button type="button">✚ Nota</button>
                  <button type="button">● Reflexión</button>
                </div>
                <div className="sim-bibi-input">
                  <span>Pregunta sobre tu enseñanza...</span>
                  <b>➤</b>
                </div>
              </aside>
            ) : null}

            {selectedTool.id !== "bibi" ? (
              <button
                className="sim-bibi-floating"
                onClick={() => setSelectedToolId("bibi")}
                title="Abrir Bibi"
                type="button"
              >
                <Image
                  alt=""
                  height={42}
                  src="/logos/bibi/bibi-logo-blanco.png"
                  width={42}
                />
              </button>
            ) : null}

            <div className="study-floating-menu" aria-label="Herramientas del editor">
              <div className="tool-row glyph-row">
                {formatTools.map((tool) => (
                  <ToolButton
                    active={tool.id === selectedTool.id}
                    key={tool.id}
                    onSelect={setSelectedToolId}
                    tool={tool}
                  />
                ))}
              </div>
              <div className="tool-row chip-row">
                {structureTools.map((tool) => (
                  <ToolButton
                    active={tool.id === selectedTool.id}
                    key={tool.id}
                    onSelect={setSelectedToolId}
                    tool={tool}
                  />
                ))}
              </div>
              {expandedColorPanel ? <ColorPanel mode={expandedColorPanel} /> : null}
              <div className="tool-row insert-row">
                {insertTools.map((tool) => (
                  <ToolButton
                    active={tool.id === selectedTool.id}
                    key={tool.id}
                    onSelect={setSelectedToolId}
                    tool={tool}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
