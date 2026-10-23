// Small helpers for writing content compactly.
import type { Letter, Word } from "./types";

/** "mom" → "Mom" (meanings are always shown capitalised). */
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Short sound labels for quiz answers: an English word with the same sound. */
const SHORT: Record<string, string> = {
  а: "a as in father", к: "k as in kit", м: "m as in man", о: "o as in more", т: "t as in top", е: "ye as in yes",
  в: "v as in very", н: "n as in no", р: "rolled r", с: "s as in sun", у: "oo as in moon", х: "kh as in loch",
  б: "b as in book", г: "g as in go", д: "d as in door", з: "z as in zoo", и: "ee as in see", й: "y as in boy",
  л: "l as in ball", п: "p as in park", ф: "f as in fun", э: "e as in met",
  ж: "zh as in pleasure", ц: "ts as in cats", ч: "ch as in chair", ш: "sh as in shop", щ: "long, soft sh",
  ы: "hard i (no English twin)", ю: "yu as in youth", я: "ya as in yard", ё: "yo as in yogurt",
  ъ: "silent: hard sign", ь: "silent: soft sign",
};

export const L = (
  upper: string,
  lower: string,
  sound: string,
  hint: string,
  example: [string, string, string],
  extra: Partial<Letter> = {}
): Letter => ({
  kind: "letter",
  id: `l-${lower}`,
  upper,
  lower,
  sound,
  short: SHORT[lower] ?? sound,
  hint,
  example: { ru: example[0], tr: example[1], en: cap(example[2]) },
  ...extra,
});

export const W = (ru: string, tr: string, en: string): Word => ({
  kind: "word",
  id: `w-${ru.replace(/́/g, "").toLowerCase()}`,
  ru,
  tr,
  en: cap(en),
});


/** ids("w", "мама кот") → ["w-мама", "w-кот"] */
export const ids = (prefix: "l" | "w", list: string) =>
  list.split(" ").map((s) => `${prefix}-${s.toLowerCase()}`);
