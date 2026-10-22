// All lesson content lives here. Each day is plain data, so new days can be
// added without touching any page code.
//
// Stress is written with a combining acute accent (U+0301) after the stressed
// vowel, e.g. "вода́". One-syllable words carry no mark.

export type Letter = {
  kind: "letter";
  id: string;
  upper: string;
  lower: string;
  /** The sound in plain Latin letters, e.g. "v". For the two signs a label instead. */
  sound: string;
  /** Short sound label used in quizzes, e.g. "v as in very". */
  short: string;
  isSign?: boolean;
  hint: string;
  /** For "false friends": the Latin letter it looks like. */
  looksLike?: string;
  example: { ru: string; tr: string; en: string };
};

export type Word = {
  kind: "word";
  id: string;
  ru: string;
  tr: string;
  en: string;
};

export type Item = Letter | Word;

export type Tier = 10 | 20 | 45;

export type Step = {
  id: string;
  title: string;
  detail: string;
  minutes: number;
  /** Smallest time plan that includes this step. */
  tier: Tier;
  type: "cards" | "quiz" | "practice";
  intro: string;
  /** Ids of the items this step uses (cards, quiz pool or practice list). */
  items: string[];
  /** For quizzes: how many questions to ask. */
  count?: number;
};

export type Day = {
  n: number;
  title: string;
  subtitle: string;
  glyph: string;
  stage: string;
  steps: Step[];
  milestone: { title: string; detail: string };
};

export type DayPreview = { n: number; title: string; glyph: string };

/** "mom" → "Mom" (meanings are always shown capitalised). */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

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

const L = (
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

const W = (ru: string, tr: string, en: string): Word => ({
  kind: "word",
  id: `w-${ru.replace(/́/g, "").toLowerCase()}`,
  ru,
  tr,
  en: cap(en),
});

export const LETTERS: Letter[] = [
  // Day 1: familiar
  L("А", "а", "a", "a as in “father”", ["ма́ма", "MA-ma", "mom"]),
  L("К", "к", "k", "k as in “kit”", ["кот", "kot", "cat"]),
  L("М", "м", "m", "m as in “man”", ["мо́ре", "MO-rye", "sea"]),
  L("О", "о", "o", "o as in “more”, when stressed. Unstressed it sounds like “a”.", ["окно́", "ak-NO", "window"]),
  L("Т", "т", "t", "t as in “top”", ["там", "tam", "there"]),
  L("Е", "е", "ye", "ye as in “yes”", ["нет", "nyet", "no"]),
  // Day 1: false friends
  L("В", "в", "v", "v as in “very”", ["Москва́", "mask-VA", "Moscow"], { looksLike: "B" }),
  L("Н", "н", "n", "n as in “no”", ["нос", "nos", "nose"], { looksLike: "H" }),
  L("Р", "р", "r", "a rolled r, tip of the tongue taps", ["рот", "rot", "mouth"], { looksLike: "P" }),
  L("С", "с", "s", "s as in “sun”", ["сок", "sok", "juice"], { looksLike: "C" }),
  L("У", "у", "u", "oo as in “moon”", ["у́тро", "OO-tra", "morning"], { looksLike: "Y" }),
  L("Х", "х", "kh", "ch as in Scottish “loch”", ["са́хар", "SA-khar", "sugar"], { looksLike: "X" }),
  // Day 2
  L("Б", "б", "b", "b as in “book”", ["банк", "bank", "bank"]),
  L("Г", "г", "g", "g as in “go”", ["гора́", "ga-RA", "mountain"]),
  L("Д", "д", "d", "d as in “door”", ["дом", "dom", "house"]),
  L("З", "з", "z", "z as in “zoo”", ["зима́", "zee-MA", "winter"], { looksLike: "3" }),
  L("И", "и", "i", "ee as in “see”", ["кино́", "kee-NO", "cinema"], { looksLike: "N backwards" }),
  L("Й", "й", "y", "a short y, as in “boy”", ["мой", "moy", "my"]),
  L("Л", "л", "l", "l as in “ball”", ["лес", "lyes", "forest"]),
  L("П", "п", "p", "p as in “park”", ["парк", "park", "park"]),
  L("Ф", "ф", "f", "f as in “fun”", ["фо́то", "FO-ta", "photo"]),
  L("Э", "э", "e", "e as in “met”", ["э́то", "E-ta", "this is"]),
  // Day 3
  L("Ж", "ж", "zh", "s as in “pleasure”", ["жена́", "zhe-NA", "wife"]),
  L("Ц", "ц", "ts", "ts as in “cats”", ["центр", "tsentr", "centre"]),
  L("Ч", "ч", "ch", "ch as in “chair”", ["чай", "chai", "tea"]),
  L("Ш", "ш", "sh", "sh as in “shop”", ["шко́ла", "SHKO-la", "school"]),
  L("Щ", "щ", "shch", "a long, soft sh", ["борщ", "borshch", "borscht"]),
  L("Ы", "ы", "hard i", "No English twin. Say “i” as in “ill” with the tongue pulled back", ["ты", "ty", "you"]),
  L("Ю", "ю", "yu", "you as in “youth”", ["ю́мор", "YU-mar", "humour"]),
  L("Я", "я", "ya", "ya as in “yard”", ["я", "ya", "I"]),
  L("Ё", "ё", "yo", "yo as in “yogurt”, and always stressed", ["ёж", "yosh", "hedgehog"]),
  L("Ъ", "ъ", "hard sign", "No sound. Makes a tiny break before the next vowel.", ["подъе́зд", "pad-YEST", "entrance"], { isSign: true }),
  L("Ь", "ь", "soft sign", "No sound. Softens the consonant before it.", ["день", "dyen'", "day"], { isSign: true }),
];

export const WORDS: Word[] = [
  // Day 1
  W("ма́ма", "MA-ma", "mom"),
  W("кот", "kot", "cat"),
  W("Москва́", "mask-VA", "Moscow"),
  W("сок", "sok", "juice"),
  W("нет", "nyet", "no"),
  W("у́тро", "OO-tra", "morning"),
  W("метро́", "mye-TRO", "metro"),
  W("теа́тр", "tye-ATR", "theatre"),
  // Day 2
  W("да", "da", "yes"),
  W("дом", "dom", "house"),
  W("парк", "park", "park"),
  W("зима́", "zee-MA", "winter"),
  W("кино́", "kee-NO", "cinema"),
  W("э́то", "E-ta", "this is"),
  W("мой", "moy", "my"),
  W("лес", "lyes", "forest"),
  W("приве́т", "pree-VYET", "hi"),
  W("говори́", "ga-va-REE", "speak!"),
  // Day 3
  W("я", "ya", "I"),
  W("ты", "ty", "you"),
  W("чай", "chai", "tea"),
  W("шко́ла", "SHKO-la", "school"),
  W("борщ", "borshch", "borscht"),
  W("день", "dyen'", "day"),
  W("хорошо́", "kha-ra-SHO", "good"),
  W("спаси́бо", "spa-SEE-ba", "thank you"),
  W("пожа́луйста", "pa-ZHAL-sta", "please"),
];

const ITEMS = new Map<string, Item>([...LETTERS, ...WORDS].map((i) => [i.id, i]));

export function getItem(id: string): Item | undefined {
  return ITEMS.get(id);
}

export function getItems(ids: string[]): Item[] {
  return ids.map((id) => ITEMS.get(id)).filter((i): i is Item => Boolean(i));
}

const ids = (prefix: "l" | "w", list: string) =>
  list.split(" ").map((s) => `${prefix}-${s.toLowerCase()}`);

const d1Familiar = ids("l", "а к м о т е");
const d1False = ids("l", "в н р с у х");
const d1Words = ids("w", "мама кот москва сок нет утро метро театр");

const d2A = ids("l", "б г д з и");
const d2B = ids("l", "й л п ф э");
const d2Words = ids("w", "да дом парк зима кино это мой лес привет говори");

const d3Hiss = ids("l", "ж ц ч ш щ");
const d3Vowels = ids("l", "ы ю я ё");
const d3Signs = ids("l", "ъ ь");
const d3Words = ids("w", "я ты чай школа борщ день хорошо спасибо пожалуйста");

export const DAYS: Day[] = [
  {
    n: 1,
    title: "The alphabet, part 1",
    subtitle: "Letters you already half-know, and the six that try to fool you.",
    glyph: "А",
    stage: "Alphabet",
    milestone: {
      title: "You can read your first Russian words",
      detail: "Москва́ · у́тро · метро́ · теа́тр",
    },
    steps: [
      { id: "familiar", title: "Letters that look familiar", detail: "А К М О Т Е", minutes: 4, tier: 10, type: "cards", items: d1Familiar,
        intro: "Good news first. These six look like Latin letters and sound almost the same. Tap each card to hear it." },
      { id: "false", title: "False friends", detail: "В Н Р С У Х", minutes: 5, tier: 10, type: "cards", items: d1False,
        intro: "These look familiar. They aren’t. Tap each card to see what the letter really says." },
      { id: "check", title: "Quick check", detail: "See the letter, pick the sound", minutes: 3, tier: 10, type: "quiz", items: [...d1Familiar, ...d1False], count: 8,
        intro: "Pick the sound each letter makes." },
      { id: "words", title: "First words", detail: "Москва́ · метро́ · теа́тр", minutes: 5, tier: 20, type: "cards", items: d1Words,
        intro: "Every word here uses only today’s letters. The red mark shows which syllable to stress." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 20, type: "quiz", items: d1Words, count: 6,
        intro: "Read each word and pick what it means." },
      { id: "write", title: "Write by hand", detail: "Copy every letter three times", minutes: 12, tier: 45, type: "practice", items: [...d1Familiar, ...d1False],
        intro: "Grab a pen and paper. Write each letter three times, capital and small, saying its sound out loud." },
      { id: "mixed", title: "Mixed review", detail: "Letters and words, shuffled", minutes: 8, tier: 45, type: "quiz", items: [...d1Familiar, ...d1False, ...d1Words], count: 12,
        intro: "Everything from today, shuffled together." },
    ],
  },
  {
    n: 2,
    title: "The alphabet, part 2",
    subtitle: "Ten new shapes, and by the end you can read “привет”.",
    glyph: "Б",
    stage: "Alphabet",
    milestone: {
      title: "You can say hello and read this site’s name",
      detail: "приве́т · говори́",
    },
    steps: [
      { id: "new-a", title: "New shapes", detail: "Б Г Д З И", minutes: 4, tier: 10, type: "cards", items: d2A,
        intro: "Five letters with no Latin twin. Watch out for З (it looks like a 3) and И (a backwards N)." },
      { id: "new-b", title: "More new shapes", detail: "Й Л П Ф Э", minutes: 4, tier: 10, type: "cards", items: d2B,
        intro: "Five more. Й is a short “y”, and Э is the “e” in “met”." },
      { id: "check", title: "Quick check", detail: "See the letter, pick the sound", minutes: 3, tier: 10, type: "quiz", items: [...d2A, ...d2B], count: 8,
        intro: "Pick the sound each letter makes." },
      { id: "words", title: "New words", detail: "дом · парк · приве́т", minutes: 5, tier: 20, type: "cards", items: d2Words,
        intro: "With 22 letters you can already read a lot. Two of these words are special." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 20, type: "quiz", items: d2Words, count: 6,
        intro: "Read each word and pick what it means." },
      { id: "write", title: "Write by hand", detail: "Copy every letter three times", minutes: 12, tier: 45, type: "practice", items: [...d2A, ...d2B],
        intro: "Pen and paper again. Write each new letter three times, capital and small, saying its sound." },
      { id: "mixed", title: "Mixed review", detail: "Day 1 and Day 2, shuffled", minutes: 8, tier: 45, type: "quiz", items: [...d1False, ...d2A, ...d2B, ...d2Words], count: 12,
        intro: "Today’s letters mixed with yesterday’s false friends." },
    ],
  },
  {
    n: 3,
    title: "The alphabet, part 3",
    subtitle: "The last eleven letters. After today you can read anything.",
    glyph: "Ж",
    stage: "Alphabet",
    milestone: {
      title: "You can read every letter of the Russian alphabet",
      detail: "спаси́бо · пожа́луйста · хорошо́",
    },
    steps: [
      { id: "hiss", title: "The hissing sounds", detail: "Ж Ц Ч Ш Щ", minutes: 5, tier: 10, type: "cards", items: d3Hiss,
        intro: "Five letters for sounds English spells with two or more letters." },
      { id: "vowels", title: "The y-vowels", detail: "Ы Ю Я Ё", minutes: 4, tier: 10, type: "cards", items: d3Vowels,
        intro: "Ю, Я and Ё start with a little “y”. Ы has no English twin, so listen closely." },
      { id: "signs", title: "The two silent signs", detail: "Ъ Ь", minutes: 3, tier: 10, type: "cards", items: d3Signs,
        intro: "These make no sound of their own. They change how the letters around them sound." },
      { id: "check", title: "Quick check", detail: "See the letter, pick the sound", minutes: 3, tier: 20, type: "quiz", items: [...d3Hiss, ...d3Vowels, ...d3Signs], count: 8,
        intro: "Pick the sound each letter makes." },
      { id: "words", title: "Words you will use every day", detail: "спаси́бо · пожа́луйста", minutes: 5, tier: 20, type: "cards", items: d3Words,
        intro: "Real everyday words. Notice how пожа́луйста is said much shorter than it is written." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 20, type: "quiz", items: d3Words, count: 6,
        intro: "Read each word and pick what it means." },
      { id: "write", title: "Write by hand", detail: "Copy every letter three times", minutes: 12, tier: 45, type: "practice", items: [...d3Hiss, ...d3Vowels, ...d3Signs],
        intro: "Last handwriting round for the alphabet. Write each letter three times, saying its sound." },
      { id: "mixed", title: "The whole alphabet", detail: "All 33 letters, shuffled", minutes: 8, tier: 45, type: "quiz", items: LETTERS.map((l) => l.id), count: 15,
        intro: "Every letter of the alphabet. Take your time." },
    ],
  },
];

export const COMING_UP: DayPreview[] = [
  { n: 4, title: "Sounds and stress", glyph: "Ё" },
  { n: 5, title: "Your first phrases", glyph: "Я" },
];

export const ALPHABET_ORDER = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

export function getDay(n: number): Day | undefined {
  return DAYS.find((d) => d.n === n);
}

export function stepsFor(day: Day, minutes: Tier): Step[] {
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
