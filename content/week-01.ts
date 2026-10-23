// Week 1: the alphabet, stress and first phrases (days 1–6).
import { W, ids } from "./build";
import { LETTERS } from "./letters";
import type { CustomQuestion, Day, Week, Word } from "./types";

export const WEEK1_WORDS: Word[] = [
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
  // Day 4
  W("молоко́", "ma-la-KO", "milk"),
  W("го́род", "GO-rat", "city"),
  W("хлеб", "khlyep", "bread"),
  W("друг", "druk", "friend"),
  W("сего́дня", "si-VOD-nya", "today"),
  W("ры́ба", "RY-ba", "fish"),
  W("язы́к", "ya-ZYK", "language"),
  W("ру́сский", "RU-skiy", "Russian"),
  // Day 5
  W("здра́вствуйте", "ZDRA-stvuy-tye", "hello (polite)"),
  W("как дела́?", "kak di-LA", "how are you?"),
  W("отли́чно", "at-LEECH-na", "great"),
  W("норма́льно", "nar-MAL-na", "fine, OK"),
  W("извини́те", "iz-vi-NEE-tye", "excuse me"),
  W("до свида́ния", "da svi-DA-ni-ya", "goodbye"),
  W("пока́", "pa-KA", "bye"),
  W("до́брое у́тро", "DOB-ra-ye OO-tra", "good morning"),
  W("до́брый ве́чер", "DOB-ry VYE-cher", "good evening"),
  W("я не понима́ю", "ya ni pa-ni-MA-yu", "I don't understand"),
];

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

const d4Words = ids("w", "молоко город хлеб друг сегодня рыба язык русский");
const d5Words = ["здравствуйте", "как дела?", "отлично", "нормально", "извините", "до свидания", "пока", "доброе утро", "добрый вечер", "я не понимаю"].map((s) => `w-${s}`);
const week1Words = [...d1Words, ...d2Words, ...d3Words, ...d4Words, ...d5Words];

const STRESS_DAY4: CustomQuestion[] = [
  { prompt: "молоко", ask: "Which syllable is stressed?", options: ["мо́локо", "моло́ко", "молоко́"], answer: "молоко́", say: "молоко́",
    note: "ma-la-KO. Both unstressed О’s sound like “a”." },
  { prompt: "город", ask: "Which syllable is stressed?", options: ["го́род", "горо́д"], answer: "го́род", say: "го́род",
    note: "GO-rat. The second О is unstressed, so it sounds like “a”." },
  { prompt: "сегодня", ask: "Which syllable is stressed?", options: ["се́годня", "сего́дня", "сегодня́"], answer: "сего́дня", say: "сего́дня",
    note: "si-VOD-nya. The unstressed Е sounds close to “i”." },
  { prompt: "рыба", ask: "Which syllable is stressed?", options: ["ры́ба", "рыба́"], answer: "ры́ба", say: "ры́ба", note: "RY-ba." },
  { prompt: "язык", ask: "Which syllable is stressed?", options: ["я́зык", "язы́к"], answer: "язы́к", say: "язы́к", note: "ya-ZYK." },
  { prompt: "хорошо", ask: "Which syllable is stressed?", options: ["хо́рошо", "хоро́шо", "хорошо́"], answer: "хорошо́", say: "хорошо́",
    note: "kha-ra-SHO. Three О’s, and only the last one sounds like “o”." },
  { prompt: "спасибо", ask: "Which syllable is stressed?", options: ["спа́сибо", "спаси́бо", "спасибо́"], answer: "спаси́бо", say: "спаси́бо",
    note: "spa-SEE-ba." },
  { prompt: "Москва", ask: "Which syllable is stressed?", options: ["Мо́сква", "Москва́"], answer: "Москва́", say: "Москва́",
    note: "mask-VA. The unstressed О sounds like “a”." },
];

const STRESS_CHECK: CustomQuestion[] = [
  STRESS_DAY4[0],
  STRESS_DAY4[2],
  STRESS_DAY4[5],
  { prompt: "утро", ask: "Which syllable is stressed?", options: ["у́тро", "утро́"], answer: "у́тро", say: "у́тро", note: "OO-tra." },
  { prompt: "пожалуйста", ask: "Which syllable is stressed?", options: ["по́жалуйста", "пожа́луйста", "пожалуйста́"], answer: "пожа́луйста",
    say: "пожа́луйста", note: "pa-ZHAL-sta. Said much shorter than it is written." },
];

const SITUATIONS: CustomQuestion[] = [
  { prompt: "You meet an older neighbour in the morning.", ask: "What do you say?", options: ["До́брое у́тро!", "Пока́!", "Приве́т!", "Извини́те!"],
    answer: "До́брое у́тро!", say: "До́брое у́тро!", note: "Polite, and it fits the time of day. Приве́т is for friends." },
  { prompt: "Your friend leaves the café.", ask: "What do you say?", options: ["Пока́!", "Здра́вствуйте!", "До́брый ве́чер!", "Спаси́бо!"],
    answer: "Пока́!", say: "Пока́!", note: "Пока́ is the friendly goodbye." },
  { prompt: "A shop assistant hands you your change.", ask: "What do you say?", options: ["Спаси́бо!", "Извини́те!", "Пока́!", "Нет!"],
    answer: "Спаси́бо!", say: "Спаси́бо!", note: "Спаси́бо means thank you." },
  { prompt: "You bump into someone on the metro.", ask: "What do you say?", options: ["Извини́те!", "Приве́т!", "Хорошо́!", "До свида́ния!"],
    answer: "Извини́те!", say: "Извини́те!", note: "Извини́те is the polite “excuse me” or “sorry”." },
  { prompt: "Someone speaks fast and you are lost.", ask: "What do you say?", options: ["Я не понима́ю.", "Как дела́?", "Отли́чно!", "Да."],
    answer: "Я не понима́ю.", say: "Я не понима́ю.", note: "I don’t understand. A phrase worth knowing by heart." },
  { prompt: "A friend asks: Как дела́?", ask: "What do you answer?", options: ["Хорошо́, спаси́бо!", "Здра́вствуйте!", "До свида́ния!", "Я не понима́ю."],
    answer: "Хорошо́, спаси́бо!", say: "Хорошо́, спаси́бо!", note: "Good, thanks!" },
];

export const WEEK1_DAYS: Day[] = [
  {
    n: 1,
    week: 1,
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
    week: 1,
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
    week: 1,
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
  {
    n: 4,
    week: 1,
    title: "Sounds and stress",
    subtitle: "Why the red mark matters, and the letters that change their sound.",
    glyph: "Ё",
    stage: "Alphabet and sounds",
    milestone: {
      title: "You know where the stress falls, and why it matters",
      detail: "молоко́ · хорошо́ · сего́дня",
    },
    steps: [
      { id: "stress", title: "One syllable is the star", detail: "How stress works", minutes: 3, tier: 10, type: "grammar", items: [],
        intro: "The most important thing about Russian pronunciation, in two minutes.",
        grammar: {
          body: [
            "Every Russian word with more than one syllable has one stressed syllable. It is louder and longer, and the other vowels become short and soft.",
            "Russians don’t write the stress. Learning books do, and so does Govori, in red, so you learn every word with the right stress from the start.",
            "Stress changes how vowels sound. An unstressed О sounds like “a”, and an unstressed Е or Я sounds close to “i”.",
          ],
          examples: [
            { ru: "молоко́", tr: "ma-la-KO", en: "Milk" },
            { ru: "хорошо́", tr: "kha-ra-SHO", en: "Good" },
            { ru: "сего́дня", tr: "si-VOD-nya", en: "Today" },
          ],
          rule: "Find the stress first. It tells you how every other vowel sounds.",
        } },
      { id: "words", title: "New words", detail: "молоко́ · го́род · сего́дня", minutes: 4, tier: 10, type: "cards", items: d4Words,
        intro: "Listen for the unstressed vowels. Every О that isn’t red sounds like “a”." },
      { id: "find-stress", title: "Find the stress", detail: "Pick the stressed syllable", minutes: 4, tier: 10, type: "quiz", items: [], questions: STRESS_DAY4,
        intro: "The words are written without stress marks, the way Russians write them. Pick the right one." },
      { id: "endings", title: "Softer at the end", detail: "б → п, г → к, д → т", minutes: 3, tier: 20, type: "grammar", items: [],
        intro: "One more rule, and then you can pronounce almost any word you read.",
        grammar: {
          body: [
            "At the end of a word, some consonants lose their voice. You still write the same letter, you just say it harder.",
            "And one surprise: in сего́дня the Г is said like В.",
          ],
          table: {
            head: ["Written", "Said", "Example"],
            rows: [
              ["б", "п", "хлеб · khlyep · bread"],
              ["г", "к", "друг · druk · friend"],
              ["д", "т", "го́род · GO-rat · city"],
              ["ж", "ш", "ёж · yosh · hedgehog"],
            ],
          },
          rule: "Spell it as written, say it harder at the end.",
        } },
      { id: "listen", title: "Listen and pick", detail: "Hear the word, find it", minutes: 3, tier: 20, type: "listen",
        items: [...d4Words, ...ids("w", "москва метро театр спасибо хорошо")], count: 6,
        intro: "No text this time. Listen, then pick the word you heard. Tap the speaker to hear it again." },
      { id: "type", title: "Type it", detail: "Your first Russian typing", minutes: 8, tier: 45, type: "type",
        items: ids("w", "кот сок дом да нет чай друг хлеб"), count: 6,
        intro: "Type the Russian word. Use the keyboard on screen, or your own: each key types the Russian letter that sits in the same place on a Russian keyboard." },
      { id: "mixed", title: "Mixed review", detail: "Today’s words, shuffled", minutes: 5, tier: 45, type: "quiz", items: d4Words, count: 8,
        intro: "Today’s words, one more time." },
    ],
  },
  {
    n: 5,
    week: 1,
    title: "Your first phrases",
    subtitle: "Hello, goodbye, how are you, and when to be polite.",
    glyph: "Я",
    stage: "Alphabet and sounds",
    milestone: {
      title: "You can greet people, politely or as a friend",
      detail: "здра́вствуйте · приве́т · до свида́ния · пока́",
    },
    steps: [
      { id: "ty-vy", title: "Ты or вы?", detail: "Polite and friendly Russian", minutes: 3, tier: 10, type: "grammar", items: [],
        intro: "Before the first “hello”, one choice every Russian makes without thinking.",
        grammar: {
          body: [
            "Russian has two words for “you”. Ты is for friends, family and children. Вы is for strangers, older people, anyone you want to be polite to, and for more than one person.",
            "Greetings follow the same split. In здра́вствуйте, the first В is silent: ZDRA-stvuy-tye.",
          ],
          table: {
            head: ["", "Polite (вы)", "Friendly (ты)"],
            rows: [
              ["Hello", "здра́вствуйте", "приве́т"],
              ["Goodbye", "до свида́ния", "пока́"],
              ["Excuse me", "извини́те", "извини́"],
            ],
          },
          rule: "Not sure? Use вы. Too polite is never rude.",
        } },
      { id: "phrases", title: "Phrases", detail: "здра́вствуйте · как дела́?", minutes: 5, tier: 10, type: "cards", items: d5Words,
        intro: "Ten phrases you will use every single day." },
      { id: "read", title: "Read it", detail: "See the phrase, pick the meaning", minutes: 3, tier: 10, type: "quiz", items: d5Words, count: 6,
        intro: "Read each phrase and pick what it means." },
      { id: "dialogue", title: "A first conversation", detail: "Two short dialogues", minutes: 3, tier: 20, type: "grammar", items: [],
        intro: "Here is how it sounds together. Play each line and read along.",
        grammar: {
          body: ["First with a stranger, polite:"],
          examples: [
            { ru: "— Здра́вствуйте! Как дела́?", tr: "ZDRA-stvuy-tye! Kak di-LA?", en: "Hello! How are you?" },
            { ru: "— Хорошо́, спаси́бо. А у вас?", tr: "kha-ra-SHO, spa-SEE-ba. A u vas?", en: "Good, thanks. And you?" },
            { ru: "— Отли́чно! До свида́ния!", tr: "at-LEECH-na! Da svi-DA-ni-ya!", en: "Great! Goodbye!" },
            { ru: "— Приве́т! Как дела́?", tr: "pree-VYET! Kak di-LA?", en: "Hi! How are you? (to a friend)" },
            { ru: "— Норма́льно. Пока́!", tr: "nar-MAL-na. Pa-KA!", en: "OK. Bye!" },
          ],
          rule: "А у вас? means “and you?” Use А у тебя́? with a friend.",
        } },
      { id: "listen", title: "Listen and pick", detail: "Hear the phrase, find it", minutes: 3, tier: 20, type: "listen", items: d5Words, count: 6,
        intro: "Listen, then pick the phrase you heard." },
      { id: "type", title: "Type it", detail: "Short words on the keyboard", minutes: 8, tier: 45, type: "type",
        items: ids("w", "пока да нет привет спасибо"), count: 5,
        intro: "Type the Russian. Stress marks are never needed when you type." },
      { id: "mixed", title: "Mixed review", detail: "Days 3 to 5", minutes: 6, tier: 45, type: "quiz", items: [...d3Words, ...d4Words, ...d5Words], count: 10,
        intro: "Phrases and words from the last three days." },
    ],
  },
  {
    n: 6,
    week: 1,
    check: true,
    title: "Week 1 check",
    subtitle: "Five short parts. Pass each with 66 %, just like the real TORFL exam.",
    glyph: "Ю",
    stage: "Alphabet and sounds",
    milestone: {
      title: "Week 1 complete: you can read Russian and greet people",
      detail: "33 letters · stress · first phrases",
    },
    steps: [
      { id: "letters", part: "Letters", reviewDays: [1, 2, 3], title: "Letters", detail: "See the letter, pick the sound", minutes: 4, tier: 10,
        type: "quiz", items: LETTERS.map((l) => l.id), count: 10, intro: "Part 1 of 5. Pick the sound each letter makes." },
      { id: "words", part: "Words", reviewDays: [1, 2, 3, 4], title: "Words", detail: "See the word, pick the meaning", minutes: 4, tier: 10,
        type: "quiz", items: [...d1Words, ...d2Words, ...d3Words, ...d4Words], count: 10, intro: "Part 2 of 5. Pick what each word means." },
      { id: "stress", part: "Stress", reviewDays: [4], title: "Stress", detail: "Find the stressed syllable", minutes: 3, tier: 10,
        type: "quiz", items: [], questions: STRESS_CHECK, intro: "Part 3 of 5. Pick the right stress." },
      { id: "listening", part: "Listening", reviewDays: [4, 5], title: "Listening", detail: "Hear it, pick it", minutes: 3, tier: 10,
        type: "listen", items: week1Words, count: 6, intro: "Part 4 of 5. Listen and pick what you heard." },
      { id: "phrases", part: "Phrases", reviewDays: [5], title: "In real life", detail: "Pick the right phrase", minutes: 3, tier: 10,
        type: "quiz", items: [], questions: SITUATIONS, intro: "Part 5 of 5. What would you say?" },
    ],
  },
];

export const WEEK1: Week = {
  n: 1,
  title: "Alphabet and sounds",
  subtitle: "Read every letter, find the stress, greet people.",
  days: [1, 2, 3, 4, 5, 6],
};
