"use client";

// Accounts and syncing with Supabase.
// Without the two environment variables the site works exactly as before,
// with progress kept in this browser only.

import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import type { Progress } from "./progress";

// Trimmed, and stripped of quotes, in case they were pasted along with the value.
const clean = (v: string | undefined) => v?.trim().replace(/^["']|["']$/g, "").trim() || undefined;
const URL = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
const KEY = clean(process.env.NEXT_PUBLIC_SUPABASE_KEY);

let client: SupabaseClient | null = null;
let configError: string | null = null;

export function accountsEnabled(): boolean {
  return Boolean(URL && KEY);
}

/** The Supabase client, or null when accounts are off or set up wrong (never throws). */
export function supabase(): SupabaseClient | null {
  if (!accountsEnabled() || typeof window === "undefined") return null;
  if (!client && !configError) {
    try {
      client = createClient(URL!, KEY!);
    } catch (err) {
      configError = err instanceof Error ? err.message : String(err);
      console.error("Govori: Supabase could not start:", configError);
    }
  }
  return client;
}

/** Why accounts could not start, if they couldn't (shown on the account page). */
export function accountsError(): string | null {
  supabase();
  return configError;
}

export async function getSession(): Promise<Session | null> {
  const sb = supabase();
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data.session;
}

/* ───────────── Merging this browser with the account ───────────── */

/** Combine two progress records so nothing learned on either device is lost. */
export function mergeProgress(a: Progress, b: Progress): Progress {
  const completedDays: Progress["completedDays"] = { ...a.completedDays };
  for (const [k, v] of Object.entries(b.completedDays)) {
    const n = Number(k);
    completedDays[n] = completedDays[n] && completedDays[n] < v ? completedDays[n] : v;
  }

  const itemStats: Progress["itemStats"] = { ...a.itemStats };
  for (const [id, s] of Object.entries(b.itemStats)) {
    const mine = itemStats[id];
    if (!mine) itemStats[id] = s;
    else {
      const seenMine = mine.right + mine.wrong;
      const seenTheirs = s.right + s.wrong;
      if (seenTheirs > seenMine || (seenTheirs === seenMine && s.due > mine.due)) itemStats[id] = s;
    }
  }

  const weekChecks: Progress["weekChecks"] = { ...a.weekChecks };
  for (const [k, v] of Object.entries(b.weekChecks)) {
    const n = Number(k);
    if (!weekChecks[n] || v.date > weekChecks[n].date) weekChecks[n] = v;
  }

  const newer = b.updatedAt > a.updatedAt ? b : a;
  return {
    completedDays,
    activeDates: [...new Set([...a.activeDates, ...b.activeDates])].sort(),
    minutes: newer.minutes,
    accountPromptDismissed: a.accountPromptDismissed || b.accountPromptDismissed,
    itemStats,
    weekChecks,
    updatedAt: Math.max(a.updatedAt, b.updatedAt),
  };
}

/* ───────────── Push and pull ───────────── */

let pushTimer: ReturnType<typeof setTimeout> | null = null;

/** Save to the account a moment after the last change (no-op when signed out). */
export function queuePush(p: Progress) {
  if (!accountsEnabled()) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    void push(p);
  }, 1200);
}

export async function push(p: Progress): Promise<boolean> {
  const sb = supabase();
  const session = await getSession();
  if (!sb || !session) return false;
  const { error } = await sb
    .from("progress")
    .upsert({ user_id: session.user.id, data: p, updated_at: new Date().toISOString() });
  return !error;
}

/**
 * Fetch the account's progress, merge it with this browser's and save the
 * result to the account. Returns the merged progress, or null when signed out.
 */
export async function pullAndMerge(local: Progress): Promise<Progress | null> {
  const sb = supabase();
  const session = await getSession();
  if (!sb || !session) return null;
  const { data, error } = await sb.from("progress").select("data").eq("user_id", session.user.id).maybeSingle();
  if (error) return null;
  const remote = data?.data as Partial<Progress> | undefined;
  const merged = remote ? mergeProgress(local, { ...local, ...emptyLike(), ...remote }) : local;
  await push(merged);
  return merged;
}

/** Defaults for fields an older saved record may not have. */
function emptyLike(): Partial<Progress> {
  return { completedDays: {}, activeDates: [], itemStats: {}, weekChecks: {}, updatedAt: 0, accountPromptDismissed: false };
}
