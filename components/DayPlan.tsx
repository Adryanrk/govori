"use client";

import Link from "next/link";
import { stepsFor, type Day, type Tier } from "@/content/days";
import { Icon, Ru } from "./ui";

const TIMES: Tier[] = [10, 20, 45];

/**
 * The big day card: dark header, time picker, the step plan and a Start button.
 * Each step is a link, so a single step can be practised on its own.
 */
export function DayPlan({
  day,
  minutes,
  onMinutes,
  done,
}: {
  day: Day;
  minutes: Tier;
  onMinutes: (t: Tier) => void;
  done: boolean;
}) {
  const plan = stepsFor(day, minutes);
  const total = plan.reduce((s, x) => s + x.minutes, 0);

  return (
    <section className="card wide rise-2" style={{ overflow: "hidden" }}>
      <div className="day-hero night">
        <span aria-hidden="true" lang="ru" className="ghost">
          {day.glyph}
          {day.glyph.toLowerCase()}
        </span>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12 }}>
          <span className="small-mono" style={{ color: "var(--night-muted)" }}>
            {day.stage} · Day {day.n}
            {done ? " · Done ✓" : ""}
          </span>
          <h2 className="display" style={{ fontSize: 28, letterSpacing: "-0.02em" }}>
            {day.title}
          </h2>
          <p style={{ margin: 0, fontSize: 16, color: "var(--night-text)", maxWidth: 460 }}>{day.subtitle}</p>
        </div>
      </div>
      <div style={{ padding: "28px 32px 32px", display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <span id={`time-${day.n}`} style={{ fontWeight: 600, fontSize: 15 }}>
            Time today
          </span>
          <div role="group" aria-labelledby={`time-${day.n}`} className="segmented">
            {TIMES.map((t) => (
              <button key={t} type="button" aria-pressed={t === minutes} onClick={() => onMinutes(t)}>
                {t} min
              </button>
            ))}
          </div>
        </div>
        <ol className="plan" key={minutes}>
          {plan.map((step, i) => (
            <li key={step.id} style={{ animationDelay: `${i * 40}ms`, padding: 0 }}>
              <Link href={`/day/${day.n}/play?step=${step.id}`} className="plan-link" aria-label={`Practise only: ${step.title}`}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span style={{ flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{step.title}</span>
                  <span style={{ fontSize: 14 }} className="muted">
                    <Ru text={step.detail} />
                  </span>
                </span>
                <span className="mono muted" style={{ fontSize: 13, flex: "0 0 auto" }}>
                  {step.minutes} min
                </span>
                <span className="plan-go" aria-hidden="true">
                  <Icon name="arrow" size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <span style={{ fontSize: 14 }} className="muted">
            {plan.length} steps · about {total} minutes · tap a step to practise just that one
          </span>
          <Link href={`/day/${day.n}/play`} className="btn btn-red">
            {done ? `Run Day ${day.n} again` : `Start Day ${day.n}`} <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
