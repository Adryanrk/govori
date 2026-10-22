import { getItems, type Item } from "@/content/days";

export type Question = {
  id: string;
  /** The Russian shown big (a letter or a word). */
  prompt: string;
  /** Small line under the prompt, e.g. "What sound?" */
  ask: string;
  options: string[];
  answer: string;
  /** Text to read aloud after answering. */
  say: string;
  /** Short explanation shown after answering. */
  note: string;
};

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function answerOf(item: Item): string {
  if (item.kind === "letter") return item.short;
  return item.en;
}

function questionFor(item: Item, pool: Item[]): Question {
  const answer = answerOf(item);
  const sameKind = pool.filter((p) => p.kind === item.kind && p.id !== item.id);
  const distractors = shuffle([...new Set(sameKind.map(answerOf))].filter((a) => a !== answer)).slice(0, 3);
  const options = shuffle([answer, ...distractors]);

  if (item.kind === "letter") {
    return {
      id: item.id,
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
    prompt: item.ru,
    ask: "What does it mean?",
    options,
    answer,
    say: item.ru,
    note: `${item.ru} · ${item.tr} · ${item.en}`,
  };
}

/** Build `count` questions from the given item ids. Distractors come from `poolIds` too. */
export function buildQuiz(itemIds: string[], count: number, poolIds: string[] = itemIds): Question[] {
  const items = getItems(itemIds);
  const pool = getItems([...new Set([...itemIds, ...poolIds])]);
  const picked: Item[] = [];
  while (picked.length < count && items.length > 0) {
    picked.push(...shuffle(items));
  }
  return picked.slice(0, count).map((it) => questionFor(it, pool));
}
