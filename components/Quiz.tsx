"use client";

import { useEffect, useState } from "react";
import type { Question } from "@/lib/quiz";
import { speak } from "@/lib/speak";
import { Icon, Ru } from "./ui";

const HAS_RU = /[а-яё]/i;

/**
 * One question at a time. Calls onAnswer(itemId, correct) on the first try of
 * each question (for spaced repetition) and onDone(correct, total) at the end.
 * Wrong answers are asked again at the end, so you always finish on a win.
 */
export function Quiz({
  questions,
  onDone,
  onAnswer,
}: {
  questions: Question[];
  onDone: (correct: number, total: number) => void;
  onAnswer?: (itemId: string, correct: boolean) => void;
}) {
  const [queue, setQueue] = useState<Question[]>(questions);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [firstTry, setFirstTry] = useState(0);

  const q = queue[index];

  // Listening questions play on their own.
  useEffect(() => {
    if (q?.audioOnly) {
      const t = setTimeout(() => speak(q.say), 350);
      return () => clearTimeout(t);
    }
  }, [q, index]);

  if (!q) return null;
  const answered = picked !== null;
  const right = picked === q.answer;
  const longPrompt = [...q.prompt].length > 14;

  function pick(option: string) {
    if (answered) return;
    setPicked(option);
    if (!q.audioOnly) speak(q.say);
    const ok = option === q.answer;
    // Only the first pass counts toward the score and the review schedule.
    if (index < questions.length) {
      if (ok) setFirstTry((n) => n + 1);
      if (q.itemId) onAnswer?.(q.itemId, ok);
    }
    if (!ok) setQueue((qs) => [...qs, { ...q, options: [...q.options].reverse() }]);
  }

  function next() {
    if (index + 1 >= queue.length) {
      onDone(firstTry, questions.length);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }

  return (
    <div className="quiz">
      <div className="mono muted" style={{ fontSize: 13, textAlign: "center" }}>
        {index < questions.length
          ? `Question ${index + 1} of ${questions.length}${queue.length > questions.length ? ` · ${queue.length - questions.length} to retry` : ""}`
          : `Retry ${index - questions.length + 1} of ${queue.length - questions.length}`}
      </div>
      <div key={index} className="quiz-prompt night step-enter">
        {q.audioOnly ? (
          <>
            <button type="button" className="listen-btn" onClick={() => speak(q.say)} aria-label="Play again">
              <Icon name="sound" size={34} />
            </button>
            {answered && <Ru text={q.prompt} className="big" />}
          </>
        ) : longPrompt && !HAS_RU.test(q.prompt) ? (
          <span className="display" style={{ fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.25, maxWidth: 520 }}>
            {q.prompt}
          </span>
        ) : (
          <Ru text={q.prompt} className={longPrompt ? "mid" : "big"} />
        )}
        <span style={{ color: "var(--night-text)", fontSize: 15 }}>{q.ask}</span>
      </div>
      <div className="options" role="group" aria-label="Answers">
        {q.options.map((o) => {
          let cls = "option";
          if (answered && o === q.answer) cls += " right";
          else if (answered && o === picked) cls += " wrong";
          return (
            <button key={o} type="button" className={cls} disabled={answered} onClick={() => pick(o)}>
              {HAS_RU.test(o) ? <Ru text={o} /> : o}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`feedback ${right ? "good" : "bad"}`} role="status">
          <span style={{ color: right ? "var(--blue)" : "var(--red-text)", marginTop: 2 }}>
            <Icon name={right ? "check" : "review"} />
          </span>
          <span>
            <b>{right ? "Right. " : "Not quite. It comes back at the end. "}</b>
            <Ru text={q.note} />
          </span>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type="button" className="btn btn-dark" disabled={!answered} onClick={next} autoFocus={answered}>
          {index + 1 >= queue.length && answered ? "Finish" : "Next"} <Icon name="arrow" />
        </button>
      </div>
    </div>
  );
}
