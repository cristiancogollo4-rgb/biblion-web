"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Sparkles,
  Wand2,
  ArrowLeft,
  ChevronDown,
  Undo2,
  Redo2,
  Plus,
  X,
  Play,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Highlighter,
  Columns2,
  Save,
  Wifi,
  Signal,
  BatteryMedium,
  Instagram,
  MessageCircle,
 Facebook,
  MoreVertical,
  Ellipsis,
  PenSquare,
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

type MockTheme = "light" | "blue" | "dark";

export function FeaturesSection() {
  const [mockTheme, setMockTheme] = useState<MockTheme>("blue");
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "bibi"; text: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const syncTheme = () => {
      const current = document.documentElement.dataset.theme;
      if (current === "light" || current === "blue" || current === "dark") {
        setMockTheme(current);
      }
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const themeClass = `feat-theme-${mockTheme}`;

  const sendQuery = (query: string) => {
    setShowSuggestions(false);
    setChatMessages((prev) => [...prev, { role: "user", text: query }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
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
    <section className={`feat-section ${themeClass}`} data-reveal>
      <div className="feat-glow" />
      <div className="feat-container">
        {/* Left Column */}
        <div className="feat-copy">
          <div>
            <h2 className="feat-title">
              Estudia la Biblia
              <br />
              <em className="feat-title-italic">como nunca antes.</em>
            </h2>
            <p className="feat-subtitle">
              Herramientas avanzadas diseñadas para profundizar, comprender y
              estructurar tu enseñanza desde un solo lugar.
            </p>
          </div>

          <div className="feat-list">
            {features.map((f) => (
              <div className="feat-item" key={f.title}>
                <div className="feat-item-icon">
                  {f.icon === "diagram" && <BookOpen size={17} />}
                  {f.icon === "wand" && <Wand2 size={17} />}
                  {f.icon === "book" && <Sparkles size={17} />}
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
            <div className={`feat-tablet ${themeClass}`}>
              {/* Status Bar */}
              <div className="feat-tablet-bar">
                <div className="feat-tablet-bar-left">
                  <span className="feat-tablet-time">3:09 a.m.</span>
                  <span className="feat-tablet-app-icon"><Instagram size={9} /></span>
                  <span className="feat-tablet-app-icon"><MessageCircle size={9} /></span>
                  <span className="feat-tablet-app-icon"><Facebook size={9} /></span>
                </div>
                <div className="feat-tablet-camera" />
                <div className="feat-tablet-bar-right">
                  <Wifi size={9} />
                  <Signal size={9} />
                  <div className="feat-tablet-battery">
                    <span>76</span>
                    <BatteryMedium size={9} />
                  </div>
                </div>
              </div>

              {/* Editor Header */}
              <div className="feat-editor-header">
                <span aria-hidden="true" className="feat-editor-btn"><X size={14} /></span>
                <div className="feat-editor-title">
                  <span>Documento sin título</span>
                  <Ellipsis size={10} />
                </div>
                <div className="feat-editor-actions">
                  <span className="feat-editor-unsaved">Cambios sin guardar</span>
                  <span aria-hidden="true" className="feat-editor-btn"><Undo2 size={12} /></span>
                  <span aria-hidden="true" className="feat-editor-btn"><Redo2 size={12} /></span>
                  <span aria-hidden="true" className="feat-editor-btn feat-editor-cols"><Columns2 size={12} /></span>
                  <span aria-hidden="true" className="feat-editor-btn"><Save size={12} /></span>
                </div>
              </div>

              {/* Toolbar */}
              <div className="feat-editor-toolbar">
                <div className="feat-toolbar-group">
                  <span aria-hidden="true" className="feat-toolbar-btn"><Bold size={12} /></span>
                  <span aria-hidden="true" className="feat-toolbar-btn"><Italic size={12} /></span>
                  <span aria-hidden="true" className="feat-toolbar-btn"><Underline size={12} /></span>
                  <span aria-hidden="true" className="feat-toolbar-btn"><span className="feat-toolbar-letter">A</span></span>
                  <span aria-hidden="true" className="feat-toolbar-btn"><Highlighter size={11} /></span>
                </div>
                <div className="feat-toolbar-divider" />
                <div className="feat-toolbar-group">
                  <span aria-hidden="true" className="feat-toolbar-btn"><List size={11} /></span>
                  <span aria-hidden="true" className="feat-toolbar-btn"><ListOrdered size={11} /></span>
                </div>
                <div className="feat-toolbar-divider" />
                <div className="feat-toolbar-group">
                  <span aria-hidden="true" className="feat-toolbar-btn feat-toolbar-active"><AlignLeft size={11} /></span>
                  <span aria-hidden="true" className="feat-toolbar-btn"><AlignCenter size={11} /></span>
                  <span aria-hidden="true" className="feat-toolbar-btn"><AlignRight size={11} /></span>
                </div>
                <div className="feat-toolbar-divider" />
                <div className="feat-zoom-control">
                  <span>-</span>
                  <span className="feat-zoom-value">16</span>
                  <ChevronDown size={8} />
                  <span>+</span>
                  <span className="feat-zoom-pct">100%</span>
                </div>
                <span aria-hidden="true" className="feat-toolbar-btn feat-toolbar-palette"><AlignLeft size={11} /></span>
              </div>

              {/* Canvas */}
              <div className="feat-editor-canvas">
                <div className="feat-editor-doc">
                  <div className="feat-doc-header">
                    <span className="feat-doc-title">
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
                    <span className="feat-typing-cursor" />
                  </div>
                </div>

                <div className="feat-doc-footer">
                  <span>240 palabras · 4 versículos</span>
                  <span aria-hidden="true" className="feat-doc-write-btn">
                    <PenSquare size={9} /> Escribir nota
                  </span>
                </div>

                {/* Floating Bibi Badge */}
                <div className="feat-bibi-badge">
                  <svg viewBox="0 0 100 100" className="feat-bibi-svg">
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
            <div className={`feat-phone ${themeClass}`}>
              <div className="feat-phone-notch" />

              {/* Phone Status Bar */}
              <div className="feat-phone-status">
                <span>3:03</span>
                <div className="feat-phone-status-icons">
                  <span className="feat-phone-app-icon"><Instagram size={8} /></span>
                  <span className="feat-phone-app-icon"><MessageCircle size={8} /></span>
                  <span className="feat-phone-app-icon"><Facebook size={8} /></span>
                </div>
                <div className="feat-phone-battery">
                  <Wifi size={8} />
                  <span>69%</span>
                </div>
              </div>

              {/* Scripture Header */}
              <div className="feat-phone-header">
                <ArrowLeft size={10} />
                <div className="feat-phone-chapter">
                  <strong>Genesis 1</strong>
                  <ChevronDown size={8} />
                </div>
                <div className="feat-phone-version">
                  <span className="feat-phone-rv">RV1960</span>
                  <MoreVertical size={10} />
                </div>
              </div>

              {/* Content */}
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
                    <div className="feat-bibi-avatar">
                      <svg viewBox="0 0 100 100" className="feat-bibi-avatar-svg">
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
                    <div className="feat-bibi-info">
                      <strong>Bibi</strong>
                      <small>Asistente bíblico</small>
                    </div>
                    <div className="feat-bibi-header-actions">
                      <span aria-hidden="true"><Undo2 size={10} /></span>
                      <span aria-hidden="true"><Plus size={10} /></span>
                      <span aria-hidden="true"><X size={10} /></span>
                    </div>
                  </div>

                  <div className="feat-bibi-messages">
                    <div className="feat-bibi-greeting">
                      ¡Hola! Soy Bibi, tu asistente bíblico. ¿En qué puedo
                      ayudarte hoy?
                    </div>

                    {showSuggestions && (
                      <div className="feat-bibi-suggestions">
                        <button type="button" onClick={() => sendQuery("¿Quién fue Moisés?")}>
                          ¿Quién fue Moisés?
                        </button>
                        <button type="button" onClick={() => sendQuery("¿Dónde queda Jerusalén?")}>
                          ¿Dónde queda Jerusalén?
                        </button>
                        <button type="button" onClick={() => sendQuery("¿Qué significa pacto?")}>
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
                            <Sparkles size={7} /> Bibi
                          </span>
                        )}
                        {msg.text}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="feat-bibi-typing">
                        <Sparkles size={8} className="feat-bibi-typing-spin" />
                        <span>Bibi respondiendo...</span>
                      </div>
                    )}
                  </div>

                  <form className="feat-bibi-input" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      aria-label="Escribe una pregunta bíblica para Bibi"
                      placeholder="Pregunta a Bibi..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button aria-label="Enviar pregunta a Bibi" type="submit">
                      <Play size={8} />
                    </button>
                  </form>
                </div>
              </div>

              {/* Footer */}
              <div className="feat-phone-footer">
                BIBLION App · Demostración de estudio
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
