"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { DayPlan } from "@/components/DayPlan";
import { Icon, Ru } from "@/components/ui";
import { DAYS, dayItems, getDay } from "@/content/days";
import { useProgress } from "@/lib/progress";

/** Overview of one day: pick your time, run the whole day, or practise a single step. */
export default function DayOverviewPage() {
  const params = useParams<{ n: string }>();
  const n = Number(params.n);
  const day = getDay(n);
  const { progress, update } = useProgress();

  if (!day) {
    return (
      <AppShell>
        <h1 className="display page-title">Day {params.n} isn’t written yet.</h1>
        <Link href="/today" className="btn btn-dark" style={{ alignSelf: "flex-start" }}>
          Back to today
        </Link>
      </AppShell>
    );
  }
  if (!progress) return <AppShell>{null}</AppShell>;

  const doneOn = progress.completedDays[n];
  const { letters, words } = dayItems(day);
  const prev = getDay(n - 1);
  const next = getDay(n + 1);

  return (
    <AppShell>
      <header style={{ display: "flex", flexDirection: "column", gap: 10 }} className="rise">
        <Link href="/today" className="mono muted" style={{ fontSize: 13, textDecoration: "none", alignSelf: "flex-start" }}>
          ← TODAY
        </Link>
        <span className="eyebrow">
          {day.stage} · Day {n} of {DAYS.length}
        </span>
        <h1 className="display page-title">{day.title}</h1>
        <p style={{ margin: 0, fontSize: 17 }} className="muted">
          {doneOn
            ? `You finished this day on ${new Date(doneOn).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}. Run it again, or practise just one step.`
            : day.subtitle}
        </p>
      </header>

      <div className="split">
        <DayPlan day={day} minutes={progress.minutes} onMinutes={(t) => update((p) => ({ ...p, minutes: t }))} done={Boolean(doneOn)} />

        <div className="side rise-3">
          <section className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>In this day</h2>
            {letters.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span className="small-mono muted">{letters.length} letters</span>
                <div lang="ru" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {letters.map((l) => (
                    <span
                      key={l.id}
                      style={{ width: 40, height: 40, borderRadius: 10, background: "var(--paper)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--f-display)", fontSize: 18 }}
                    >
                      {l.upper}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {words.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span className="small-mono muted">{words.length} words</span>
                <span style={{ fontSize: 15, lineHeight: 1.7 }}>
                  {words.map((w, i) => (
                    <span key={w.id}>
                      <Ru text={w.ru} />
                      {i < words.length - 1 ? <span className="muted"> · </span> : null}
                    </span>
                  ))}
                </span>
              </div>
            )}
          </section>

          <section className="milestone" style={{ background: doneOn ? "var(--red-soft)" : "#fff", borderColor: doneOn ? "var(--red-line)" : "var(--line)" }}>
            <span className="icon" aria-hidden="true" style={doneOn ? undefined : { background: "var(--paper)", color: "var(--muted)" }}>
              <Icon name="check" />
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className={`mono ${doneOn ? "red" : "muted"}`} style={{ fontSize: 12, letterSpacing: "0.08em", fontWeight: 500 }}>
                {doneOn ? "MILESTONE REACHED" : "AFTER THIS DAY"}
              </span>
              <span style={{ fontWeight: 600, fontSize: 15 }}>{day.milestone.title}</span>
            </span>
          </section>

          <nav aria-label="Other days" style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            {prev ? (
              <Link href={`/day/${prev.n}`} className="btn btn-ghost" style={{ minHeight: 44, fontSize: 14 }}>
                ← Day {prev.n}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/day/${next.n}`} className="btn btn-ghost" style={{ minHeight: 44, fontSize: 14 }}>
                Day {next.n} →
              </Link>
            )}
          </nav>
        </div>
      </div>
    </AppShell>
  );
}
