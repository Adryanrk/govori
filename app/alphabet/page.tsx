"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon, Ru } from "@/components/ui";
import { ALPHABET_ORDER, DAYS, LETTERS, dayItems, type Letter } from "@/content/days";
import { useProgress } from "@/lib/progress";
import { speak } from "@/lib/speak";

const BY_UPPER = new Map(LETTERS.map((l) => [l.upper, l]));

export default function AlphabetPage() {
  const { progress } = useProgress();
  const [selected, setSelected] = useState<Letter | null>(null);

  const known = new Set<string>();
  if (progress) {
    DAYS.forEach((d) => {
      if (progress.completedDays[d.n]) dayItems(d).letters.forEach((l) => known.add(l.id));
    });
  }

  return (
    <AppShell>
      <header style={{ display: "flex", flexDirection: "column", gap: 10 }} className="rise">
        <span className="eyebrow">
          Алфави́т · {known.size}/{LETTERS.length} learned
        </span>
        <h1 className="display page-title">The alphabet</h1>
        <p style={{ margin: 0, fontSize: 17, maxWidth: 620 }} className="muted">
          All 33 letters in order. Tap one to hear an example word. Letters from days you have finished are outlined in blue.
        </p>
      </header>

      {selected && (
        <section className="card night rise" style={{ padding: 28, display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center" }} aria-live="polite">
          <span lang="ru" style={{ fontFamily: "var(--f-display)", fontSize: 96, fontWeight: 500, lineHeight: 1 }}>
            {selected.upper}
            {selected.lower}
          </span>
          <span style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontFamily: "var(--f-display)", fontSize: 26, color: "var(--coral)" }}>
              {selected.isSign ? selected.sound : `“${selected.sound}”`}
            </span>
            <span style={{ color: "var(--night-text)" }}>{selected.hint}</span>
            <span style={{ fontSize: 22 }}>
              <Ru text={selected.example.ru} className="display" />{" "}
              <span style={{ fontSize: 15, color: "var(--night-text)" }}>
                {selected.example.tr} · {selected.example.en}
              </span>
            </span>
          </span>
          <button type="button" className="btn btn-red" onClick={() => speak(selected.example.ru)}>
            <Icon name="sound" /> Play
          </button>
        </section>
      )}

      <div className="abc">
        {ALPHABET_ORDER.map((ch) => {
          const l = BY_UPPER.get(ch);
          if (!l) return null;
          return (
            <button
              key={ch}
              type="button"
              className={`abc-tile${known.has(l.id) ? " known" : ""}`}
              aria-pressed={selected?.id === l.id}
              onClick={() => {
                setSelected(l);
                speak(l.example.ru);
              }}
            >
              <span className="g" lang="ru">
                {l.upper}
                <span style={{ fontSize: "0.55em", color: "var(--muted)", marginLeft: 6 }}>{l.lower}</span>
              </span>
              <span className="mono" style={{ fontSize: 13, color: l.looksLike ? "var(--red-text)" : "var(--muted)" }}>
                {l.sound}
              </span>
            </button>
          );
        })}
      </div>
    </AppShell>
  );
}
