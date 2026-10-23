import { getItems, type CustomQuestion, type Item } from "@/content/days";

export type Question = {
  id: string;
  /** The item this question practises (for spaced repetition), if any. */
  itemId?: string;
  /** The text shown big (a letter, a word, or a short situation). */
  prompt: string;
  /** Small line under the prompt, e.g. "What sound does it make?" */
  ask: string;
  options: string[];
  answer: string;
  /** Text read aloud (after answering, or as the question in listening mode). */
  say: string;
  /** Short explanation shown after answering. */
  note: string;
  /** Listening: the prompt is hidden and played instead. */
  audioOnly?: boolean;
};

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick `count` items, repeating the list when it is shorter than count. */
function pick<T>(items: T[], count: number): T[] {
  const out: T[] = [];
  while (out.length < count && items.length > 0) out.push(...shuffle(items));
  return out.slice(0, count);
}

function answerOf(item: Item): string {
  return item.kind === "letter" ? item.short : item.en;
}

function withDistractors(answer: string, candidates: string[]): string[] {
  const distractors = shuffle([...new Set(candidates)].filter((a) => a !== answer)).slice(0, 3);
  return shuffle([answer, ...distractors]);
}

function meaningQuestion(item: Item, pool: Item[]): Question {
  const answer = answerOf(item);
  const options = withDistractors(
    answer,
    pool.filter((p) => p.kind === item.kind && p.id !== item.id).map(answerOf)
  );
  if (item.kind === "letter") {
    return {
      id: item.id,
      itemId: item.id,
      prompt: `${item.upper}${item.lower}`,
      ask: "What sound does it make?",
      options,
      answer,
      say: item.example.ru,
      note: `${item.hint.replace(/\.$/, "")}. As in ${item.example.ru} (${item.example.en}).`,
    };
  }
  return {
    id: item.id,
    itemId: item.id,
    prompt: item.ru,
    ask: "What does it mean?",
    options,
    answer,
    say: item.ru,
    note: `${item.ru} · ${item.tr} · ${item.en}`,
  };
}

function listenQuestion(item: Item, pool: Item[]): Question {
  const text = (i: Item) => (i.kind === "letter" ? i.example.ru : i.ru);
  const answer = text(item);
  const options = withDistractors(
    answer,
    pool.filter((p) => p.id !== item.id).map(text)
  );
  return {
    id: `listen-${item.id}`,
    itemId: item.id,
    prompt: answer,
    ask: "Which one did you hear?",
    options,
    answer,
    say: answer,
    note: item.kind === "word" ? `${item.ru} · ${item.tr} · ${item.en}` : `${item.example.ru} · ${item.example.en}`,
    audioOnly: true,
  };
}

/** Meaning quiz: letter → sound, word → meaning. */
export function buildQuiz(itemIds: string[], count: number, poolIds: string[] = itemIds): Question[] {
  const items = getItems(itemIds);
  const pool = getItems([...new Set([...itemIds, ...poolIds])]);
  return pick(items, count).map((it) => meaningQuestion(it, pool));
}

/** Listening quiz: hear it, pick the written form. */
export function buildListen(itemIds: string[], count: number): Question[] {
  const items = getItems(itemIds);
  return pick(items, count).map((it) => listenQuestion(it, items));
}

/** Hand-written questions, shuffled, options shuffled too. */
export function buildCustom(questions: CustomQuestion[], count?: number): Question[] {
  const chosen = count ? pick(questions, count) : shuffle(questions);
  return chosen.map((q, i) => ({
    id: `custom-${i}-${q.prompt}`,
    prompt: q.prompt,
    ask: q.ask,
    options: shuffle(q.options),
    answer: q.answer,
    say: q.say ?? q.answer,
    note: q.note,
  }));
}

/* ───────────── Typing ───────────── */

export type TypeQuestion = { id: string; itemId: string; en: string; ru: string; tr: string };

export function buildTyping(itemIds: string[], count: number): TypeQuestion[] {
  const items = getItems(itemIds).filter((i) => i.kind === "word");
  return pick(items, count).map((w) =>
    w.kind === "word" ? { id: `type-${w.id}`, itemId: w.id, en: w.en, ru: w.ru, tr: w.tr } : (null as never)
  );
}

/** Compare typed Russian kindly: no stress marks, ё = е, case and punctuation ignored. */
export function normalizeRu(s: string): string {
  return s
    .normalize("NFD")
    .replace(/́/g, "")
    .normalize("NFC")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[.,!?—–\-«»"“”']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
