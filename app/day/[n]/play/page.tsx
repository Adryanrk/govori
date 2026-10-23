"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { FlipCard } from "@/components/FlipCard";
import { GrammarCardView } from "@/components/GrammarCardView";
import { Quiz } from "@/components/Quiz";
import { TypeQuiz } from "@/components/TypeQuiz";
import { Icon, Ru } from "@/components/ui";
import { getDay, getItems, type Step } from "@/content/days";
import { planFor } from "@/lib/plan";
import { PASS_MARK, useProgress } from "@/lib/progress";
import { buildCustom, buildListen, buildQuiz, buildTyping, type Question, type TypeQuestion } from "@/lib/quiz";

type Score = { correct: number; total: number };
type Answer = (itemId: string, correct: boolean) => void;

export default function PlayPage() {
  const params = useParams<{ n: string }>();
  const n = Number(params.n);
  const day = getDay(n);
  const router = useRouter();
  const { progress, markActive, completeDay, recordAnswer, saveCheck } = useProgress();
  const [index, setIndex] = useState(0);
  // The plan is fixed when the lesson starts, so answering doesn't reshuffle it.
  const [steps, setSteps] = useState<Step[] | null>(null);
  const [single, setSingle] = useState(false);
  const [scores, setScores] = useState<Record<string, Score>>({});

  useEffect(() => {
    if (!day || !progress || steps) return;
    // ?step=<id> practises a single step, then returns to the day overview.
    const onlyId = new URLSearchParams(window.location.search).get("step");
    const plan = planFor(day, progress, onlyId);
    setSteps(plan);
    setSingle(Boolean(onlyId) && plan.length === 1);
  }, [day, progress, steps]);

  if (!day) {
    return (
      <div className="lesson" style={{ alignItems: "center", justifyContent: "center", gap: 16, padding: 24 }}>
        <h1 className="display" style={{ fontSize: 32 }}>
          Day {params.n} isn’t written yet.
        </h1>
        <Link href="/today" className="btn btn-dark">
          Back to today
        </Link>
      </div>
    );
  }
  if (!progress || !steps || steps.length === 0) return <div className="lesson" />;

  const step = steps[index];
  const pct = Math.round((index / steps.length) * 100);

  function finishStep(score?: Score) {
    const all = score ? { ...scores, [step.id]: score } : scores;
    if (score) setScores(all);
    markActive(); // one finished step is enough to keep the streak

    if (single) {
      router.push(`/day/${n}`);
      return;
    }
    if (index + 1 < steps!.length) {
      setIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (day!.check) {
      const parts = day!.steps
        .filter((s) => s.part)
        .map((s) => ({ name: s.part!, correct: all[s.id]?.correct ?? 0, total: all[s.id]?.total ?? 0 }));
      saveCheck(day!.week, parts);
      if (parts.every((pt) => pt.total > 0 && pt.correct / pt.total >= PASS_MARK)) completeDay(n);
    } else {
      completeDay(n);
    }
    router.push(`/day/${n}/complete`);
  }

  const doneLabel = single ? "Done" : index + 1 >= steps.length ? (day.check ? "See results" : "Finish day") : "Continue";

  return (
    <div className="lesson">
      <header className="topbar">
        <div className="topbar-inner">
          <Link href={`/day/${n}`} className="icon-btn" aria-label="Close lesson">
            <Icon name="close" />
          </Link>
          <div style={{ flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            <div className="mono muted" style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 12, letterSpacing: "0.08em" }}>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {single
                  ? `DAY ${n} · PRACTICE · ${step.title.toUpperCase()}`
                  : `DAY ${n} · STEP ${index + 1} OF ${steps.length} · ${step.title.toUpperCase()}`}
              </span>
              <span>{single ? "SINGLE STEP" : day.check ? "WEEK CHECK" : `${progress.minutes} MIN PLAN`}</span>
            </div>
            <div className="bar" role="progressbar" aria-label="Day progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
              <div style={{ width: `${Math.max(pct, 3)}%` }} />
            </div>
          </div>
        </div>
      </header>

      <StepView key={`${n}-${step.id}`} step={step} onDone={finishStep} doneLabel={doneLabel} onAnswer={recordAnswer} isCheck={Boolean(day.check)} />

      {index > 0 && !day.check && (
        <div style={{ maxWidth: 1120, width: "100%", margin: "0 auto", padding: "0 24px 24px" }}>
          <button type="button" className="btn btn-ghost" style={{ minHeight: 44, fontSize: 14 }} onClick={() => setIndex((i) => i - 1)}>
            ← Previous step
          </button>
        </div>
      )}
    </div>
  );
}

const LABEL: Record<Step["type"], string> = {
  cards: "Learn",
  quiz: "Check",
  practice: "Practice",
  grammar: "Understand",
  listen: "Listen",
  type: "Write",
};

function StepView({
  step,
  onDone,
  doneLabel,
  onAnswer,
  isCheck,
}: {
  step: Step;
  onDone: (score?: Score) => void;
  doneLabel: string;
  onAnswer: Answer;
  isCheck: boolean;
}) {
  return (
    <main className="lesson-body step-enter">
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
        <span className="eyebrow blue">
          {step.part ? `Week check · ${step.part}` : step.id === "warmup" ? "Review" : LABEL[step.type]} · {step.minutes} min
        </span>
        <h1 className="display" style={{ fontSize: "clamp(28px, 3.2vw, 42px)", lineHeight: 1.12 }}>
          <Ru text={step.title} />
        </h1>
        <p className="lead" style={{ fontSize: 17 }}>
          {step.intro}
        </p>
      </div>
      {step.type === "cards" && <CardsStep step={step} onDone={onDone} doneLabel={doneLabel} />}
      {(step.type === "quiz" || step.type === "listen") && <QuizStep step={step} onDone={onDone} onAnswer={onAnswer} isCheck={isCheck} />}
      {step.type === "type" && <TypeStep step={step} onDone={onDone} onAnswer={onAnswer} isCheck={isCheck} />}
      {step.type === "practice" && <PracticeStep step={step} onDone={onDone} doneLabel={doneLabel} />}
      {step.type === "grammar" && step.grammar && (
        <>
          <GrammarCardView card={step.grammar} />
          <BottomBar>
            <span className="muted" style={{ fontSize: 15 }}>
              Read it through, play the examples, then carry on.
            </span>
            <button type="button" className="btn btn-red" onClick={() => onDone()}>
              {doneLabel === "Continue" ? "Got it" : doneLabel} <Icon name="arrow" />
            </button>
          </BottomBar>
        </>
      )}
    </main>
  );
}

function CardsStep({ step, onDone, doneLabel }: { step: Step; onDone: () => void; doneLabel: string }) {
  const items = getItems(step.items);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const seen = items.filter((i) => open[i.id]).length;
  const all = seen === items.length;

  return (
    <>
      <div className="flip-grid">
        {items.map((it) => (
          <FlipCard key={it.id} item={it} open={Boolean(open[it.id])} onToggle={() => setOpen((o) => ({ ...o, [it.id]: !o[it.id] }))} />
        ))}
      </div>
      <BottomBar>
        <span className="muted" style={{ fontSize: 15 }}>
          {all ? "All explored. They will come back in review." : `${seen} of ${items.length} explored`}
        </span>
        <span style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {!all && (
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(Object.fromEntries(items.map((i) => [i.id, true])))}>
              Reveal all
            </button>
          )}
          <button type="button" className={`btn ${all ? "btn-red" : "btn-dark"}`} onClick={() => onDone()}>
            {doneLabel} <Icon name="arrow" />
          </button>
        </span>
      </BottomBar>
    </>
  );
}

function makeQuestions(step: Step): Question[] {
  if (step.questions) return buildCustom(step.questions, step.count);
  if (step.type === "listen") return buildListen(step.items, step.count ?? 6);
  return buildQuiz(step.items, step.count ?? 8);
}

/** The score screen after a quiz, listening or typing step. */
function Result({ score, isCheck, onRetry, onContinue }: { score: Score; isCheck: boolean; onRetry: () => void; onContinue: () => void }) {
  const ratio = score.total ? score.correct / score.total : 0;
  const passed = ratio >= PASS_MARK;
  return (
    <div className="quiz">
      <div className="quiz-prompt night step-enter">
        <span className="mono" style={{ color: "var(--night-muted)", fontSize: 13, letterSpacing: "0.14em" }}>
          {isCheck ? (passed ? "PART PASSED" : "BELOW 66 %") : "FIRST-TRY SCORE"}
        </span>
        <span className="big">
          {score.correct}/{score.total}
        </span>
        <span style={{ color: "var(--night-text)" }}>
          {isCheck ? (
            passed ? (
              "Above the 66 % pass mark."
            ) : (
              "Under the pass mark. Finish the check, and you will see which days to run again."
            )
          ) : ratio >= 0.8 ? (
            <>
              <Ru text="Отли́чно!" /> Excellent.
            </>
          ) : (
            "Good work. The tricky ones will come back in review."
          )}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
        {!isCheck && (
          <button type="button" className="btn btn-ghost" onClick={onRetry}>
            Try again
          </button>
        )}
        <button type="button" className="btn btn-red" onClick={onContinue} autoFocus>
          Continue <Icon name="arrow" />
        </button>
      </div>
    </div>
  );
}

function QuizStep({ step, onDone, onAnswer, isCheck }: { step: Step; onDone: (s?: Score) => void; onAnswer: Answer; isCheck: boolean }) {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [score, setScore] = useState<Score | null>(null);
  const [firstScore, setFirstScore] = useState<Score | null>(null);

  // Built after mount: shuffling during render would differ between server and browser.
  useEffect(() => {
    setQuestions(makeQuestions(step));
  }, [step]);

  if (!questions) return null;
  if (score) {
    return (
      <Result
        score={score}
        isCheck={isCheck}
        onRetry={() => {
          setScore(null);
          setQuestions(makeQuestions(step));
        }}
        onContinue={() => onDone(firstScore ?? score)}
      />
    );
  }
  return (
    <Quiz
      key={questions.map((q) => q.id).join()}
      questions={questions}
      onAnswer={onAnswer}
      onDone={(correct, total) => {
        const s = { correct, total };
        setScore(s);
        if (!firstScore) setFirstScore(s); // a retry never replaces the first, honest score
      }}
    />
  );
}

function TypeStep({ step, onDone, onAnswer, isCheck }: { step: Step; onDone: (s?: Score) => void; onAnswer: Answer; isCheck: boolean }) {
  const [questions, setQuestions] = useState<TypeQuestion[] | null>(null);
  const [score, setScore] = useState<Score | null>(null);
  const [firstScore, setFirstScore] = useState<Score | null>(null);

  useEffect(() => {
    setQuestions(buildTyping(step.items, step.count ?? 5));
  }, [step]);

  if (!questions) return null;
  if (score) {
    return (
      <Result
        score={score}
        isCheck={isCheck}
        onRetry={() => {
          setScore(null);
          setQuestions(buildTyping(step.items, step.count ?? 5));
        }}
        onContinue={() => onDone(firstScore ?? score)}
      />
    );
  }
  return (
    <TypeQuiz
      key={questions.map((q) => q.id).join()}
      questions={questions}
      onAnswer={onAnswer}
      onDone={(correct, total) => {
        const s = { correct, total };
        setScore(s);
        if (!firstScore) setFirstScore(s);
      }}
    />
  );
}

function PracticeStep({ step, onDone, doneLabel }: { step: Step; onDone: () => void; doneLabel: string }) {
  const items = getItems(step.items);
  return (
    <>
      <div className="practice">
        {items.map((it) =>
          it.kind === "letter" ? (
            <div key={it.id} lang="ru">
              {it.upper}
              {it.lower}
              <small>{it.short}</small>
            </div>
          ) : null
        )}
      </div>
      <div className="card" style={{ padding: 20, display: "flex", gap: 14, alignItems: "flex-start", maxWidth: 720 }}>
        <span className="num" aria-hidden="true">
          <Icon name="pen" />
        </span>
        <span style={{ fontSize: 15, lineHeight: 1.6 }} className="muted">
          Writing by hand is one of the fastest ways to make letters stick. Handwritten Russian looks a bit different from print,
          and that gets its own lesson later. For now, copy the printed shapes.
        </span>
      </div>
      <BottomBar>
        <span className="muted" style={{ fontSize: 15 }}>
          Take your time. Continue when you are done.
        </span>
        <button type="button" className="btn btn-red" onClick={() => onDone()}>
          {doneLabel === "Continue" ? "I’m done" : doneLabel} <Icon name="arrow" />
        </button>
      </BottomBar>
    </>
  );
}

function BottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="bottombar" style={{ margin: "0 -24px", borderRadius: 0 }}>
      <div className="bottombar-inner">{children}</div>
    </div>
  );
}
