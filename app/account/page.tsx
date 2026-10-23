"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/ui";
import { useAccount } from "@/lib/account";
import { load, saveLocal, streak } from "@/lib/progress";
import { pullAndMerge, supabase } from "@/lib/sync";

export default function AccountPage() {
  const { enabled, session, ready, error } = useAccount();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "good" | "bad"; text: string } | null>(null);

  // Arriving from the confirmation email (or any sign-in): bring this browser's progress along.
  const userId = session?.user.id;
  useEffect(() => {
    if (!userId) return;
    pullAndMerge(load()).then((merged) => merged && saveLocal(merged));
  }, [userId]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const sb = supabase();
    if (!sb) return;
    setBusy(true);
    setMessage(null);
    try {
      if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/account` },
        });
        if (error) throw error;
        if (!data.session) {
          setMessage({ kind: "good", text: "Almost done: check your email and click the link to confirm your account." });
          return;
        }
      } else {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      // Bring this browser's progress into the account.
      const merged = await pullAndMerge(load());
      if (merged) saveLocal(merged);
      setMessage({ kind: "good", text: "You are signed in. Your progress now syncs between your devices." });
    } catch (err) {
      setMessage({ kind: "bad", text: err instanceof Error ? err.message : "Something went wrong. Try again." });
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await supabase()?.auth.signOut();
    setMessage({ kind: "good", text: "Signed out. Your progress stays saved in your account." });
  }

  return (
    <AppShell>
      <header style={{ display: "flex", flexDirection: "column", gap: 10 }} className="rise">
        <span className="eyebrow">Account</span>
        <h1 className="display page-title">{session ? "You’re signed in." : "Keep your progress everywhere."}</h1>
        <p style={{ margin: 0, fontSize: 17, maxWidth: 620 }} className="muted">
          {session
            ? "Your days, streak and reviews sync between every device where you sign in."
            : "A free account saves your days, streak and reviews, so your phone and your computer always agree."}
        </p>
      </header>

      {ready && error && (
        <section className="card" style={{ padding: 28, maxWidth: 620, display: "flex", flexDirection: "column", gap: 10, borderColor: "var(--red-line)" }}>
          <h2 style={{ margin: 0, fontSize: 17 }}>Accounts are switched on, but set up wrong</h2>
          <p style={{ margin: 0 }} className="muted">
            Supabase says: <b className="red">{error}</b>
          </p>
          <p style={{ margin: 0, fontSize: 14 }} className="muted">
            Check NEXT_PUBLIC_SUPABASE_URL in Vercel. It should look exactly like https://abcdefgh.supabase.co, with no quotes or spaces.
            Then redeploy.
          </p>
        </section>
      )}

      {ready && !enabled && !error && (
        <section className="card" style={{ padding: 28, maxWidth: 560 }}>
          <p style={{ margin: 0 }} className="muted">
            Accounts aren’t switched on for this site yet. Your progress is saved in this browser.
          </p>
        </section>
      )}

      {enabled && ready && session && (
        <section className="card rise-2" style={{ padding: 28, maxWidth: 560, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="small-mono muted">Signed in as</span>
            <span style={{ fontWeight: 600, fontSize: 17, wordBreak: "break-all" }}>{session.user.email}</span>
          </div>
          <div className="milestone" style={{ background: "var(--blue-soft)", borderColor: "var(--blue-soft)" }}>
            <span className="icon" aria-hidden="true" style={{ background: "var(--blue)" }}>
              <Icon name="check" />
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontWeight: 600, fontSize: 15 }}>Syncing is on</span>
              <span className="muted" style={{ fontSize: 14 }}>
                Current streak: {streak(load())} {streak(load()) === 1 ? "day" : "days"}
              </span>
            </span>
          </div>
          <button type="button" className="btn btn-ghost" style={{ alignSelf: "flex-start" }} onClick={signOut}>
            Sign out
          </button>
        </section>
      )}

      {enabled && ready && !session && (
        <form onSubmit={submit} className="card rise-2" style={{ padding: 28, maxWidth: 560, display: "flex", flexDirection: "column", gap: 18 }}>
          <div role="tablist" aria-label="Account" className="segmented" style={{ alignSelf: "flex-start" }}>
            <button type="button" role="tab" aria-selected={mode === "signup"} aria-pressed={mode === "signup"} onClick={() => setMode("signup")}>
              Create account
            </button>
            <button type="button" role="tab" aria-selected={mode === "signin"} aria-pressed={mode === "signin"} onClick={() => setMode("signin")}>
              Sign in
            </button>
          </div>
          <label className="field">
            <span>Email</span>
            <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              required
              minLength={8}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {mode === "signup" && <small className="muted">At least 8 characters.</small>}
          </label>
          <button type="submit" className="btn btn-red" disabled={busy} style={{ alignSelf: "flex-start" }}>
            {busy ? "One moment…" : mode === "signup" ? "Create free account" : "Sign in"} <Icon name="arrow" />
          </button>
          <p style={{ margin: 0, fontSize: 14 }} className="muted">
            What you have already done in this browser comes with you.
          </p>
        </form>
      )}

      {message && (
        <div className={`feedback ${message.kind}`} role="status" style={{ maxWidth: 560 }}>
          {message.text}
        </div>
      )}
    </AppShell>
  );
}
