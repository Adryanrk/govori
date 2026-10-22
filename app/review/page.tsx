"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Quiz } from "@/components/Quiz";
import { Icon } from "@/components/ui";
import { DAYS, dayItems } from "@/content/days";
import { useProgress } from "@/lib/progress";
import { buildQuiz, type Question } from "@/lib/quiz";

export default function ReviewPage() {
  const { progress, markActive } = useProgress();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [round, setRound] = useState(0);

  const ids: string[] = [];
  if (progress) {
    DAYS.forEach((d) => {
      if (progress.completedDays[d.n]) {
        const it = dayItems(d);
        ids.push(...it.letters.map((l) => l.id), ...it.words.map((w) => w.id));
      }
    });
  }
  const key = ids.join();

  useEffect(() => {
    if (!progress) return;
    const pool = key ? key.split(",") : [];
    setQuestions(pool.length ? buildQuiz(pool, Math.min(12, pool.length)) : []);
    setScore(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, round, progress === null]);

  return (
    <AppShell>
      <header style={{ display: "flex", flexDirection: "column", gap: 10 }} className="rise">
        <span className="eyebrow">Review</span>
        <h1 className="display page-title">Keep it fresh.</h1>
        <p style={{ margin: 0, fontSize: 17, maxWidth: 620 }} className="muted">
          A quick mix of letters and words from the days you have finished. A finished review keeps your streak alive, too.
        </p>
      </header>

      {questions && questions.length === 0 && (
        <section className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", maxWidth: 640 }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>Nothing to review yet</h2>
          <p style={{ margin: 0 }} className="muted">
            Finish your first day and its letters and words will show up here.
          </p>
          <Link href="/today" className="btn btn-red">
            Go to today <Icon name="arrow" />
          </Link>
        </section>
      )}

      {questions && questions.length > 0 && !score && (
        <Quiz
          key={round}
          questions={questions}
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
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
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
