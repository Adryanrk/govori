// Week 2: Hello, this is me (days 7–12).
// Names, he/she/it, who/what, where you are from, and phrases that save you.
import { W } from "./build";
import type { CustomQuestion, Day, Week, Word } from "./types";

export const WEEK2_WORDS: Word[] = [
  // Day 7
  W("меня́ зову́т", "mi-NYA za-VOOT", "my name is"),
  W("как вас зову́т?", "kak vas za-VOOT", "what is your name? (polite)"),
  W("как тебя́ зову́т?", "kak ti-BYA za-VOOT", "what is your name? (friendly)"),
  W("о́чень прия́тно", "O-chen' pri-YAT-na", "nice to meet you"),
  W("кто", "kto", "who"),
  W("и", "ee", "and"),
  W("а", "a", "and, but (for a contrast)"),
  W("подру́га", "pa-DROO-ga", "friend (a woman)"),
  W("челове́к", "chi-la-VYEK", "person"),
  // Day 8
  W("он", "on", "he"),
  W("она́", "a-NA", "she"),
  W("оно́", "a-NO", "it"),
  W("мы", "my", "we"),
  W("вы", "vy", "you (polite, or several people)"),
  W("они́", "a-NEE", "they"),
  W("стол", "stol", "table"),
  W("ко́мната", "KOM-na-ta", "room"),
  W("письмо́", "pis'-MO", "letter (mail)"),
  W("па́па", "PA-pa", "dad"),
  // Day 9
  W("что", "shto", "what"),
  W("кни́га", "KNEE-ga", "book"),
  W("ру́чка", "ROOCH-ka", "pen"),
  W("телефо́н", "ti-li-FON", "phone"),
  W("су́мка", "SOOM-ka", "bag"),
  W("ключ", "klyuch", "key"),
  W("студе́нт", "stoo-DYENT", "student (a man)"),
  W("студе́нтка", "stoo-DYENT-ka", "student (a woman)"),
  W("врач", "vrach", "doctor"),
  W("соба́ка", "sa-BA-ka", "dog"),
  // Day 10
  W("отку́да?", "at-KOO-da", "where from?"),
  W("я из Шве́ции", "ya iz SHVE-tsy-i", "I'm from Sweden"),
  W("Шве́ция", "SHVE-tsy-ya", "Sweden"),
  W("Росси́я", "ra-SEE-ya", "Russia"),
  W("швед", "shvyet", "Swede (a man)"),
  W("шве́дка", "SHVYET-ka", "Swede (a woman)"),
  W("ру́сская", "ROO-ska-ya", "Russian (a woman)"),
  W("где?", "gdye", "where?"),
  W("здесь", "zdyes'", "here"),
  W("вот", "vot", "here is, there is"),
  // Day 11
  W("повтори́те, пожа́луйста", "paf-ta-REE-tye, pa-ZHAL-sta", "please repeat"),
  W("ещё раз", "yi-SHCHO ras", "once more"),
  W("ме́дленнее", "MYED-lin-nye-ye", "slower"),
  W("что э́то зна́чит?", "shto E-ta ZNA-chit", "what does that mean?"),
  W("как по-ру́сски…?", "kak pa-ROO-ski", "how do you say … in Russian?"),
  W("я понима́ю", "ya pa-ni-MA-yu", "I understand"),
  W("я зна́ю", "ya ZNA-yu", "I know"),
  W("я не зна́ю", "ya ni ZNA-yu", "I don't know"),
  W("коне́чно", "ka-NYESH-na", "of course"),
  W("мо́жно?", "MOZH-na", "may I? is it OK?"),
];

const w = (...ru: string[]) => ru.map((s) => `w-${s}`);

const d7 = w("меня зовут", "как вас зовут?", "как тебя зовут?", "очень приятно", "кто", "и", "а", "подруга", "человек");
const d8 = w("он", "она", "оно", "мы", "вы", "они", "стол", "комната", "письмо", "папа");
const d9 = w("что", "книга", "ручка", "телефон", "сумка", "ключ", "студент", "студентка", "врач", "собака");
const d10 = w("откуда?", "я из швеции", "швеция", "россия", "швед", "шведка", "русская", "где?", "здесь", "вот");
const d11 = w("повторите, пожалуйста", "ещё раз", "медленнее", "что это значит?", "как по-русски…?", "я понимаю", "я знаю", "я не знаю", "конечно", "можно?");
export const week2Words = [...d7, ...d8, ...d9, ...d10, ...d11];

const G = (prompt: string, answer: "он" | "она́" | "оно́", note: string): CustomQuestion => ({
  prompt,
  ask: "Он, она́ or оно́?",
  options: ["он", "она́", "оно́"],
  answer,
  say: prompt,
  note,
});

const GENDER: CustomQuestion[] = [
  G("дом", "он", "Ends in a consonant, so он."),
  G("шко́ла", "она́", "Ends in -а, so она́."),
  G("окно́", "оно́", "Ends in -о, so оно́."),
  G("ко́мната", "она́", "Ends in -а, so она́."),
  G("письмо́", "оно́", "Ends in -о, so оно́."),
  G("па́па", "он", "Ends in -а, but a man is always он."),
  G("стол", "он", "Ends in a consonant, so он."),
  G("мо́ре", "оно́", "Ends in -е, so оно́."),
  G("ры́ба", "она́", "Ends in -а, so она́."),
  G("чай", "он", "Ends in -й, so он."),
  G("у́тро", "оно́", "Ends in -о, so оно́."),
  G("день", "он", "Ends in -ь. Those you learn one by one: день is он."),
];

const K = (prompt: string, answer: "кто" | "что", note: string): CustomQuestion => ({
  prompt,
  ask: "Кто or что?",
  options: ["кто", "что"],
  answer,
  say: prompt,
  note,
});

const WHO_WHAT: CustomQuestion[] = [
  K("соба́ка", "кто", "Animals are кто too."),
  K("кни́га", "что", "A thing, so что."),
  K("врач", "кто", "A person, so кто."),
  K("ключ", "что", "A thing, so что."),
  K("кот", "кто", "Animals are кто too."),
  K("телефо́н", "что", "A thing, so что."),
  K("студе́нтка", "кто", "A person, so кто."),
  K("су́мка", "что", "A thing, so что."),
  K("подру́га", "кто", "A person, so кто."),
  K("стол", "что", "A thing, so что."),
];

const SAVE: CustomQuestion[] = [
  { prompt: "Your teacher speaks too fast.", ask: "What do you say?", options: ["Ме́дленнее, пожа́луйста!", "Коне́чно!", "Я зна́ю.", "Мо́жно?"],
    answer: "Ме́дленнее, пожа́луйста!", note: "Slower, please!" },
  { prompt: "You don't know the Russian word for “pen”.", ask: "What do you ask?", options: ["Как по-ру́сски “pen”?", "Где ру́чка?", "Кто э́то?", "Отку́да вы?"],
    answer: "Как по-ру́сски “pen”?", say: "Как по-ру́сски", note: "How do you say “pen” in Russian? (It's ру́чка.)" },
  { prompt: "Someone asks if you know the way. You don't.", ask: "What do you answer?", options: ["Я не зна́ю.", "Я понима́ю.", "Коне́чно!", "О́чень прия́тно."],
    answer: "Я не зна́ю.", note: "I don't know." },
  { prompt: "A friend asks Мо́жно? to borrow your pen. You agree.", ask: "What do you answer?", options: ["Коне́чно!", "Ещё раз.", "Что э́то зна́чит?", "Пока́!"],
    answer: "Коне́чно!", note: "Of course! Said ka-NYESH-na." },
  { prompt: "You missed what someone just said.", ask: "What do you say?", options: ["Повтори́те, пожа́луйста.", "Я зна́ю.", "Вот он.", "Здра́вствуйте."],
    answer: "Повтори́те, пожа́луйста.", note: "Please repeat." },
  { prompt: "You see a word you don't know on a sign.", ask: "What do you ask?", options: ["Что э́то зна́чит?", "Кто э́то?", "Где?", "Отку́да?"],
    answer: "Что э́то зна́чит?", note: "What does that mean?" },
];

const MEET: CustomQuestion[] = [
  { prompt: "Someone asks: Как вас зову́т?", ask: "What do you answer?", options: ["Меня́ зову́т Адриа́н.", "О́чень прия́тно.", "Я не зна́ю.", "Отку́да вы?"],
    answer: "Меня́ зову́т Адриа́н.", note: "My name is Adrian." },
  { prompt: "Someone has just told you their name.", ask: "What do you say?", options: ["О́чень прия́тно!", "Ещё раз!", "Где?", "Мо́жно?"],
    answer: "О́чень прия́тно!", note: "Nice to meet you!" },
  { prompt: "You want to know where someone is from.", ask: "What do you ask?", options: ["Отку́да вы?", "Где вы?", "Кто вы?", "Как вы?"],
    answer: "Отку́да вы?", note: "Where are you from?" },
  { prompt: "Someone asks: Отку́да вы?", ask: "What do you answer?", options: ["Я из Шве́ции.", "Я здесь.", "Вот он.", "Я понима́ю."],
    answer: "Я из Шве́ции.", note: "I'm from Sweden." },
  { prompt: "You want to ask a new friend their name.", ask: "What do you ask?", options: ["Как тебя́ зову́т?", "Как вас зову́т?", "Кто э́то?", "Что э́то?"],
    answer: "Как тебя́ зову́т?", note: "With a friend, ты: Как тебя́ зову́т?" },
];

export const WEEK2_DAYS: Day[] = [
  {
    n: 7,
    week: 2,
    title: "Who are you?",
    subtitle: "Say your name, ask someone else's, and be glad to meet them.",
    glyph: "З",
    stage: "Hello, this is me",
    milestone: { title: "You can introduce yourself", detail: "Меня́ зову́т… · О́чень прия́тно!" },
    steps: [
      { id: "no-is", title: "No “am”, no “is”", detail: "How Russian says “I am”", minutes: 3, tier: 10, type: "grammar", items: [],
        intro: "Good news: one less word to learn.",
        grammar: {
          body: [
            "In the present tense, Russian simply leaves out am, is and are. Я Адриа́н means “I am Adrian”. Э́то кот means “this is a cat”.",
            "To give your name, Russians say Меня́ зову́т…, which literally means “they call me…”.",
          ],
          examples: [
            { ru: "Я Адриа́н.", tr: "ya a-dri-AN", en: "I'm Adrian." },
            { ru: "Меня́ зову́т А́нна.", tr: "mi-NYA za-VOOT AN-na", en: "My name is Anna." },
            { ru: "Как вас зову́т?", tr: "kak vas za-VOOT", en: "What is your name? (polite)" },
          ],
          rule: "Я + your name = I am. No extra word needed.",
        } },
      { id: "words", title: "New words", detail: "меня́ зову́т · о́чень прия́тно", minutes: 5, tier: 10, type: "cards", items: d7,
        intro: "Everything you need for a first meeting." },
      { id: "read", title: "Read it", detail: "See the phrase, pick the meaning", minutes: 3, tier: 10, type: "quiz", items: d7, count: 6,
        intro: "Read each one and pick what it means." },
      { id: "dialogue", title: "A first meeting", detail: "Two short dialogues", minutes: 3, tier: 20, type: "grammar", items: [],
        intro: "Play each line and read along.",
        grammar: {
          body: ["Polite, with a stranger, and then friendly, with someone your age:"],
          examples: [
            { ru: "— Здра́вствуйте! Меня́ зову́т А́нна. А как вас зову́т?", tr: "ZDRA-stvuy-tye! mi-NYA za-VOOT AN-na. a kak vas za-VOOT?", en: "Hello! My name is Anna. And what's your name?" },
            { ru: "— Меня́ зову́т Адриа́н.", tr: "mi-NYA za-VOOT a-dri-AN", en: "My name is Adrian." },
            { ru: "— О́чень прия́тно!", tr: "O-chen' pri-YAT-na", en: "Nice to meet you!" },
            { ru: "— Приве́т! Я Макс. А ты?", tr: "pree-VYET! ya maks. a ty?", en: "Hi! I'm Max. And you?" },
            { ru: "— Я Адриа́н. О́чень прия́тно!", tr: "ya a-dri-AN. O-chen' pri-YAT-na", en: "I'm Adrian. Nice to meet you!" },
          ],
          rule: "А ты? / А вы? means “and you?”. It turns any question back to the other person.",
        } },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d7, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "Short words on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("кто", "подруга", "человек", "мама", "кот"), count: 5, intro: "Type the Russian. Stress marks are never needed." },
      { id: "mixed", title: "Mixed review", detail: "Today and last week's phrases", minutes: 6, tier: 45, type: "quiz",
        items: [...d7, ...w("здравствуйте", "как дела?", "до свидания", "пока", "извините")], count: 10, intro: "Today's words mixed with last week's greetings." },
    ],
  },
  {
    n: 8,
    week: 2,
    title: "He, she, it",
    subtitle: "Every Russian noun is он, она́ or оно́. The last letter tells you which.",
    glyph: "О",
    stage: "Hello, this is me",
    milestone: { title: "You can tell if a word is он, она́ or оно́", detail: "стол · ко́мната · письмо́" },
    steps: [
      { id: "gender", title: "Every noun has a gender", detail: "Read it from the last letter", minutes: 4, tier: 10, type: "grammar", items: [],
        intro: "The first real grammar rule, and one of the friendliest.",
        grammar: {
          body: [
            "Russian nouns are masculine (он), feminine (она́) or neuter (оно́). You can almost always see which from the last letter.",
            "A word for a man is always он, even when it ends in -а, like па́па. Words ending in -ь can be either, so learn them one by one: день is он.",
          ],
          table: {
            head: ["Ends in", "Gender", "Examples"],
            rows: [
              ["a consonant or -й", "он", "дом · стол · чай"],
              ["-а or -я", "она́", "ма́ма · ко́мната · шко́ла"],
              ["-о or -е", "оно́", "окно́ · письмо́ · мо́ре"],
            ],
          },
          rule: "Consonant = он. А or я = она́. О or е = оно́.",
        } },
      { id: "words", title: "New words", detail: "он · она́ · мы · ко́мната", minutes: 5, tier: 10, type: "cards", items: d8,
        intro: "The pronouns, plus a few things to practise on." },
      { id: "gender-quiz", title: "Он, она́ or оно́?", detail: "Look at the last letter", minutes: 4, tier: 10, type: "quiz", items: [], questions: GENDER, count: 10,
        intro: "Pick the gender. Look at the last letter, and remember the exceptions." },
      { id: "pronouns", title: "All the pronouns", detail: "я, ты, он… они́", minutes: 3, tier: 20, type: "grammar", items: [],
        intro: "The whole set in one table.",
        grammar: {
          body: ["Он and она́ also mean “it” for things, so a table is он and a room is она́. Где стол? — Вот он. Where's the table? Here it is."],
          table: {
            head: ["Russian", "English"],
            rows: [
              ["я", "I"],
              ["ты", "you (one friend)"],
              ["он · она́ · оно́", "he · she · it"],
              ["мы", "we"],
              ["вы", "you (polite, or several people)"],
              ["они́", "they"],
            ],
          },
          rule: "Things are он, она́ or оно́ too, just like people.",
        } },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d8, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "Pronouns on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("он", "она", "мы", "вы", "стол", "папа"), count: 6, intro: "Type the Russian word." },
      { id: "mixed", title: "Mixed review", detail: "Days 7 and 8", minutes: 6, tier: 45, type: "quiz", items: [...d7, ...d8], count: 10,
        intro: "Yesterday and today, shuffled." },
    ],
  },
  {
    n: 9,
    week: 2,
    title: "Who or what?",
    subtitle: "Кто for people and animals, что for things, and не for “not”.",
    glyph: "К",
    stage: "Hello, this is me",
    milestone: { title: "You can ask who and what things are", detail: "Кто э́то? · Что э́то?" },
    steps: [
      { id: "kto-chto", title: "Кто? Что? Не.", detail: "Asking and saying no", minutes: 4, tier: 10, type: "grammar", items: [],
        intro: "Two question words and one tiny word for “not”.",
        grammar: {
          body: [
            "Ask кто? about people and animals, and что? about things. A dog is кто, a book is что. Что is said “shto”.",
            "Не before a word says “not”: Э́то не кот means “this is not a cat”.",
          ],
          examples: [
            { ru: "Кто э́то? — Э́то студе́нт.", tr: "kto E-ta? E-ta stoo-DYENT", en: "Who is this? This is a student." },
            { ru: "Что э́то? — Э́то кни́га.", tr: "shto E-ta? E-ta KNEE-ga", en: "What is this? This is a book." },
            { ru: "Э́то не телефо́н, э́то ключ.", tr: "E-ta ni ti-li-FON, E-ta klyuch", en: "This isn't a phone, it's a key." },
          ],
          rule: "People and animals: кто. Things: что. Not: не.",
        } },
      { id: "words", title: "New words", detail: "кни́га · ключ · соба́ка", minutes: 5, tier: 10, type: "cards", items: d9,
        intro: "Things around you, and a few people." },
      { id: "who-what", title: "Кто or что?", detail: "Person, animal or thing?", minutes: 3, tier: 10, type: "quiz", items: [], questions: WHO_WHAT,
        intro: "Would you ask кто or что about it?" },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 20, type: "quiz", items: d9, count: 6,
        intro: "Read each word and pick what it means." },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d9, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "Things on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("ключ", "врач", "книга", "сумка", "телефон"), count: 5, intro: "Type the Russian word." },
      { id: "mixed", title: "Mixed review", detail: "Days 8 and 9", minutes: 6, tier: 45, type: "quiz", items: [...d8, ...d9], count: 10,
        intro: "Yesterday and today, shuffled." },
    ],
  },
  {
    n: 10,
    week: 2,
    title: "Where are you from?",
    subtitle: "Countries, a man's and a woman's form, and где and вот.",
    glyph: "Ш",
    stage: "Hello, this is me",
    milestone: { title: "You can say where you're from", detail: "Я из Шве́ции. Отку́да вы?" },
    steps: [
      { id: "man-woman", title: "A man's word, a woman's word", detail: "швед and шве́дка", minutes: 4, tier: 10, type: "grammar", items: [],
        intro: "Russian often has two words for the same kind of person.",
        grammar: {
          body: [
            "Many words for people have a man's form and a woman's form. The woman's form often adds -ка or ends in -ая.",
            "Я из… means “I'm from…”. The country changes its ending after из, so for now learn я из Шве́ции as one piece.",
          ],
          table: {
            head: ["", "Man (он)", "Woman (она́)"],
            rows: [
              ["Swede", "швед", "шве́дка"],
              ["student", "студе́нт", "студе́нтка"],
              ["Russian", "ру́сский", "ру́сская"],
              ["friend", "друг", "подру́га"],
            ],
          },
          rule: "Talking about yourself? Pick the form that fits you.",
        } },
      { id: "words", title: "New words", detail: "отку́да? · где? · вот", minutes: 5, tier: 10, type: "cards", items: d10,
        intro: "Where you are from, and where things are." },
      { id: "read", title: "Read it", detail: "See it, pick the meaning", minutes: 3, tier: 10, type: "quiz", items: d10, count: 6,
        intro: "Read each one and pick what it means." },
      { id: "dialogue", title: "Two short scenes", detail: "Where from, and where is it", minutes: 3, tier: 20, type: "grammar", items: [],
        intro: "Play each line and read along.",
        grammar: {
          body: ["Notice how вот он and вот она́ follow the gender of the thing."],
          examples: [
            { ru: "— Отку́да вы?", tr: "at-KOO-da vy", en: "Where are you from?" },
            { ru: "— Я из Шве́ции. Я швед. А вы?", tr: "ya iz SHVE-tsy-i. ya shvyet. a vy?", en: "I'm from Sweden. I'm a Swede. And you?" },
            { ru: "— Я из Росси́и. Я ру́сская.", tr: "ya iz ra-SEE-i. ya ROO-ska-ya", en: "I'm from Russia. I'm Russian." },
            { ru: "— Где ключ? — Вот он!", tr: "gdye klyuch? vot on!", en: "Where's the key? Here it is!" },
            { ru: "— Где су́мка? — Вот она́!", tr: "gdye SOOM-ka? vot a-NA!", en: "Where's the bag? Here it is!" },
          ],
          rule: "Вот + он/она́/оно́ = “here it is”, matching the gender of the thing.",
        } },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d10, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "Short words on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("где?", "вот", "швед", "здесь", "откуда?"), count: 5, intro: "Type the Russian. The question mark is optional." },
      { id: "mixed", title: "Mixed review", detail: "Days 9 and 10", minutes: 6, tier: 45, type: "quiz", items: [...d9, ...d10], count: 10,
        intro: "Yesterday and today, shuffled." },
    ],
  },
  {
    n: 11,
    week: 2,
    title: "Phrases that save you",
    subtitle: "What to say when you're lost, didn't hear, or don't know the word.",
    glyph: "П",
    stage: "Hello, this is me",
    milestone: { title: "You can keep a conversation going", detail: "Повтори́те, пожа́луйста · Что э́то зна́чит?" },
    steps: [
      { id: "lost", title: "When you are lost", detail: "Ask, don't freeze", minutes: 3, tier: 10, type: "grammar", items: [],
        intro: "The most useful phrases for a beginner are the ones that ask for help.",
        grammar: {
          body: [
            "These phrases keep a conversation going when you don't follow. Most people are happy to slow down for a learner.",
            "Коне́чно is said ka-NYESH-na. Here ЧН sounds like ШН, one of the few spelling surprises in Russian.",
          ],
          examples: [
            { ru: "— Как по-ру́сски “book”? — Кни́га.", tr: "kak pa-ROO-ski book? KNEE-ga", en: "How do you say “book” in Russian? Кни́га." },
            { ru: "— Повтори́те, пожа́луйста, ме́дленнее.", tr: "paf-ta-REE-tye, pa-ZHAL-sta, MYED-lin-nye-ye", en: "Please repeat, slower." },
            { ru: "— Что э́то зна́чит?", tr: "shto E-ta ZNA-chit", en: "What does that mean?" },
          ],
          rule: "Not sure? Ask. Повтори́те, пожа́луйста works everywhere.",
        } },
      { id: "words", title: "New phrases", detail: "ещё раз · я не зна́ю · коне́чно", minutes: 5, tier: 10, type: "cards", items: d11,
        intro: "Ten phrases that will save you again and again." },
      { id: "read", title: "Read it", detail: "See it, pick the meaning", minutes: 3, tier: 10, type: "quiz", items: d11, count: 6,
        intro: "Read each one and pick what it means." },
      { id: "situations", title: "What would you say?", detail: "Pick the right phrase", minutes: 4, tier: 20, type: "quiz", items: [], questions: SAVE,
        intro: "Real moments. Pick what you would say." },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d11, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "Short phrases on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("я знаю", "я не знаю", "конечно", "ещё раз"), count: 4, intro: "Type the Russian, with a space between the words." },
      { id: "mixed", title: "Mixed review", detail: "The whole week so far", minutes: 6, tier: 45, type: "quiz", items: [...d7, ...d10, ...d11], count: 10,
        intro: "Phrases from this week, shuffled." },
    ],
  },
  {
    n: 12,
    week: 2,
    check: true,
    title: "Week 2 check",
    subtitle: "Five short parts. Pass each with 66 %, just like the real TORFL exam.",
    glyph: "Д",
    stage: "Hello, this is me",
    milestone: { title: "Week 2 complete: you can introduce yourself in Russian", detail: "names · он, она́, оно́ · кто and что" },
    steps: [
      { id: "words", part: "Words", reviewDays: [7, 8, 9, 10, 11], title: "Words", detail: "See it, pick the meaning", minutes: 4, tier: 10,
        type: "quiz", items: week2Words, count: 10, intro: "Part 1 of 5. Pick what each word or phrase means." },
      { id: "gender", part: "Gender", reviewDays: [8], title: "Он, она́ or оно́?", detail: "Pick the gender", minutes: 3, tier: 10,
        type: "quiz", items: [], questions: GENDER, count: 6, intro: "Part 2 of 5. Pick the gender of each word." },
      { id: "who-what", part: "Who or what", reviewDays: [9], title: "Кто or что?", detail: "Person, animal or thing?", minutes: 2, tier: 10,
        type: "quiz", items: [], questions: WHO_WHAT, count: 6, intro: "Part 3 of 5. Кто or что?" },
      { id: "listening", part: "Listening", reviewDays: [7, 10, 11], title: "Listening", detail: "Hear it, pick it", minutes: 3, tier: 10,
        type: "listen", items: week2Words, count: 6, intro: "Part 4 of 5. Listen and pick what you heard." },
      { id: "real-life", part: "In real life", reviewDays: [7, 10, 11], title: "In real life", detail: "Pick the right phrase", minutes: 4, tier: 10,
        type: "quiz", items: [], questions: [...MEET, ...SAVE], count: 6, intro: "Part 5 of 5. What would you say?" },
    ],
  },
];

export const WEEK2: Week = {
  n: 2,
  title: "Hello, this is me",
  subtitle: "Introduce yourself, names, он and она́.",
  days: [7, 8, 9, 10, 11, 12],
};
