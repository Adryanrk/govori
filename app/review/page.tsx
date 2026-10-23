"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Quiz } from "@/components/Quiz";
import { Icon } from "@/components/ui";
import { dueItemIds, knownItemIds, load, useProgress } from "@/lib/progress";
import { buildQuiz, type Question } from "@/lib/quiz";

type Mode = "due" | "any";

export default function ReviewPage() {
  const { progress, markActive, recordAnswer } = useProgress();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [round, setRound] = useState(0);
  const [mode, setMode] = useState<Mode>("due");
  const ready = progress !== null;

  // Questions are fixed for a round, so answering (which reschedules items) doesn't reshuffle them.
  useEffect(() => {
    if (!ready) return;
    const p = load();
    const pool = mode === "due" ? dueItemIds(p) : knownItemIds(p);
    setQuestions(pool.length ? buildQuiz(pool.slice(0, 30), Math.min(12, pool.length), knownItemIds(p)) : []);
    setScore(null);
  }, [ready, round, mode]);

  const known = progress ? knownItemIds(progress).length : 0;

  return (
    <AppShell reviewCount={progress ? dueItemIds(progress).length : 0}>
      <header style={{ display: "flex", flexDirection: "column", gap: 10 }} className="rise">
        <span className="eyebrow">Review</span>
        <h1 className="display page-title">Keep it fresh.</h1>
        <p style={{ margin: 0, fontSize: 17, maxWidth: 620 }} className="muted">
          Things you have learned come back right before you would forget them. Get one right and it waits longer next time;
          miss it and it comes back tomorrow. A finished review keeps your streak alive, too.
        </p>
      </header>

      {questions && questions.length === 0 && (
        <section className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", maxWidth: 640 }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>{known > 0 ? "All caught up for today" : "Nothing to review yet"}</h2>
          <p style={{ margin: 0 }} className="muted">
            {known > 0
              ? "Nothing is due right now. You can still practise everything you know."
              : "Finish your first day and its letters and words will show up here."}
          </p>
          {known > 0 ? (
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                setMode("any");
                setRound((r) => r + 1);
              }}
            >
              Practise anyway <Icon name="arrow" />
            </button>
          ) : (
            <Link href="/today" className="btn btn-red">
              Go to today <Icon name="arrow" />
            </Link>
          )}
        </section>
      )}

      {questions && questions.length > 0 && !score && (
        <Quiz
          key={round}
          questions={questions}
          onAnswer={recordAnswer}
          onDone={(correct, total) => {
            markActive();
            setScore({ correct, total });
          }}
        />
      )}

      {score && (
        <div className="quiz">
          <div className="quiz-prompt night step-enter">
            <span className="mono" style={{ color: "var(--night-muted)", fontSize: 13, letterSpacing: "0.14em" }}>
              REVIEW DONE
            </span>
            <span className="big">
              {score.correct}/{score.total}
            </span>
            <span style={{ color: "var(--night-text)" }}>First-try answers. Your streak is safe for today.</span>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
            <button type="button" className="btn btn-ghost" onClick={() => setRound((r) => r + 1)}>
              Another round
            </button>
            <Link href="/today" className="btn btn-red">
              Back to today <Icon name="arrow" />
            </Link>
          </div>
        </div>
      )}
    </AppShell>
  );
}
