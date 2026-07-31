"use client";

import { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Wand2,
  ArrowLeft,
  ChevronDown,
  Undo2,
  Plus,
  X,
  Play,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  List,
  ListOrdered,
  Highlighter,
} from "lucide-react";

const features = [
  {
    icon: "diagram",
    title: "Referencias cruzadas",
    description: (
      <>
        <span className="feat-highlight">340,000+ conexiones</span> que muestran
        cómo se vinculan los versículos entre sí.
      </>
    ),
  },
  {
    icon: "wand",
    title: "Bibi — Tu asistente bíblico",
    description:
      "Define, explica y sugiere pasajes sin salir de la app en tu teléfono o tablet.",
  },
  {
    icon: "book",
    title: "Modo estudio",
    description:
      "Prepara enseñanzas y predicaciones con un editor enriquecido integrado.",
  },
];

const bibiResponses: Record<string, string> = {
  "¿Quién fue Moisés?":
    "Moisés fue el líder escogido por Dios para liberar a Israel de Egipto y recibir la Ley en el Sinaí (Éxodo 3).",
  "¿Dónde queda Jerusalén?":
    "Jerusalén se ubica en las montañas de Judea, entre el mar Mediterráneo y el mar Muerto.",
  "¿Qué significa pacto?":
    "Un pacto es una alianza solemne y compromiso fiel establecido por Dios con su pueblo en las Escrituras.",
};

export function FeaturesSection() {
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "bibi"; text: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const sendQuery = (query: string) => {
    setShowSuggestions(false);
    setChatMessages((prev) => [...prev, { role: "user", text: query }]);

    setTimeout(() => {
      const answer =
        bibiResponses[query] ||
        "He analizado tu pasaje bíblico para ayudarte en tu estudio.";
      setChatMessages((prev) => [...prev, { role: "bibi", text: answer }]);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendQuery(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <section className="feat-section" data-reveal>
      <div className="feat-container">
        {/* Left Column */}
        <div className="feat-copy">
          <div className="feat-eyebrow">
            <span className="feat-eyebrow-dot" />
            Estudia la Biblia como nunca antes
          </div>
          <h2 className="feat-title">
            Herramientas avanzadas para{" "}
            <em>profundizar, comprender y enseñar</em> desde un solo lugar.
          </h2>
          <p className="feat-subtitle">
            Diseñadas para quienes quieren ir más allá de la lectura.
          </p>

          <div className="feat-list">
            {features.map((f) => (
              <div className="feat-item" key={f.title}>
                <div className="feat-item-icon">
                  {f.icon === "diagram" && <BookOpen size={18} />}
                  {f.icon === "wand" && <Wand2 size={18} />}
                  {f.icon === "book" && <Sparkles size={18} />}
                </div>
                <div>
                  <h3 className="feat-item-title">{f.title}</h3>
                  <p className="feat-item-desc">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column — Mockups */}
        <div className="feat-mockups">
          <div className="feat-mockups-stage">
            {/* Tablet — Study Editor */}
            <div className="feat-tablet">
              <div className="feat-tablet-bar">
                <span>3:09 a.m.</span>
                <div className="feat-tablet-camera" />
                <div className="feat-tablet-status">
                  <span>76%</span>
                </div>
              </div>

              <div className="feat-editor-header">
                <button>
                  <X size={14} />
                </button>
                <span>Documento sin título</span>
                <div className="feat-editor-actions">
                  <Undo2 size={12} />
                  <Plus size={12} />
                </div>
              </div>

              <div className="feat-editor-toolbar">
                <div className="feat-toolbar-group">
                  <button><Bold size={12} /></button>
                  <button><Italic size={12} /></button>
                  <button><Underline size={12} /></button>
                  <button><Highlighter size={12} /></button>
                </div>
                <div className="feat-toolbar-divider" />
                <div className="feat-toolbar-group">
                  <button><List size={12} /></button>
                  <button><ListOrdered size={12} /></button>
                </div>
                <div className="feat-toolbar-divider" />
                <div className="feat-toolbar-group">
                  <button className="feat-toolbar-active"><AlignLeft size={12} /></button>
                </div>
              </div>

              <div className="feat-editor-canvas">
                <div className="feat-editor-doc">
                  <div className="feat-doc-header">
                    <span>
                      <BookOpen size={12} /> Predicación: &ldquo;Luz en la Oscuridad&rdquo;
                    </span>
                    <span className="feat-doc-badge">Modo Estudio</span>
                  </div>
                  <p className="feat-doc-text">
                    <strong>I. El principio del orden divino</strong>
                    <br />
                    Génesis 1 muestra la transformación de lo desordenado a
                    través de la Palabra hablada de Dios.
                  </p>
                  <div className="feat-doc-note">
                    <span className="feat-doc-note-label">NOTAS DE ESTUDIO</span>
                    El término &ldquo;Verbo&rdquo; conecta con la eternidad de
                    Cristo...
                  </div>
                </div>

                {/* Floating Bibi Badge */}
                <div className="feat-bibi-badge">
                  <svg viewBox="0 0 100 100" className="feat-bibi-icon">
                    <path
                      d="M50 15 C30 15 15 30 15 50 C15 65 25 78 40 83 L40 90 L50 85 C50 85 85 85 85 50 C85 30 70 15 50 15 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="7"
                    />
                    <circle cx="38" cy="45" r="4.5" fill="currentColor" />
                    <circle cx="62" cy="45" r="4.5" fill="currentColor" />
                    <path
                      d="M40 58 Q50 66 60 58"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path d="M25 25 Q35 10 30 0 Q40 12 35 25" fill="currentColor" />
                  </svg>
                  <span>Bibi</span>
                </div>
              </div>
            </div>

            {/* Phone — Bibi Chat */}
            <div className="feat-phone">
              <div className="feat-phone-notch" />
              <div className="feat-phone-status">
                <span>3:03</span>
                <span>69%</span>
              </div>

              <div className="feat-phone-header">
                <ArrowLeft size={12} />
                <span>
                  Genesis 1 <ChevronDown size={10} />
                </span>
                <span className="feat-phone-version">RV1960</span>
              </div>

              <div className="feat-phone-content">
                <div className="feat-phone-scripture">
                  <h4>La creación</h4>
                  <p>
                    <sup>1</sup>En el principio creó Dios los cielos y la
                    tierra.
                  </p>
                </div>

                <div className="feat-bibi-chat">
                  <div className="feat-bibi-chat-header">
                    <div className="feat-bibi-chat-avatar">
                      <svg viewBox="0 0 100 100" className="feat-bibi-icon-sm">
                        <path
                          d="M50 15 C30 15 15 30 15 50 C15 65 25 78 40 83 L40 90 L50 85 C50 85 85 85 85 50 C85 30 70 15 50 15 Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="7"
                        />
                        <circle cx="38" cy="45" r="4.5" fill="currentColor" />
                        <circle cx="62" cy="45" r="4.5" fill="currentColor" />
                        <path
                          d="M40 58 Q50 66 60 58"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <strong>Bibi</strong>
                      <small>Asistente bíblico</small>
                    </div>
                    <div className="feat-bibi-chat-actions">
                      <Undo2 size={10} />
                      <Plus size={10} />
                      <X size={10} />
                    </div>
                  </div>

                  <div className="feat-bibi-messages">
                    <div className="feat-bibi-greeting">
                      ¡Hola! Soy Bibi, tu asistente bíblico. ¿En qué puedo
                      ayudarte hoy?
                    </div>

                    {showSuggestions && (
                      <div className="feat-bibi-suggestions">
                        <button onClick={() => sendQuery("¿Quién fue Moisés?")}>
                          ¿Quién fue Moisés?
                        </button>
                        <button
                          onClick={() => sendQuery("¿Dónde queda Jerusalén?")}
                        >
                          ¿Dónde queda Jerusalén?
                        </button>
                        <button
                          onClick={() => sendQuery("¿Qué significa pacto?")}
                        >
                          ¿Qué significa pacto?
                        </button>
                      </div>
                    )}

                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={
                          msg.role === "user"
                            ? "feat-bibi-msg-user"
                            : "feat-bibi-msg-bibi"
                        }
                      >
                        {msg.role === "bibi" && (
                          <span className="feat-bibi-msg-label">
                            <Sparkles size={8} /> Bibi
                          </span>
                        )}
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  <form className="feat-bibi-input" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Pregunta a Bibi..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit">
                      <Play size={10} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
