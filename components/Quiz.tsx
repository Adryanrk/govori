"use client";

import { useState } from "react";
import type { Question } from "@/lib/quiz";
import { speak } from "@/lib/speak";
import { Icon, Ru } from "./ui";

/**
 * One question at a time. Calls onDone(correct, total) after the last one.
 * Wrong answers are asked again at the end, so you always finish on a win.
 */
export function Quiz({ questions, onDone }: { questions: Question[]; onDone: (correct: number, total: number) => void }) {
  const [queue, setQueue] = useState<Question[]>(questions);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [firstTry, setFirstTry] = useState(0);

  const q = queue[index];
  if (!q) return null;
  const answered = picked !== null;
  const right = picked === q.answer;

  function pick(option: string) {
    if (answered) return;
    setPicked(option);
    speak(q.say);
    if (option === q.answer) {
      // Only the first pass counts toward the score.
      if (index < questions.length) setFirstTry((n) => n + 1);
    } else {
      // Ask it again at the end.
      setQueue((qs) => [...qs, { ...q, options: [...q.options].reverse() }]);
    }
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
        <Ru text={q.prompt} className="big" />
        <span style={{ color: "var(--night-text)", fontSize: 15 }}>{q.ask}</span>
      </div>
      <div className="options" role="group" aria-label="Answers">
        {q.options.map((o) => {
          let cls = "option";
          if (answered && o === q.answer) cls += " right";
          else if (answered && o === picked) cls += " wrong";
          return (
            <button key={o} type="button" className={cls} disabled={answered} onClick={() => pick(o)}>
              {o}
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
