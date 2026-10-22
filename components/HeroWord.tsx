"use client";

import { speak } from "@/lib/speak";
import { Ru } from "./ui";

/** The dark card in the middle of the hero orbit. Click to hear the word. */
export function HeroWord() {
  return (
    <button type="button" className="word-card night" onClick={() => speak("говори́")} aria-label="Play: говори, speak!">
      <span className="mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--night-muted)" }}>
        WORD 001 · TAP TO HEAR
      </span>
      <Ru text="говори́" className="big" />
      <span className="mono" style={{ fontSize: 15, color: "var(--night-muted)" }}>
        ga · va · <span style={{ color: "var(--coral)", fontWeight: 500 }}>REE</span>
      </span>
      <span style={{ fontSize: 14, color: "var(--night-text)" }}>“speak!” — and the name of this site</span>
    </button>
  );
}
