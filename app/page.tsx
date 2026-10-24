import Link from "next/link";
import { Icon, Logo, Ru } from "@/components/ui";
import { HeroWord } from "@/components/HeroWord";
import { NavLogin, StartButton } from "@/components/LandingAuth";

const FALSE_FRIENDS = [
  ["В", "B", "v"],
  ["Н", "H", "n"],
  ["Р", "P", "r"],
  ["С", "C", "s"],
  ["У", "Y", "u"],
  ["Х", "X", "kh"],
];

const LEVELS = [
  { code: "Аа", name: "Alphabet", tag: "Start here", state: "now" },
  { code: "A1", name: "Beginner", tag: "Next", state: "next" },
  { code: "A2", name: "Elementary", tag: "Coming", state: "" },
  { code: "B1", name: "Intermediate", tag: "Coming", state: "" },
  { code: "B2", name: "Upper inter.", tag: "Coming", state: "" },
  { code: "C1", name: "Advanced", tag: "Coming", state: "" },
  { code: "C2", name: "Mastery", tag: "Coming", state: "" },
];

export default function Landing() {
  return (
    <div className="landing" id="top">
      <header className="wrap nav">
        <Logo href="#top" />
        <nav aria-label="Main" className="nav-links">
          <a href="#method">Method</a>
          <a href="#alphabet">Alphabet</a>
          <a href="#path">Path</a>
          <NavLogin />
          <StartButton className="btn btn-red" style={{ minHeight: 44, padding: "0 20px", fontSize: 15 }} />
        </nav>
      </header>

      {/* HERO */}
      <section className="hero grid-bg">
        <div className="wrap hero-inner">
          <div className="hero-copy rise">
            <div className="eyebrow">Русский · alphabet to C2</div>
            <h1 className="display hero-title">
              Learn Russian,
              <br />
              <span className="blue">one day</span> at a time.
            </h1>
            <p className="lead" style={{ maxWidth: 520, fontSize: 19 }}>
              Short daily sessions shaped around the time you actually have. Ten minutes or forty-five, every day mixes
              something new with the review that makes it stick.
            </p>
            <div className="row">
              <StartButton className="btn btn-red btn-lg" arrow />
              <a href="#method" className="btn btn-ghost btn-lg">
                How it works
              </a>
            </div>
            <div className="ticks">
              <span>
                <span className="dot" aria-hidden="true" />
                No locked days
              </span>
              <span>
                <span className="dot" aria-hidden="true" />
                Stress marks on every word
              </span>
              <span>
                <span className="dot" aria-hidden="true" />
                No account needed to try
              </span>
            </div>
          </div>

          <div className="orbit-wrap rise-2">
            <div className="orbit">
              <div className="ring ring-1" aria-hidden="true" />
              <div className="ring spin" aria-hidden="true">
                <span className="planet planet-red" />
              </div>
              <div className="ring ring-2" aria-hidden="true" />
              <div className="ring spin-rev" aria-hidden="true">
                <span className="planet planet-blue" />
              </div>
              <div className="ring ring-3" aria-hidden="true" />
              <HeroWord />
              <span className="float-chip" lang="ru" style={{ left: "2%", top: "14%" }}>
                В <span className="muted">→ v</span>
              </span>
              <span className="float-chip" lang="ru" style={{ right: 0, top: "24%" }}>
                Р <span className="muted">→ r</span>
              </span>
              <span className="float-chip" lang="ru" style={{ left: "6%", bottom: "14%" }}>
                Н <span className="muted">→ n</span>
              </span>
              <span className="float-chip stress" lang="ru" style={{ right: "8%", bottom: "8%" }}>
                ударе́ние · stress
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section id="method" className="wrap section">
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
          <div className="section-head" style={{ maxWidth: 640 }}>
            <div className="eyebrow blue">01 · The method</div>
            <h2 className="display section-title">A day plan that fits your day.</h2>
          </div>
          <p className="lead" style={{ maxWidth: 400, fontSize: 17 }}>
            Everyone learns at a different speed. Govori adapts the session to you, not the other way around.
          </p>
        </div>
        <div className="cols">
          <div className="card feature">
            <div style={{ display: "flex", gap: 8 }}>
              <span className="chip">10 min</span>
              <span className="chip" style={{ background: "var(--ink)", color: "#fff", borderColor: "var(--ink)" }}>
                20 min
              </span>
              <span className="chip">45 min</span>
            </div>
            <h3>Pick your time</h3>
            <p>Tell Govori how long you have today. The plan reshapes itself to fit.</p>
          </div>
          <div className="card feature">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="mono muted">
              <span
                aria-hidden="true"
                style={{ width: 34, height: 34, borderRadius: 10, background: "var(--blue-soft)", color: "var(--blue)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              >
                <Icon name="review" />
              </span>
              <span style={{ fontSize: 13 }}>new + review</span>
            </div>
            <h3>Learn, then review</h3>
            <p>New letters, words and grammar, plus review that brings back what you are about to forget.</p>
          </div>
          <div className="card feature">
            <div style={{ display: "flex", alignItems: "center", gap: 6 }} className="mono">
              <span className="chip" style={{ background: "var(--ink)", color: "#fff", borderColor: "var(--ink)", borderRadius: 8 }}>
                Day 1
              </span>
              <span aria-hidden="true" className="muted">→</span>
              <span className="chip" style={{ borderRadius: 8 }}>Day 2</span>
              <span aria-hidden="true" className="muted">→</span>
              <span className="chip" style={{ borderRadius: 8 }}>Day 3</span>
            </div>
            <h3>Go at your pace</h3>
            <p>Finished early? Jump to the next day. Feeling shaky? Run it again. Nothing is ever locked.</p>
          </div>
        </div>
      </section>

      {/* ALPHABET */}
      <section id="alphabet" className="band">
        <div className="wrap section">
          <div className="section-head">
            <div className="eyebrow blue">02 · Day 1 preview</div>
            <h2 className="display section-title">
              Half the alphabet looks familiar. <span className="red">Some of it lies.</span>
            </h2>
            <p className="lead" style={{ fontSize: 17 }}>
              These six letters look like Latin ones but make completely different sounds. Day 1 starts right here.
            </p>
          </div>
          <div className="cols" style={{ gap: 16 }}>
            {FALSE_FRIENDS.map(([ru, latin, sound]) => (
              <div key={ru} className="card letter-tile">
                <div className="glyph" lang="ru">
                  {ru}
                </div>
                <div className="meta">
                  <span className="muted">not {latin}</span>
                  <span className="red">says “{sound}”</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PATH */}
      <section id="path" className="wrap section">
        <div className="section-head">
          <div className="eyebrow blue">03 · The path</div>
          <h2 className="display section-title">From your first letter to full fluency.</h2>
          <p className="lead" style={{ fontSize: 17 }}>
            Built on the CEFR levels and the official Russian TORFL word lists, with a real test at the end of every level.
          </p>
        </div>
        <div className="path">
          <ol>
            {LEVELS.map((l) => (
              <li key={l.code}>
                <span className={`level ${l.state}`} lang={l.state === "now" ? "ru" : undefined}>
                  {l.code}
                </span>
                <span className="name">{l.name}</span>
                <span className={`tag ${l.state === "now" ? "red" : l.state === "next" ? "blue" : "muted"}`}>
                  {l.tag.toUpperCase()}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap" style={{ paddingBottom: 120 }}>
        <div className="cta night">
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 620 }}>
            <h2 className="display" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.12 }}>
              Your first word is already on this page.
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "var(--night-text)" }}>
              <Ru text="Говори́" /> means “speak!”. Day 1 teaches you to read it. No account needed to try.
            </p>
          </div>
          <StartButton className="btn btn-red btn-lg" arrow />
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <span>Govori — learn Russian at your own pace.</span>
          <span className="mono">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
