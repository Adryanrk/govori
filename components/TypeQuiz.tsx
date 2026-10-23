"use client";

import { useCallback, useEffect, useState } from "react";
import { normalizeRu, type TypeQuestion } from "@/lib/quiz";
import { speak } from "@/lib/speak";
import { Icon, Ru } from "./ui";

/** Physical key → the Russian letter in the same place on a Russian (ЙЦУКЕН) keyboard. */
const POSITION: Record<string, string> = {
  KeyQ: "й", KeyW: "ц", KeyE: "у", KeyR: "к", KeyT: "е", KeyY: "н", KeyU: "г", KeyI: "ш", KeyO: "щ", KeyP: "з",
  BracketLeft: "х", BracketRight: "ъ",
  KeyA: "ф", KeyS: "ы", KeyD: "в", KeyF: "а", KeyG: "п", KeyH: "р", KeyJ: "о", KeyK: "л", KeyL: "д",
  Semicolon: "ж", Quote: "э",
  KeyZ: "я", KeyX: "ч", KeyC: "с", KeyV: "м", KeyB: "и", KeyN: "т", KeyM: "ь", Comma: "б", Period: "ю",
  Backquote: "ё",
};

const ROWS = ["йцукенгшщзхъ", "фывапролджэ", "ячсмитьбюё"];

/**
 * Type the Russian word for an English prompt. Wrong answers come back at the end.
 * Calls onAnswer for spaced repetition and onDone(correctFirstTry, total).
 */
export function TypeQuiz({
  questions,
  onAnswer,
  onDone,
}: {
  questions: TypeQuestion[];
  onAnswer?: (itemId: string, correct: boolean) => void;
  onDone: (correct: number, total: number) => void;
}) {
  const [queue, setQueue] = useState(questions);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<"right" | "wrong" | null>(null);
  const [firstTry, setFirstTry] = useState(0);

  const q = queue[index];

  const check = useCallback(() => {
    if (!q || result || !value.trim()) return;
    const ok = normalizeRu(value) === normalizeRu(q.ru);
    setResult(ok ? "right" : "wrong");
    speak(q.ru);
    if (index < questions.length) {
      onAnswer?.(q.itemId, ok);
      if (ok) setFirstTry((n) => n + 1);
    }
    if (!ok) setQueue((qs) => [...qs, q]);
  }, [q, result, value, index, questions.length, onAnswer]);

  const next = useCallback(() => {
    if (index + 1 >= queue.length) {
      onDone(firstTry, questions.length);
      return;
    }
    setIndex((i) => i + 1);
    setValue("");
    setResult(null);
  }, [index, queue.length, onDone, firstTry, questions.length]);

  const type = useCallback(
    (ch: string) => {
      if (result) return;
      setValue((v) => (v + ch).slice(0, 40));
    },
    [result]
  );

  // Physical keyboard: Russian layout works as is; any other layout types by key position.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (e.key === "Enter") {
        e.preventDefault();
        if (result) next();
        else check();
        return;
      }
      if (result) return;
      if (e.key === "Backspace") {
        e.preventDefault();
        setValue((v) => v.slice(0, -1));
        return;
      }
      if (e.key === " ") {
        e.preventDefault();
        type(" ");
        return;
      }
      if (/^[а-яё]$/i.test(e.key)) {
        e.preventDefault();
        type(e.key.toLowerCase());
        return;
      }
      const ru = POSITION[e.code];
      if (ru) {
        e.preventDefault();
        type(e.shiftKey ? ru.toUpperCase() : ru);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [check, next, type, result]);

  if (!q) return null;

  return (
    <div className="quiz">
      <div className="mono muted" style={{ fontSize: 13, textAlign: "center" }}>
        {index < questions.length
          ? `Word ${index + 1} of ${questions.length}${queue.length > questions.length ? ` · ${queue.length - questions.length} to retry` : ""}`
          : `Retry ${index - questions.length + 1} of ${queue.length - questions.length}`}
      </div>

      <div key={index} className="quiz-prompt night step-enter" style={{ gap: 14 }}>
        <span className="mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--night-muted)" }}>
          TYPE IN RUSSIAN
        </span>
        <span className="display" style={{ fontSize: "clamp(30px, 5vw, 44px)" }}>
          {q.en}
        </span>
        <button type="button" className="speak" onClick={() => speak(q.ru)}>
          <Icon name="sound" size={16} /> HEAR IT
        </button>
      </div>

      <div
        className={`type-field${result ? ` ${result}` : ""}`}
        aria-live="polite"
        aria-label={`Your answer: ${value || "empty"}`}
        lang="ru"
      >
        {value || <span className="muted" style={{ fontSize: 16 }}>Start typing…</span>}
        {!result && <span className="caret" aria-hidden="true" />}
      </div>

      {result && (
        <div className={`feedback ${result === "right" ? "good" : "bad"}`} role="status">
          <span style={{ color: result === "right" ? "var(--blue)" : "var(--red-text)", marginTop: 2 }}>
            <Icon name={result === "right" ? "check" : "review"} />
          </span>
          <span>
            <b>{result === "right" ? "Right. " : "Not quite. The answer is "}</b>
            <Ru text={q.ru} /> · {q.tr}
            {result === "wrong" ? ". It comes back at the end." : ""}
          </span>
        </div>
      )}

      {!result && (
        <div className="kbd" role="group" aria-label="Russian keyboard">
          {ROWS.map((row) => (
            <div key={row} className="kbd-row">
              {[...row].map((ch) => (
                <button key={ch} type="button" className="kbd-key" onClick={() => type(ch)} lang="ru">
                  {ch}
                </button>
              ))}
            </div>
          ))}
          <div className="kbd-row">
            <button type="button" className="kbd-key wide" onClick={() => type(" ")}>
              space
            </button>
            <button type="button" className="kbd-key wide" onClick={() => setValue((v) => v.slice(0, -1))} aria-label="Delete">
              ⌫
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span className="muted" style={{ fontSize: 13 }}>
          On a computer, just type: your keys write the Russian letter in the same spot.
        </span>
        {result ? (
          <button type="button" className="btn btn-dark" onClick={next} autoFocus>
            {index + 1 >= queue.length ? "Finish" : "Next"} <Icon name="arrow" />
          </button>
        ) : (
          <button type="button" className="btn btn-dark" onClick={check} disabled={!value.trim()}>
            Check <Icon name="check" />
          </button>
        )}
      </div>
    </div>
  );
}
