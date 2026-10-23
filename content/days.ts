// The course: every week's content gathered in one place.
// To add a week: write content/week-NN.ts and add its words, days and week below.
//
// Stress is written with a combining acute accent (U+0301) after the stressed
// vowel, e.g. "вода́". One-syllable words carry no mark.

import { LETTERS } from "./letters";
import type { Day, Item, Letter, Step, Tier, Week, Word } from "./types";
import { WEEK1, WEEK1_DAYS, WEEK1_WORDS } from "./week-01";

export * from "./types";
export { LETTERS };

export const WORDS: Word[] = [...WEEK1_WORDS];
export const DAYS: Day[] = [...WEEK1_DAYS];

/** Weeks that exist, followed by the planned ones (from the A1 plan) shown as "coming". */
export const WEEKS: Week[] = [
  WEEK1,
  { n: 2, title: "Hello, this is me", subtitle: "Introduce yourself, names, он and она.", days: [] },
  { n: 3, title: "Family", subtitle: "Family and friends, мой and моя́, plurals.", days: [] },
  { n: 4, title: "Numbers and money", subtitle: "0 to 100, prices, the kiosk.", days: [] },
];

const ITEMS = new Map<string, Item>([...LETTERS, ...WORDS].map((i) => [i.id, i]));

export function getItem(id: string): Item | undefined {
  return ITEMS.get(id);
}

export function getItems(ids: string[]): Item[] {
  return ids.map((id) => ITEMS.get(id)).filter((i): i is Item => Boolean(i));
}

export const ALPHABET_ORDER = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

export function getDay(n: number): Day | undefined {
  return DAYS.find((d) => d.n === n);
}

export function getWeek(n: number): Week | undefined {
  return WEEKS.find((w) => w.n === n);
}

/** Steps in the chosen time plan. A week check always runs every part. */
export function stepsFor(day: Day, minutes: Tier): Step[] {
  if (day.check) return day.steps;
  return day.steps.filter((s) => s.tier <= minutes);
}

/** Letters and words a day teaches (for progress counts). */
export function dayItems(day: Day): { letters: Letter[]; words: Word[] } {
  const all = new Set<string>();
  day.steps.forEach((s) => {
    if (s.type === "cards") s.items.forEach((i) => all.add(i));
  });
  const items = getItems([...all]);
  return {
    letters: items.filter((i): i is Letter => i.kind === "letter"),
    words: items.filter((i): i is Word => i.kind === "word"),
  };
}
