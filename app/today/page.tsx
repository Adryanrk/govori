"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { DayPlan } from "@/components/DayPlan";
import { Icon, Ru } from "@/components/ui";
import { COMING_UP, DAYS, LETTERS, getDay } from "@/content/days";
import { currentDay, learned, streak, useProgress } from "@/lib/progress";

const TINTS = [
  { bg: "#EEF2FF", fg: "rgba(47,91,234,0.35)" },
  { bg: "#FDEEEE", fg: "rgba(204,43,51,0.3)" },
  { bg: "#F1F3F8", fg: "rgba(11,19,48,0.2)" },
];

export default function TodayPage() {
  const { progress, update } = useProgress();

  if (!progress) {
    return (
      <AppShell>
        <div style={{ minHeight: 400 }} />
      </AppShell>
    );
  }

  const n = currentDay(progress);
  const day = getDay(n)!;
  const minutes = progress.minutes;
  const done = Object.keys(progress.completedDays).length;
  const { letters, words } = learned(progress);
  const s = streak(progress);
  const allDone = DAYS.every((d) => progress.completedDays[d.n]);
  const reviewCount = letters + words;

  return (
    <AppShell reviewCount={reviewCount > 0 ? Math.min(reviewCount, 12) : 0}>
      <header style={{ display: "flex", flexDirection: "column", gap: 10 }} className="rise">
        <span className="eyebrow">Today · Day {n}</span>
        <h1 className="display page-title">
          <Ru text="Приве́т" />
          {done > 0 ? ", welcome back." : "."}
        </h1>
        <p style={{ margin: 0, fontSize: 17 }} className="muted">
          {allDone
            ? "You have finished the whole alphabet. Run any day again, or review while the next days are being written."
            : s > 0
              ? `You are on a ${s}-day streak. How much time do you have today?`
              : `Day ${n} is ready. How much time do you have today?`}
        </p>
      </header>

      <div className="split">
        {/* DAY CARD */}
        <DayPlan
          day={day}
          minutes={minutes}
          onMinutes={(t) => update((p) => ({ ...p, minutes: t }))}
          done={Boolean(progress.completedDays[day.n])}
        />

        {/* SIDE */}
        <div className="side rise-3">
          <section aria-label="Progress" className="card stats">
            <div className="stat">
              <b>{s}</b>
              <span>day streak</span>
            </div>
            <div className="stat">
              <b>
                {letters}
                <span style={{ fontSize: 15 }} className="muted">
                  /{LETTERS.length}
                </span>
              </b>
              <span>letters</span>
            </div>
            <div className="stat">
              <b>{words}</b>
              <span>words</span>
            </div>
          </section>

          <section className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Your path</h2>
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
              {[
                { code: "Аа", name: "Alphabet", note: allDone ? "Complete" : "You are here", state: "now" },
                { code: "A1", name: "Beginner", note: "Greetings, numbers, first sentences", state: "next" },
                { code: "A2", name: "Elementary → C2", note: "Unfolds as you go", state: "" },
              ].map((l, i, arr) => (
                <li key={l.code} style={{ display: "flex", gap: 14 }}>
                  <span style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span
                      className={`level ${l.state}`}
                      style={{ width: 32, height: 32, fontSize: l.state === "now" ? 12 : 11 }}
                      lang={l.state === "now" ? "ru" : undefined}
                    >
                      {l.code}
                    </span>
                    {i < arr.length - 1 && <span aria-hidden="true" style={{ flex: 1, width: 1, minHeight: 14, background: "var(--line)" }} />}
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", paddingBottom: i < arr.length - 1 ? 16 : 0 }}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{l.name}</span>
                    <span style={{ fontSize: 13, fontWeight: l.state === "now" ? 600 : 400 }} className={l.state === "now" ? "red" : "muted"}>
                      {l.note}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {reviewCount > 0 ? (
            <Link href="/review" className="card" style={{ padding: 24, display: "flex", gap: 14, alignItems: "center", textDecoration: "none" }}>
              <span className="num" aria-hidden="true">
                <Icon name="review" />
              </span>
              <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>Quick review</span>
                <span style={{ fontSize: 14 }} className="muted">
                  {letters} letters and {words} words to keep fresh
                </span>
              </span>
              <Icon name="arrow" />
            </Link>
          ) : (
            <section className="card" style={{ padding: 24, display: "flex", gap: 14, alignItems: "flex-start", borderStyle: "dashed", borderColor: "var(--line-2)" }}>
              <span className="num" aria-hidden="true" style={{ background: "var(--paper)", color: "var(--muted)" }}>
                <Icon name="review" />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>Nothing to review yet</span>
                <span style={{ fontSize: 14, lineHeight: 1.5 }} className="muted">
                  Reviews start once you finish your first day.
                </span>
              </span>
            </section>
          )}
        </div>
      </div>

      {/* ALL DAYS */}
      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Your days</h2>
          <span style={{ fontSize: 14 }} className="muted">
            Every day is open. Jump ahead or run one again whenever you like.
          </span>
        </div>
        <div className="days">
          {DAYS.map((d, i) => {
            const t = TINTS[i % TINTS.length];
            const isDone = Boolean(progress.completedDays[d.n]);
            const isCurrent = d.n === n && !allDone;
            return (
              <Link key={d.n} href={`/day/${d.n}`} className={`day-tile${isCurrent ? " current" : ""}`}>
                <span lang="ru" aria-hidden="true" className="art" style={{ background: t.bg, color: t.fg }}>
                  {d.glyph}
                </span>
                <span className="body">
                  <span className="mono" style={{ fontSize: 12, fontWeight: 500, color: isCurrent ? "var(--red-text)" : isDone ? "var(--blue)" : "var(--muted)" }}>
                    DAY {d.n}
                    {isCurrent ? " · UP NEXT" : isDone ? " · DONE ✓" : ""}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{d.title}</span>
                </span>
              </Link>
            );
          })}
          {COMING_UP.map((d) => (
            <div key={d.n} className="day-tile soon" aria-label={`Day ${d.n}, ${d.title}, coming soon`}>
              <span lang="ru" aria-hidden="true" className="art" style={{ background: "#F1F3F8", color: "rgba(11,19,48,0.15)" }}>
                {d.glyph}
              </span>
              <span className="body">
                <span className="mono muted" style={{ fontSize: 12 }}>
                  DAY {d.n} · SOON
                </span>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{d.title}</span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
