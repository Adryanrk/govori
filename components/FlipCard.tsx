"use client";

import type { Item } from "@/content/days";
import { speak } from "@/lib/speak";
import { SpeakButton } from "./SpeakButton";
import { Icon, Ru } from "./ui";

/** Three consistent text sizes by length, so long words and phrases always fit the card. */
export function sizeFor(text: string): string {
  const plain = text.replace(/\u0301/g, "");
  if (/\s/.test(plain.trim())) return "huge-word is-phrase";
  const n = [...plain].length;
  if (n <= 8) return "huge-word";
  if (n <= 11) return "huge-word is-long";
  return "huge-word is-xlong";
}

export function FlipCard({ item, open, onToggle }: { item: Item; open: boolean; onToggle: () => void }) {
  const sayText = item.kind === "letter" ? item.example.ru : item.ru;
  const aria =
    item.kind === "letter"
      ? open
        ? `${item.upper}: ${item.isSign ? item.sound : "sounds like " + item.sound}. Example ${item.example.ru}, ${item.example.en}`
        : `${item.upper}. Tap to reveal`
      : open
        ? `${item.ru}: ${item.tr}, ${item.en}`
        : `${item.ru}. Tap to reveal`;

  return (
    <button
      type="button"
      className="flip"
      aria-pressed={open}
      aria-label={aria}
      onClick={() => {
        if (!open) speak(sayText);
        onToggle();
      }}
    >
      <span className="flip-inner">
        {/* FRONT */}
        <span className="face front">
          <span className="small-mono muted">
            {item.kind === "letter"
              ? item.looksLike
                ? `Looks like “${item.looksLike}”`
                : item.isSign
                  ? "A sign, not a sound"
                  : "Letter"
              : "Word"}
          </span>
          {item.kind === "letter" ? (
            <span className="huge" lang="ru">
              {item.upper}
              <span style={{ fontSize: "0.5em", color: "var(--muted)", marginLeft: 12 }}>{item.lower}</span>
            </span>
          ) : (
            <Ru text={item.ru} className={sizeFor(item.ru)} />
          )}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "var(--blue)" }}>
            Tap to reveal <Icon name="review" size={16} />
          </span>
        </span>

        {/* BACK */}
        <span className="face back night">
          {item.kind === "letter" ? (
            <>
              <span className="row-between" style={{ alignItems: "center" }}>
                <span style={{ fontFamily: "var(--f-display)", fontSize: 40, fontWeight: 500, lineHeight: 1 }} lang="ru">
                  {item.upper}
                  {item.lower}
                </span>
                <SpeakButton text={item.example.ru} />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span className="small-mono" style={{ color: "var(--night-muted)" }}>
                  {item.isSign ? "What it does" : "Sounds like"}
                </span>
                {!item.isSign && (
                  <span style={{ fontFamily: "var(--f-display)", fontSize: 30, fontWeight: 500, color: "var(--coral)" }}>
                    {item.sound}
                  </span>
                )}
                <span style={{ fontSize: 15, color: "var(--night-text)", lineHeight: 1.45 }}>{item.hint}</span>
              </span>
              <span
                className="row-between"
                style={{ paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.14)" }}
              >
                <Ru text={item.example.ru} className={sizeFor(item.example.ru)} />
                <span style={{ fontSize: 14, color: "var(--night-text)" }}>
                  {item.example.tr} · {item.example.en}
                </span>
              </span>
            </>
          ) : (
            <>
              <span className="row-between" style={{ alignItems: "center" }}>
                <span className="small-mono" style={{ color: "var(--night-muted)" }}>
                  Say it
                </span>
                <SpeakButton text={item.ru} />
              </span>
              <Ru text={item.ru} className={sizeFor(item.ru)} />
              <span className="row-between" style={{ paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
                <span className="mono" style={{ fontSize: 16, color: "var(--night-text)" }}>
                  {item.tr}
                </span>
                <span style={{ fontSize: 18, fontWeight: 600 }}>{item.en}</span>
              </span>
            </>
          )}
        </span>
      </span>
    </button>
  );
}
