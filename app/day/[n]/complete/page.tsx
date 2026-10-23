"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { WeekOrbit } from "@/components/WeekOrbit";
import { Icon, Logo, Ru } from "@/components/ui";
import { DAYS, LETTERS, getDay } from "@/content/days";
import { useAccount } from "@/lib/account";
import { PASS_MARK, learned, restDaysLeft, streak, useProgress, week } from "@/lib/progress";

export default function CompletePage() {
  const params = useParams<{ n: string }>();
  const n = Number(params.n);
  const day = getDay(n);
  const { progress, update } = useProgress();
  const account = useAccount();

  if (!day || !progress) return <div className="lesson" />;

  const s = streak(progress);
  const dots = week(progress);
  const left = restDaysLeft(progress);
  const activeThisWeek = dots.filter((d) => d.active).length;
  const { letters, words } = learned(progress);
  const next = getDay(n + 1);
  const lastDay = DAYS[DAYS.length - 1].n;
  const result = day.check ? progress.weekChecks[day.week] : undefined;
  const failedParts = result ? result.parts.filter((p) => !p.total || p.correct / p.total < PASS_MARK) : [];
  const passed = !day.check || (result !== undefined && failedParts.length === 0);
  const rerun = Array.from(new Set<number>(failedParts.flatMap((p) => day.steps.find((s) => s.part === p.name)?.reviewDays ?? []))).sort((a, b) => a - b);

  return (
    <div className="lesson">
      <header style={{ maxWidth: 1120, width: "100%", margin: "0 auto", padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <Logo />
        <Link href="/today" className="icon-btn" aria-label="Close">
          <Icon name="close" />
        </Link>
      </header>

      <main className="complete">
        {/* ORBIT / STREAK */}
        <section className="hero-card night">
          <div className="rise" style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
            <span className="mono" style={{ fontSize: 13, letterSpacing: "0.14em", color: "var(--night-muted)" }}>
              {day.check ? (passed ? `WEEK ${day.week} PASSED` : `WEEK ${day.week} CHECK`) : `DAY ${n} COMPLETE`}
            </span>
            <h1 className="display" style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.05 }}>
              <Ru text={passed ? "Молоде́ц!" : "Почти́!"} />
            </h1>
            <span style={{ fontSize: 16, color: "var(--night-text)" }}>
              {passed ? "ma-la-DYETS · “well done!”" : "pach-TEE · “almost!” Your streak still counts today."}
            </span>
          </div>

          <WeekOrbit dots={dots} streak={s} />

          <div className="pills rise-2">
            <span className="pill-night">
              <Icon name="orbit" size={16} />
              {activeThisWeek >= 7 ? "Orbit closed this week!" : `${7 - activeThisWeek} more days to close this week’s orbit`}
            </span>
            <span className="pill-night">
              <Icon name="moon" size={16} />
              {left} rest {left === 1 ? "day" : "days"} left this week
            </span>
          </div>
        </section>

        {/* RIGHT COLUMN */}
        <div style={{ flex: "1 1 340px", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
          {result && (
            <section className="card rise-2" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Your result · 66 % per part to pass</h2>
              {result.parts.map((pt) => {
                const ok = pt.total > 0 && pt.correct / pt.total >= PASS_MARK;
                const pct = pt.total ? Math.round((pt.correct / pt.total) * 100) : 0;
                return (
                  <div key={pt.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 15 }}>
                      <span style={{ fontWeight: 600 }}>{pt.name}</span>
                      <span className="mono" style={{ color: ok ? "var(--blue)" : "var(--red-text)", fontWeight: 500 }}>
                        {pt.correct}/{pt.total} · {pct} % {ok ? "✓" : "✗"}
                      </span>
                    </div>
                    <div className="bar" aria-hidden="true">
                      <div style={{ width: `${pct}%`, background: ok ? "var(--blue)" : "var(--red)" }} />
                    </div>
                  </div>
                );
              })}
              {rerun.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, paddingTop: 6 }}>
                  <span className="muted" style={{ fontSize: 14 }}>
                    Worth running again:
                  </span>
                  {rerun.map((d) => (
                    <Link key={d} href={`/day/${d}`} className="btn btn-ghost" style={{ minHeight: 40, padding: "0 16px", fontSize: 14 }}>
                      Day {d}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          )}

          {passed && (
          <section className="card rise-2" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>What you can do now</h2>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: "1 1 0", background: "var(--paper)", borderRadius: 16, padding: 16 }} className="stat">
                <b>
                  {letters}
                  <span style={{ fontSize: 15 }} className="muted">
                    /{LETTERS.length}
                  </span>
                </b>
                <span>letters you can read</span>
              </div>
              <div style={{ flex: "1 1 0", background: "var(--paper)", borderRadius: 16, padding: 16 }} className="stat">
                <b>{words}</b>
                <span>words you know</span>
              </div>
            </div>
            <div className="milestone">
              <span className="icon" aria-hidden="true">
                <Icon name="check" />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span className="mono red" style={{ fontSize: 12, letterSpacing: "0.08em", fontWeight: 500 }}>
                  NEW MILESTONE
                </span>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{day.milestone.title}</span>
                <span style={{ fontSize: 14 }} className="muted">
                  <Ru text={day.milestone.detail} />
                </span>
              </span>
            </div>
          </section>
          )}

          {account.enabled && account.ready && !account.session && !progress.accountPromptDismissed && (
            <section className="card rise-3" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Keep your streak safe</h2>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }} className="muted">
                  Right now your progress lives only in this browser. A free account keeps it on every device.
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <Link href="/account" className="btn btn-dark" style={{ flex: "1 1 160px" }}>
                  Create free account
                </Link>
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ flex: "1 1 120px" }}
                  onClick={() => update((p) => ({ ...p, accountPromptDismissed: true }))}
                >
                  Later
                </button>
              </div>
            </section>
          )}

          {next ? (
            <Link href={`/day/${next.n}`} className="next-card rise-3">
              <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span className="mono" style={{ fontSize: 12, letterSpacing: "0.08em", color: "#FFE1E2" }}>
                  UP NEXT · DAY {next.n}
                </span>
                <span style={{ fontWeight: 600, fontSize: 17 }}>{next.title}</span>
              </span>
              <Icon name="arrow" size={22} />
            </Link>
          ) : (
            <Link href="/review" className="next-card rise-3">
              <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span className="mono" style={{ fontSize: 12, letterSpacing: "0.08em", color: "#FFE1E2" }}>
                  {n === lastDay ? "ALPHABET COMPLETE" : "UP NEXT"}
                </span>
                <span style={{ fontWeight: 600, fontSize: 17 }}>Review all 33 letters</span>
              </span>
              <Icon name="arrow" size={22} />
            </Link>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <Link href={`/day/${n}`} className="btn btn-ghost" style={{ minHeight: 44, fontSize: 14 }}>
              Run Day {n} again
            </Link>
            <Link href="/today" className="btn btn-ghost" style={{ minHeight: 44, fontSize: 14 }}>
              Back to today
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
