"use client";

import type { GrammarCard } from "@/content/days";
import { SpeakButton } from "./SpeakButton";
import { Ru } from "./ui";

const HAS_RU = /[а-яё]/i;

/** Renders text, colouring any Russian stress marks it contains. */
function Mixed({ text }: { text: string }) {
  return HAS_RU.test(text) ? <Ru text={text} /> : <>{text}</>;
}

/** A grammar or pronunciation explainer: short paragraphs, an optional table and examples you can play. */
export function GrammarCardView({ card }: { card: GrammarCard }) {
  return (
    <div className="grammar">
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {card.body.map((p, i) => (
          <p key={i} style={{ margin: 0, fontSize: 17, lineHeight: 1.65 }}>
            <Mixed text={p} />
          </p>
        ))}
      </div>

      {card.table && (
        <div style={{ overflowX: "auto" }}>
          <table className="g-table">
            <thead>
              <tr>
                {card.table.head.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {card.table.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>
                      <Mixed text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {card.examples && (
        <div className="g-examples">
          {card.examples.map((ex, i) => (
            <div key={i} className="g-example">
              <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                <span style={{ fontFamily: "var(--f-display)", fontSize: 22, fontWeight: 500 }}>
                  <Ru text={ex.ru} />
                </span>
                <span className="muted" style={{ fontSize: 14 }}>
                  <span className="mono">{ex.tr}</span> · {ex.en}
                </span>
              </span>
              <SpeakButton text={ex.ru.replace(/^—\s*/, "")} light label="Play" />
            </div>
          ))}
        </div>
      )}

      {card.rule && (
        <div className="g-rule">
          <span className="small-mono" style={{ color: "var(--night-muted)" }}>
            Remember
          </span>
          <span style={{ fontSize: 17, fontWeight: 600 }}>
            <Mixed text={card.rule} />
          </span>
        </div>
      )}
    </div>
  );
}
