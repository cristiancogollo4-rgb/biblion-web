"use client";

import { useState } from "react";
import {
  BookMarked,
  FilePenLine,
  Link2,
  MessageCircleMore,
  type LucideIcon,
} from "lucide-react";

type LayerId = "context" | "connections" | "bibi" | "study";

type PassageLayer = {
  id: LayerId;
  eyebrow: string;
  title: string;
  description: string;
  insight: string;
  icon: LucideIcon;
};

const layers: PassageLayer[] = [
  {
    id: "context",
    eyebrow: "Comprende",
    title: "Contexto",
    description: "Aclara palabras, personas y lugares sin abandonar el capítulo.",
    insight: "Luz: imagen bíblica asociada con vida, verdad y revelación.",
    icon: BookMarked,
  },
  {
    id: "connections",
    eyebrow: "Relaciona",
    title: "Conexiones",
    description: "Sigue temas y referencias que amplían el sentido del pasaje.",
    insight: "Este pasaje se relaciona con Juan 1:1-5 y 2 Corintios 4:6.",
    icon: Link2,
  },
  {
    id: "bibi",
    eyebrow: "Pregunta",
    title: "Bibi",
    description: "Conversa sobre lo que estás leyendo conservando el contexto.",
    insight: "Puedes preguntarme qué comunica la imagen de la luz en este pasaje.",
    icon: MessageCircleMore,
  },
  {
    id: "study",
    eyebrow: "Construye",
    title: "Modo estudio",
    description: "Organiza el hallazgo y conviértelo en parte de una enseñanza.",
    insight: "Idea de estudio: la luz como inicio, orden y llamado a vivir con propósito.",
    icon: FilePenLine,
  },
];

export function PassageLayers() {
  const [activeLayerId, setActiveLayerId] = useState<LayerId>("context");
  const activeLayer = layers.find((layer) => layer.id === activeLayerId) ?? layers[0];
  const ActiveIcon = activeLayer.icon;

  return (
    <section className="passage-layers" aria-labelledby="passage-layers-title" data-reveal>
      <header className="passage-layers-heading">
        <span className="stitch-eyebrow">UNA EXPERIENCIA CONECTADA</span>
        <h2 id="passage-layers-title">Un pasaje, muchas capas.</h2>
        <p>
          La lectura permanece en el centro mientras BIBLION te ayuda a comprender,
          relacionar y convertir lo descubierto en conocimiento propio.
        </p>
      </header>

      <div className="passage-layers-stage" data-active-layer={activeLayerId}>
        <span className="passage-layers-orbit passage-layers-orbit-one" aria-hidden="true" />
        <span className="passage-layers-orbit passage-layers-orbit-two" aria-hidden="true" />

        <div className="passage-layer-rail passage-layer-rail-left">
          {layers.slice(0, 2).map((layer) => (
            <LayerButton
              key={layer.id}
              layer={layer}
              isActive={layer.id === activeLayerId}
              onSelect={setActiveLayerId}
            />
          ))}
        </div>

        <article className="passage-reader" aria-label="Ejemplo de lectura de Génesis 1">
          <header className="passage-reader-header">
            <span>Génesis 1</span>
            <span>RVR1960</span>
          </header>
          <div className="passage-reader-content">
            <span className="passage-reader-kicker">La creación</span>
            <p><sup>1</sup> En el principio creó Dios los cielos y la tierra.</p>
            <p><sup>2</sup> Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo.</p>
            <p className="passage-reader-focus"><sup>3</sup> Y dijo Dios: Sea la luz; y fue la luz.</p>
          </div>
          <div className="passage-reader-insight" aria-live="polite">
            <span key={`${activeLayer.id}-icon`} className="passage-reader-insight-icon">
              <ActiveIcon aria-hidden="true" size={18} />
            </span>
            <div key={activeLayer.id}>
              <span>{activeLayer.eyebrow} · {activeLayer.title}</span>
              <p>{activeLayer.insight}</p>
            </div>
          </div>
        </article>

        <div className="passage-layer-rail passage-layer-rail-right">
          {layers.slice(2).map((layer) => (
            <LayerButton
              key={layer.id}
              layer={layer}
              isActive={layer.id === activeLayerId}
              onSelect={setActiveLayerId}
            />
          ))}
        </div>
      </div>

      <p className="passage-layers-hint">Selecciona una capa para verla aplicada al pasaje.</p>
    </section>
  );
}

function LayerButton({
  layer,
  isActive,
  onSelect,
}: {
  layer: PassageLayer;
  isActive: boolean;
  onSelect: (id: LayerId) => void;
}) {
  const Icon = layer.icon;

  return (
    <button
      className="passage-layer-trigger"
      type="button"
      aria-pressed={isActive}
      onClick={() => onSelect(layer.id)}
    >
      <span className="passage-layer-trigger-icon"><Icon aria-hidden="true" size={20} /></span>
      <span>
        <small>{layer.eyebrow}</small>
        <strong>{layer.title}</strong>
        <em>{layer.description}</em>
      </span>
    </button>
  );
}
