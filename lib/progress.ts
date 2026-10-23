"use client";

// Progress lives in this browser (localStorage) and, when signed in, is synced
// to your account (see lib/sync.ts). Everything here is safe on the server too:
// it simply returns defaults.

import { useCallback, useEffect, useState } from "react";
import { DAYS, dayItems, getItem, type Tier } from "@/content/days";
import { pullAndMerge, queuePush } from "./sync";

export const REST_DAYS_PER_WEEK = 2;
const KEY = "govori:v1";

/** Spaced repetition: a "box" per item. Right answers move it up a box, wrong ones back to 0. */
export const BOX_DAYS = [0, 1, 2, 4, 7, 14, 30];

export type ItemStat = { box: number; due: string; right: number; wrong: number };
export type CheckResult = { date: string; parts: { name: string; correct: number; total: number }[] };

export type Progress = {
  /** Day number → ISO date it was finished. */
  completedDays: Record<number, string>;
  /** Local dates (YYYY-MM-DD) with at least one finished step. */
  activeDates: string[];
  minutes: Tier;
  accountPromptDismissed: boolean;
  /** Item id → spaced-repetition state. */
  itemStats: Record<string, ItemStat>;
  /** Week number → latest week-check result. */
  weekChecks: Record<number, CheckResult>;
  /** Last change, in ms. Used when merging this browser with your account. */
  updatedAt: number;
};

export const EMPTY: Progress = {
  completedDays: {},
  activeDates: [],
  minutes: 20,
  accountPromptDismissed: false,
  itemStats: {},
  weekChecks: {},
  updatedAt: 0,
};

export const PASS_MARK = 0.66;

export function dateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseKey(k: string): Date {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function addDays(d: Date, n: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

/** Monday of the week the date falls in, as a key. */
function weekKey(d: Date): string {
  const dow = (d.getDay() + 6) % 7; // Monday = 0
  return dateKey(addDays(d, -dow));
}

export function withDefaults(p: Partial<Progress> | null | undefined): Progress {
  return { ...EMPTY, ...(p ?? {}) };
}

export function load(): Progress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return withDefaults(JSON.parse(raw) as Partial<Progress>);
  } catch {
    return EMPTY;
  }
}

/** Save in this browser only. */
export function saveLocal(p: Progress) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage blocked: progress just won't persist */
  }
}

/* ───────────── Streak ───────────── */

/**
 * Streak = active days in a row. Missed days are bridged by rest days,
 * up to REST_DAYS_PER_WEEK per calendar week. Today not being active yet
 * never breaks the streak.
 */
export function streak(p: Progress, today: Date = new Date()): number {
  if (p.activeDates.length === 0) return 0;
  const active = new Set(p.activeDates);
  const earliest = [...active].sort()[0];
  const restUsed: Record<string, number> = {};
  let count = 0;
  let d = active.has(dateKey(today)) ? today : addDays(today, -1);

  for (let i = 0; i < 1000; i++) {
    const k = dateKey(d);
    if (k < earliest) break;
    if (active.has(k)) {
      count++;
    } else {
      const w = weekKey(d);
      if ((restUsed[w] ?? 0) < REST_DAYS_PER_WEEK) {
        restUsed[w] = (restUsed[w] ?? 0) + 1;
      } else {
        return count; // out of rest days: the streak ends here
      }
    }
    d = addDays(d, -1);
  }
  return count;
}

/** Rest days still unused this week (missed days before today count as used). */
export function restDaysLeft(p: Progress, today: Date = new Date()): number {
  const active = new Set(p.activeDates);
  if (active.size === 0) return REST_DAYS_PER_WEEK;
  const earliest = [...active].sort()[0];
  const monday = parseKey(weekKey(today));
  let missed = 0;
  for (let d = monday; dateKey(d) < dateKey(today); d = addDays(d, 1)) {
    const k = dateKey(d);
    if (k >= earliest && !active.has(k)) missed++;
  }
  return Math.max(0, REST_DAYS_PER_WEEK - missed);
}

export type WeekDot = { label: string; active: boolean; isToday: boolean };

export function week(p: Progress, today: Date = new Date()): WeekDot[] {
  const active = new Set(p.activeDates);
  const monday = parseKey(weekKey(today));
  const labels = ["M", "T", "W", "T", "F", "S", "S"];
  return labels.map((label, i) => {
    const d = addDays(monday, i);
    return { label, active: active.has(dateKey(d)), isToday: dateKey(d) === dateKey(today) };
  });
}

/* ───────────── What you know ───────────── */

export function learned(p: Progress): { letters: number; words: number } {
  let letters = 0;
  let words = 0;
  DAYS.forEach((day) => {
    if (p.completedDays[day.n]) {
      const it = dayItems(day);
      letters += it.letters.length;
      words += it.words.length;
    }
  });
  return { letters, words };
}

/** First day not finished yet (or the last day if all are done). */
export function currentDay(p: Progress): number {
  const next = DAYS.find((d) => !p.completedDays[d.n]);
  return next ? next.n : DAYS[DAYS.length - 1].n;
}

/** Items you have met: everything taught on finished days, plus anything you have answered. */
export function knownItemIds(p: Progress): string[] {
  const ids = new Set<string>();
  DAYS.forEach((day) => {
    if (p.completedDays[day.n]) {
      const it = dayItems(day);
      it.letters.forEach((l) => ids.add(l.id));
      it.words.forEach((w) => ids.add(w.id));
    }
  });
  Object.keys(p.itemStats).forEach((id) => {
    if (getItem(id)) ids.add(id);
  });
  return [...ids];
}

/** Known items due for review today, most overdue first. Never-answered items count as due. */
export function dueItemIds(p: Progress, today: Date = new Date()): string[] {
  const t = dateKey(today);
  return knownItemIds(p)
    .filter((id) => !p.itemStats[id] || p.itemStats[id].due <= t)
    .sort((a, b) => (p.itemStats[a]?.due ?? "") .localeCompare(p.itemStats[b]?.due ?? ""));
}

/** Move an item between boxes after an answer. */
export function applyAnswer(stat: ItemStat | undefined, correct: boolean, today: Date = new Date()): ItemStat {
  const s = stat ?? { box: 0, due: dateKey(today), right: 0, wrong: 0 };
  const box = correct ? Math.min(s.box + 1, BOX_DAYS.length - 1) : 0;
  return {
    box,
    due: dateKey(addDays(today, correct ? BOX_DAYS.at(box) ?? 1 : 0)),
    right: s.right + (correct ? 1 : 0),
    wrong: s.wrong + (correct ? 0 : 1),
  };
}

/* ───────────── Hook ───────────── */

let pulledThisLoad = false;

/** React hook: progress loaded after mount (avoids hydration mismatches). */
export function useProgress() {
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    const local = load();
    setProgress(local);
    if (!pulledThisLoad) {
      pulledThisLoad = true;
      pullAndMerge(local).then((merged) => {
        if (merged) {
          saveLocal(merged);
          setProgress(merged);
        }
      });
    }
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    const next = { ...fn(load()), updatedAt: Date.now() };
    saveLocal(next);
    queuePush(next);
    setProgress(next);
  }, []);

  const markActive = useCallback(() => {
    update((p) => {
      const k = dateKey();
      return p.activeDates.includes(k) ? p : { ...p, activeDates: [...p.activeDates, k] };
    });
  }, [update]);

  const completeDay = useCallback(
    (n: number) => {
      update((p) => {
        const k = dateKey();
        return {
          ...p,
          completedDays: { ...p.completedDays, [n]: p.completedDays[n] ?? k },
          activeDates: p.activeDates.includes(k) ? p.activeDates : [...p.activeDates, k],
        };
      });
    },
    [update]
  );

  const recordAnswer = useCallback(
    (itemId: string, correct: boolean) => {
      if (!getItem(itemId)) return;
      update((p) => ({ ...p, itemStats: { ...p.itemStats, [itemId]: applyAnswer(p.itemStats[itemId], correct) } }));
    },
    [update]
  );

  const saveCheck = useCallback(
    (weekN: number, parts: CheckResult["parts"]) => {
      update((p) => ({ ...p, weekChecks: { ...p.weekChecks, [weekN]: { date: dateKey(), parts } } }));
    },
    [update]
  );

  return { progress, update, markActive, completeDay, recordAnswer, saveCheck };
}
