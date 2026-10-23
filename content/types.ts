// Shared types for all lesson content.

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

/** A hand-written multiple-choice question (stress, grammar…). */
export type CustomQuestion = {
  prompt: string;
  ask: string;
  options: string[];
  answer: string;
  note: string;
  say?: string;
};

export type GrammarCard = {
  /** Short paragraphs. Russian inside them may carry stress marks. */
  body: string[];
  table?: { head: string[]; rows: string[][] };
  examples?: { ru: string; tr: string; en: string }[];
  /** One-line takeaway shown highlighted at the end. */
  rule?: string;
};

export type StepType = "cards" | "quiz" | "practice" | "grammar" | "listen" | "type";

export type Step = {
  id: string;
  title: string;
  detail: string;
  minutes: number;
  /** Smallest time plan that includes this step. */
  tier: Tier;
  type: StepType;
  intro: string;
  /** Item ids the step uses (cards, quiz/listen/type pool, practice list). */
  items: string[];
  /** For quiz / listen / type: how many questions. */
  count?: number;
  /** Quiz with hand-written questions instead of generated ones. */
  questions?: CustomQuestion[];
  grammar?: GrammarCard;
  /** Week checks: the part this step scores (e.g. "Letters"). */
  part?: string;
  /** Week checks: days worth re-running if this part is failed. */
  reviewDays?: number[];
};

export type Day = {
  n: number;
  week: number;
  title: string;
  subtitle: string;
  glyph: string;
  stage: string;
  steps: Step[];
  milestone: { title: string; detail: string };
  /** A week check: every step always runs, and parts are scored. */
  check?: boolean;
};

export type Week = {
  n: number;
  title: string;
  subtitle: string;
  /** Days that exist; empty for a week that is planned but not written yet. */
  days: number[];
};
