"use client";

// Progress is stored in this browser (localStorage) until accounts exist.
// Everything here is safe to call on the server: it simply returns defaults.

import { useCallback, useEffect, useState } from "react";
import { DAYS, dayItems, type Tier } from "@/content/days";

export const REST_DAYS_PER_WEEK = 2;
const KEY = "govori:v1";

export type Progress = {
  /** Day number → ISO date it was finished. */
  completedDays: Record<number, string>;
  /** Local dates (YYYY-MM-DD) with at least one finished step. */
  activeDates: string[];
  minutes: Tier;
  accountPromptDismissed: boolean;
};

const EMPTY: Progress = {
  completedDays: {},
  activeDates: [],
  minutes: 20,
  accountPromptDismissed: false,
};

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

export function load(): Progress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<Progress>) };
  } catch {
    return EMPTY;
  }
}

function save(p: Progress) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage blocked: progress just won't persist */
  }
}

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
        // Out of rest days: the streak ends here.
        return count;
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

/** React hook: progress loaded after mount (avoids hydration mismatches). */
export function useProgress() {
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    setProgress(load());
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    const next = fn(load());
    save(next);
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

  return { progress, update, markActive, completeDay };
}
