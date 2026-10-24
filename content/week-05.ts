// Week 5: What do you do? (days 25–30).
// First verbs (two patterns), languages, jobs, school and work, how often.
import { W } from "./build";
import type { CustomQuestion, Day, Week, Word } from "./types";

export const WEEK5_WORDS: Word[] = [
  // Day 25
  W("рабо́тать", "ra-BO-tat'", "to work"),
  W("де́лать", "DYE-lat'", "to do, to make"),
  W("знать", "znat'", "to know"),
  W("понима́ть", "pa-ni-MAT'", "to understand"),
  W("чита́ть", "chi-TAT'", "to read"),
  W("слу́шать", "SLU-shat'", "to listen"),
  W("ду́мать", "DU-mat'", "to think"),
  W("рабо́та", "ra-BO-ta", "work, job"),
  // Day 26
  W("говори́ть", "ga-va-REET'", "to speak"),
  W("учи́ть", "u-CHEET'", "to learn"),
  W("смотре́ть", "smat-RYET'", "to watch"),
  W("люби́ть", "lyu-BEET'", "to love, to like"),
  W("писа́ть", "pi-SAT'", "to write"),
  W("англи́йский", "an-GLEEY-skiy", "English"),
  W("шве́дский", "SHVYET-skiy", "Swedish"),
  W("по-англи́йски", "pa-an-GLEEY-ski", "in English"),
  W("по-шве́дски", "pa-SHVYET-ski", "in Swedish"),
  W("по-ру́сски", "pa-RU-ski", "in Russian"),
  // Day 27
  W("профе́ссия", "pra-FYE-si-ya", "profession"),
  W("кем вы рабо́таете?", "kyem vy ra-BO-ta-i-tye", "what do you do (for work)?"),
  W("учи́тель", "u-CHEE-til'", "teacher (a man)"),
  W("учи́тельница", "u-CHEE-til'-ni-tsa", "teacher (a woman)"),
  W("инжене́р", "in-zhi-NYER", "engineer"),
  W("программи́ст", "pra-gra-MEEST", "programmer"),
  W("ме́неджер", "MYE-nid-zhir", "manager"),
  W("продаве́ц", "pra-da-VYETS", "shop assistant"),
  W("официа́нт", "a-fi-tsi-ANT", "waiter"),
  W("води́тель", "va-DEE-til'", "driver"),
  W("медсестра́", "mit-sis-TRA", "nurse"),
  W("юри́ст", "yu-REEST", "lawyer"),
  W("журнали́ст", "zhur-na-LEEST", "journalist"),
  W("дизайне́р", "di-zay-NER", "designer"),
  // Day 28
  W("университе́т", "u-ni-vir-si-TYET", "university"),
  W("о́фис", "O-fis", "office"),
  W("компа́ния", "kam-PA-ni-ya", "company"),
  W("уро́к", "u-ROK", "lesson"),
  W("дома́шнее зада́ние", "da-MASH-ni-ye za-DA-ni-ye", "homework"),
  W("вопро́с", "vap-ROS", "question"),
  W("отве́т", "at-VYET", "answer"),
  W("сло́во", "SLO-va", "word"),
  // Day 29
  W("немно́го", "nim-NO-ga", "a little"),
  W("пло́хо", "PLO-kha", "badly"),
  W("сейча́с", "si-CHAS", "now"),
  W("иногда́", "i-nag-DA", "sometimes"),
  W("всегда́", "fsig-DA", "always"),
  W("ча́сто", "CHA-sta", "often"),
];

const w = (...ru: string[]) => ru.map((s) => `w-${s}`);

const d25 = w("работать", "делать", "знать", "понимать", "читать", "слушать", "думать", "работа");
const d26 = w("говорить", "учить", "смотреть", "любить", "писать", "английский", "шведский", "по-английски", "по-шведски", "по-русски");
const d27 = w("профессия", "кем вы работаете?", "учитель", "учительница", "инженер", "программист", "менеджер", "продавец",
  "официант", "водитель", "медсестра", "юрист", "журналист", "дизайнер");
const d28 = w("университет", "офис", "компания", "урок", "домашнее задание", "вопрос", "ответ", "слово");
const d29 = w("немного", "плохо", "сейчас", "иногда", "всегда", "часто");
export const week5Words = [...d25, ...d26, ...d27, ...d28, ...d29];
const verbs = [...d25.slice(0, 7), ...d26.slice(0, 5)];

// ---- Verb forms -----------------------------------------------------------

const PRONOUNS = ["я", "ты", "он / она́", "мы", "вы", "они́"] as const;
const PRONOUN_EN: Record<string, string> = { я: "I", ты: "you", "он / она́": "he / she", мы: "we", вы: "you (polite, plural)", "они́": "they" };

/** Six present-tense forms, in the order я, ты, он/она́, мы, вы, они́. */
type Forms = [string, string, string, string, string, string];

const VERBS: { inf: string; en: string; forms: Forms }[] = [
  { inf: "рабо́тать", en: "work", forms: ["рабо́таю", "рабо́таешь", "рабо́тает", "рабо́таем", "рабо́таете", "рабо́тают"] },
  { inf: "де́лать", en: "do", forms: ["де́лаю", "де́лаешь", "де́лает", "де́лаем", "де́лаете", "де́лают"] },
  { inf: "знать", en: "know", forms: ["зна́ю", "зна́ешь", "зна́ет", "зна́ем", "зна́ете", "зна́ют"] },
  { inf: "понима́ть", en: "understand", forms: ["понима́ю", "понима́ешь", "понима́ет", "понима́ем", "понима́ете", "понима́ют"] },
  { inf: "чита́ть", en: "read", forms: ["чита́ю", "чита́ешь", "чита́ет", "чита́ем", "чита́ете", "чита́ют"] },
  { inf: "слу́шать", en: "listen", forms: ["слу́шаю", "слу́шаешь", "слу́шает", "слу́шаем", "слу́шаете", "слу́шают"] },
  { inf: "ду́мать", en: "think", forms: ["ду́маю", "ду́маешь", "ду́мает", "ду́маем", "ду́маете", "ду́мают"] },
  { inf: "говори́ть", en: "speak", forms: ["говорю́", "говори́шь", "говори́т", "говори́м", "говори́те", "говоря́т"] },
  { inf: "учи́ть", en: "learn", forms: ["учу́", "у́чишь", "у́чит", "у́чим", "у́чите", "у́чат"] },
  { inf: "смотре́ть", en: "watch", forms: ["смотрю́", "смо́тришь", "смо́трит", "смо́трим", "смо́трите", "смо́трят"] },
  { inf: "люби́ть", en: "love", forms: ["люблю́", "лю́бишь", "лю́бит", "лю́бим", "лю́бите", "лю́бят"] },
  { inf: "писа́ть", en: "write", forms: ["пишу́", "пи́шешь", "пи́шет", "пи́шем", "пи́шете", "пи́шут"] },
];

/** "мы + чита́ть": pick the right form. Distractors are other forms of the same verb. */
function formQuestions(infs: string[], picks: number[]): CustomQuestion[] {
  return infs.map((inf, i) => {
    const v = VERBS.find((x) => x.inf === inf)!;
    const p = picks[i % picks.length];
    const answer = v.forms[p];
    const others = [0, 1, 2, 3, 4, 5].filter((k) => k !== p && v.forms[k] !== answer);
    // Three distractors, spread across the table so they're not all neighbours.
    const chosen = [others[(i + 0) % others.length], others[(i + 2) % others.length], others[(i + 4) % others.length]];
    const options = Array.from(new Set([answer, ...chosen.map((k) => v.forms[k])]));
    const pron = PRONOUNS[p];
    return {
      prompt: `${pron} + ${v.inf}`,
      ask: "Which form fits?",
      options,
      answer,
      say: `${pron.split(" / ")[0]} ${answer}`,
      note: `${PRONOUN_EN[pron]} ${v.en}${p === 2 ? "s" : ""} = ${pron} ${answer}`,
    };
  });
}

const FORMS_1 = formQuestions(
  ["рабо́тать", "де́лать", "знать", "понима́ть", "чита́ть", "слу́шать", "ду́мать", "рабо́тать", "чита́ть", "знать"],
  [0, 1, 2, 3, 4, 5, 3, 5, 1, 0]
);
const FORMS_2 = formQuestions(
  ["говори́ть", "учи́ть", "смотре́ть", "люби́ть", "писа́ть", "говори́ть", "люби́ть", "смотре́ть", "писа́ть", "учи́ть"],
  [0, 2, 1, 0, 0, 5, 1, 3, 2, 4]
);
const FORMS_ALL = [...FORMS_1, ...FORMS_2];

const conjTable = (infs: string[]) => ({
  head: ["", ...infs],
  rows: PRONOUNS.map((p, i) => [p, ...infs.map((inf) => VERBS.find((v) => v.inf === inf)!.forms[i])]),
});

// ---- Situations -----------------------------------------------------------

const JOBS: CustomQuestion[] = [
  { prompt: "Someone asks: Кем вы рабо́таете? You are an engineer.", ask: "What do you answer?", options: ["Я инжене́р.", "Я рабо́таю инжене́р.", "Я инжене́ра.", "Инжене́р рабо́та."],
    answer: "Я инжене́р.", note: "No “am”, no “a”: just Я инжене́р." },
  { prompt: "Your sister is a teacher.", ask: "How do you say it?", options: ["Моя́ сестра́ учи́тельница.", "Моя́ сестра́ учи́тель.", "Мой сестра́ учи́тельница.", "Моя́ сестра́ рабо́та."],
    answer: "Моя́ сестра́ учи́тельница.", note: "A woman who teaches is учи́тельница." },
  { prompt: "You want to ask a new colleague what they do.", ask: "What do you ask?", options: ["Кем вы рабо́таете?", "Где вы живёте?", "Как вас зову́т?", "Ско́лько сто́ит?"],
    answer: "Кем вы рабо́таете?", note: "What do you do for work?" },
  { prompt: "A waiter comes to your table. Who is he?", ask: "Pick the word.", options: ["официа́нт", "води́тель", "продаве́ц", "юри́ст"],
    answer: "официа́нт", note: "официа́нт = waiter." },
  { prompt: "Your friend writes code all day.", ask: "What is he?", options: ["программи́ст", "журнали́ст", "медсестра́", "дизайне́р"],
    answer: "программи́ст", note: "программи́ст = programmer." },
  { prompt: "The person who sells you bread in a shop.", ask: "Pick the word.", options: ["продаве́ц", "ме́неджер", "учи́тель", "инжене́р"],
    answer: "продаве́ц", note: "продаве́ц = shop assistant." },
];

const LANGUAGES: CustomQuestion[] = [
  { prompt: "“I speak Russian a little.”", ask: "Pick the Russian.", options: ["Я немно́го говорю́ по-ру́сски.", "Я немно́го говорю́ ру́сский.", "Я немно́го говори́т по-ру́сски.", "Я немно́го говоря́т по-ру́сски."],
    answer: "Я немно́го говорю́ по-ру́сски.", note: "After говори́ть: по-ру́сски, not ру́сский." },
  { prompt: "Someone asks: Вы говори́те по-англи́йски?", ask: "You do. What do you answer?", options: ["Да, говорю́.", "Да, говори́т.", "Да, говоря́т.", "Да, говори́м."],
    answer: "Да, говорю́.", note: "я → говорю́." },
  { prompt: "“Do you understand?” (to a friend)", ask: "Pick the Russian.", options: ["Ты понима́ешь?", "Ты понима́ю?", "Ты понима́ет?", "Ты понима́ете?"],
    answer: "Ты понима́ешь?", note: "ты → -ешь." },
  { prompt: "“They speak Swedish.”", ask: "Pick the Russian.", options: ["Они́ говоря́т по-шве́дски.", "Они́ говори́т по-шве́дски.", "Они́ говоря́т шве́дский.", "Они́ говори́м по-шве́дски."],
    answer: "Они́ говоря́т по-шве́дски.", note: "они́ → говоря́т." },
  { prompt: "“I'm learning Russian.”", ask: "Pick the Russian.", options: ["Я учу́ ру́сский.", "Я у́чит ру́сский.", "Я учу́ по-ру́сски.", "Я у́чим ру́сский."],
    answer: "Я учу́ ру́сский.", note: "You learn a language (ру́сский), but speak по-ру́сски." },
  { prompt: "You didn't catch that. Say: “I don't understand.”", ask: "Pick the Russian.", options: ["Я не понима́ю.", "Я не зна́ю.", "Я не понима́ет.", "Я не говорю́."],
    answer: "Я не понима́ю.", note: "не goes right before the verb." },
];

const ABOUT_ME: CustomQuestion[] = [
  { prompt: "“I often read.”", ask: "Pick the Russian.", options: ["Я ча́сто чита́ю.", "Я чита́ю ча́сто ча́сто.", "Ча́сто я чита́ет.", "Я ча́сто чита́ет."],
    answer: "Я ча́сто чита́ю.", note: "How-often words usually go before the verb." },
  { prompt: "“She always works.”", ask: "Pick the Russian.", options: ["Она́ всегда́ рабо́тает.", "Она́ всегда́ рабо́таю.", "Она́ всегда́ рабо́тают.", "Она́ иногда́ рабо́тает."],
    answer: "Она́ всегда́ рабо́тает.", note: "она́ → -ет." },
  { prompt: "“What are you doing now?” (to a friend)", ask: "Pick the Russian.", options: ["Что ты сейча́с де́лаешь?", "Что ты сейча́с де́лаю?", "Что ты всегда́ де́лаешь?", "Кто ты сейча́с де́лаешь?"],
    answer: "Что ты сейча́с де́лаешь?", note: "сейча́с = now." },
  { prompt: "“I write badly.”", ask: "Pick the Russian.", options: ["Я пло́хо пишу́.", "Я пло́хо пи́шет.", "Я хорошо́ пишу́.", "Я пло́хо писа́ть."],
    answer: "Я пло́хо пишу́.", note: "писа́ть → я пишу́." },
  { prompt: "“Sometimes we watch films.”", ask: "Pick the Russian.", options: ["Иногда́ мы смо́трим фи́льмы.", "Иногда́ мы смотрю́ фи́льмы.", "Всегда́ мы смо́трим фи́льмы.", "Иногда́ мы смо́трят фи́льмы."],
    answer: "Иногда́ мы смо́трим фи́льмы.", note: "мы → смо́трим." },
  { prompt: "A teacher asks: Есть вопро́сы? You have one.", ask: "What do you say?", options: ["Да, у меня́ есть вопро́с.", "Да, у меня́ есть отве́т.", "Нет, спаси́бо.", "Да, я вопро́с."],
    answer: "Да, у меня́ есть вопро́с.", note: "“Are there questions?” — “Yes, I have a question.”" },
];

export const WEEK5_DAYS: Day[] = [
  {
    n: 25,
    week: 5,
    title: "I work, you read",
    subtitle: "Your first verbs, and one pattern that fits hundreds of them.",
    glyph: "Ю",
    stage: "What do you do?",
    milestone: { title: "You can use verbs with every person", detail: "я чита́ю · ты чита́ешь · они́ чита́ют" },
    steps: [
      { id: "pattern", title: "The -ать pattern", detail: "-ю, -ешь, -ет …", minutes: 4, tier: 10, type: "grammar", items: [],
        intro: "Russian verbs change their ending for each person. Good news: most follow one of two patterns.",
        grammar: {
          body: [
            "Take the dictionary form (рабо́тать), drop -ть, and add the ending for the person: я рабо́таю, ты рабо́таешь, она́ рабо́тает.",
            "Almost every verb ending in -ать or -ять works like this. The stress stays where it is.",
            "To say “not”, put не right before the verb: я не зна́ю.",
          ],
          table: conjTable(["рабо́тать", "чита́ть", "знать"]),
          rule: "я -ю · ты -ешь · он/она́ -ет · мы -ем · вы -ете · они́ -ют",
        } },
      { id: "words", title: "New words", detail: "рабо́тать · знать · чита́ть", minutes: 4, tier: 10, type: "cards", items: d25,
        intro: "Seven verbs and one noun." },
      { id: "forms", title: "Which form fits?", detail: "Match the person", minutes: 4, tier: 10, type: "quiz", items: [], questions: FORMS_1, count: 8,
        intro: "Pick the right ending for each person." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 20, type: "quiz", items: d25, count: 6,
        intro: "Read each verb and pick its meaning." },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d25, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "Verbs on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("знать", "делать", "читать", "думать", "работа"), count: 5, intro: "Type the Russian word." },
      { id: "mixed", title: "Mixed review", detail: "Verbs, numbers and money", minutes: 6, tier: 45, type: "quiz",
        items: [...d25, ...w("деньги", "сколько?", "дорого", "двадцать", "сто")], count: 10, intro: "Today's verbs mixed with last week." },
    ],
  },
  {
    n: 26,
    week: 5,
    title: "Do you speak Russian?",
    subtitle: "The second verb pattern, and talking about languages.",
    glyph: "И",
    stage: "What do you do?",
    milestone: { title: "You can say which languages you speak", detail: "Я немно́го говорю́ по-ру́сски." },
    steps: [
      { id: "pattern", title: "The -ить pattern", detail: "-ю, -ишь, -ит …", minutes: 4, tier: 10, type: "grammar", items: [],
        intro: "The second pattern looks like the first, with и instead of е.",
        grammar: {
          body: [
            "Verbs ending in -ить (and some in -еть) take и: говорю́, говори́шь, говори́т, говори́м, говори́те, говоря́т.",
            "Some move the stress after я (учу́, у́чишь), and люби́ть adds an л: люблю́. Listen to them and they stick.",
            "писа́ть is irregular: пишу́, пи́шешь, пи́шет. Learn it as it is.",
            "Languages: you learn ру́сский, but you speak по-ру́сски (“in Russian”).",
          ],
          table: conjTable(["говори́ть", "люби́ть", "писа́ть"]),
          rule: "я -ю/-у · ты -ишь · он/она́ -ит · мы -им · вы -ите · они́ -ят/-ат",
        } },
      { id: "words", title: "New words", detail: "говори́ть · по-ру́сски", minutes: 5, tier: 10, type: "cards", items: d26,
        intro: "Five verbs and the words for languages." },
      { id: "forms", title: "Which form fits?", detail: "Match the person", minutes: 4, tier: 10, type: "quiz", items: [], questions: FORMS_2, count: 8,
        intro: "Pick the right form for each person." },
      { id: "languages", title: "In real life", detail: "Talking about languages", minutes: 4, tier: 20, type: "quiz", items: [], questions: LANGUAGES,
        intro: "Pick the sentence that says it right." },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d26, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "Verbs on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("учить", "любить", "писать", "по-русски", "говорить"), count: 5, intro: "Type the Russian. The hyphen in по-ру́сски counts." },
      { id: "mixed", title: "Mixed review", detail: "All the verbs", minutes: 6, tier: 45, type: "quiz", items: [...d25, ...d26], count: 10,
        intro: "Every verb so far, shuffled." },
    ],
  },
  {
    n: 27,
    week: 5,
    title: "What do you do?",
    subtitle: "Jobs, and the easiest answer in Russian: Я инжене́р.",
    glyph: "П",
    stage: "What do you do?",
    milestone: { title: "You can say what you do for work", detail: "Кем вы рабо́таете? — Я программи́ст." },
    steps: [
      { id: "jobs", title: "Talking about jobs", detail: "No “am”, no “a”", minutes: 3, tier: 10, type: "grammar", items: [],
        intro: "Answering “what do you do?” is pleasantly short in Russian.",
        grammar: {
          body: [
            "To say your job, just put it after я: Я инжене́р. Он води́тель. There is no word for “am” and no “a”.",
            "Some jobs have a separate word for women: учи́тель / учи́тельница. Many don't: она́ инжене́р, она́ юри́ст.",
            "The question is Кем вы рабо́таете? (literally “as whom do you work?”). To a friend: Кем ты рабо́таешь?",
          ],
          examples: [
            { ru: "— Кем вы рабо́таете?", tr: "kyem vy ra-BO-ta-i-tye?", en: "What do you do?" },
            { ru: "— Я программи́ст. А вы?", tr: "ya pra-gra-MEEST. a vy?", en: "I'm a programmer. And you?" },
            { ru: "— Я учи́тельница.", tr: "ya u-CHEE-til'-ni-tsa", en: "I'm a teacher." },
          ],
          rule: "Я + job. That's the whole sentence.",
        } },
      { id: "words", title: "New words", detail: "инжене́р · учи́тель · води́тель", minutes: 5, tier: 10, type: "cards", items: d27,
        intro: "Fourteen jobs. Many look like English." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 10, type: "quiz", items: d27, count: 8,
        intro: "Read each job and pick what it means." },
      { id: "jobs-quiz", title: "Who's who?", detail: "Jobs in real life", minutes: 4, tier: 20, type: "quiz", items: [], questions: JOBS,
        intro: "Pick the right job or the right sentence." },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d27, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "Jobs on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("юрист", "инженер", "учитель", "водитель", "менеджер"), count: 5, intro: "Type the Russian word." },
      { id: "mixed", title: "Mixed review", detail: "Jobs and verbs", minutes: 6, tier: 45, type: "quiz", items: [...d27, ...verbs], count: 10,
        intro: "Jobs and verbs, shuffled." },
    ],
  },
  {
    n: 28,
    week: 5,
    title: "At work and school",
    subtitle: "Office, lessons and homework, and asking questions with your voice.",
    glyph: "?",
    stage: "What do you do?",
    milestone: { title: "You can ask yes/no questions", detail: "Вы рабо́таете? ↗ · Ты зна́ешь? ↗" },
    steps: [
      { id: "questions", title: "Questions with your voice", detail: "Same words, rising tone", minutes: 3, tier: 10, type: "grammar", items: [],
        intro: "Russian has no “do” for questions. You ask with your voice.",
        grammar: {
          body: [
            "Вы рабо́таете. is “You work.” Вы рабо́таете? is “Do you work?” The words are the same; only the melody changes.",
            "Raise your voice sharply on the word you're asking about, then drop. Ты зна́ешь? rises on зна́.",
            "With a question word (что, где, кто, кем) the voice stays mostly flat: Что ты де́лаешь?",
          ],
          examples: [
            { ru: "Вы рабо́таете сейча́с?", tr: "vy ra-BO-ta-i-tye si-CHAS?", en: "Are you working now?" },
            { ru: "Ты понима́ешь вопро́с?", tr: "ty pa-ni-MA-ish vap-ROS?", en: "Do you understand the question?" },
            { ru: "Что зна́чит э́то сло́во?", tr: "shto ZNA-chit E-ta SLO-va?", en: "What does this word mean?" },
          ],
          rule: "Statement → question: same words, rising voice.",
        } },
      { id: "words", title: "New words", detail: "о́фис · уро́к · вопро́с", minutes: 4, tier: 10, type: "cards", items: d28,
        intro: "Words for work and school." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 10, type: "quiz", items: d28, count: 6,
        intro: "Read each word and pick what it means." },
      { id: "languages", title: "In real life", detail: "Questions and answers", minutes: 4, tier: 20, type: "quiz", items: [], questions: LANGUAGES, count: 4,
        intro: "A few more situations." },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d28, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "On the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("офис", "урок", "вопрос", "ответ", "слово"), count: 5, intro: "Type the Russian word." },
      { id: "mixed", title: "Mixed review", detail: "Days 27 and 28", minutes: 6, tier: 45, type: "quiz", items: [...d27, ...d28], count: 10,
        intro: "Yesterday and today, shuffled." },
    ],
  },
  {
    n: 29,
    week: 5,
    title: "Often, sometimes, always",
    subtitle: "Saying how often and how well, and talking about yourself.",
    glyph: "В",
    stage: "What do you do?",
    milestone: { title: "You can talk about yourself for a minute", detail: "Я инжене́р. Я ча́сто чита́ю. Я немно́го говорю́ по-ру́сски." },
    steps: [
      { id: "adverbs", title: "Where the little words go", detail: "Before the verb", minutes: 3, tier: 10, type: "grammar", items: [],
        intro: "These words never change. You only need to know where to put them.",
        grammar: {
          body: [
            "Words for how often and how well usually go right before the verb: я ча́сто чита́ю, он пло́хо пи́шет, мы иногда́ рабо́таем.",
            "сейча́с (now) and иногда́ (sometimes) can also start the sentence: Сейча́с я рабо́таю.",
            "Put a few together and you have a self-introduction.",
          ],
          examples: [
            { ru: "Меня́ зову́т А́нна. Я дизайне́р.", tr: "mi-NYA za-VUT AN-na. ya di-zay-NER", en: "My name is Anna. I'm a designer." },
            { ru: "Я мно́го рабо́таю.", tr: "ya MNO-ga ra-BO-ta-yu", en: "I work a lot." },
            { ru: "Я немно́го говорю́ по-ру́сски.", tr: "ya nim-NO-ga ga-va-RYU pa-RU-ski", en: "I speak a little Russian." },
            { ru: "Я ча́сто чита́ю и иногда́ смотрю́ фи́льмы.", tr: "ya CHA-sta chi-TA-yu i i-nag-DA smat-RYU FEEL'-my", en: "I often read and sometimes watch films." },
          ],
          rule: "ча́сто, всегда́, иногда́, пло́хо, немно́го → right before the verb.",
        } },
      { id: "words", title: "New words", detail: "ча́сто · иногда́ · всегда́", minutes: 3, tier: 10, type: "cards", items: d29,
        intro: "Six small words that make sentences come alive." },
      { id: "about", title: "Build it right", detail: "Pick the right sentence", minutes: 4, tier: 10, type: "quiz", items: [], questions: ABOUT_ME,
        intro: "Pick the sentence that says it right." },
      { id: "forms", title: "Which form fits?", detail: "Both patterns", minutes: 4, tier: 20, type: "quiz", items: [], questions: FORMS_ALL, count: 8,
        intro: "Verb forms from the whole week." },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: [...d29, ...d25], count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "On the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("часто", "сейчас", "всегда", "иногда", "плохо"), count: 5, intro: "Type the Russian word." },
      { id: "mixed", title: "Mixed review", detail: "The whole week", minutes: 6, tier: 45, type: "quiz", items: week5Words, count: 12,
        intro: "Every word from the week, shuffled." },
    ],
  },
  {
    n: 30,
    week: 5,
    check: true,
    title: "Week 5 check",
    subtitle: "Five short parts. Pass each with 66 %, just like the real TORFL exam.",
    glyph: "Ч",
    stage: "What do you do?",
    milestone: { title: "Week 5 complete: you can talk about work and languages", detail: "Two verb patterns · jobs · how often" },
    steps: [
      { id: "words", part: "Words", reviewDays: [25, 26, 28, 29], title: "Words", detail: "See it, pick the meaning", minutes: 3, tier: 10,
        type: "quiz", items: [...d25, ...d26, ...d28, ...d29], count: 8, intro: "Part 1 of 5. Pick what each word means." },
      { id: "forms", part: "Verb forms", reviewDays: [25, 26], title: "Verb forms", detail: "Match the person", minutes: 3, tier: 10,
        type: "quiz", items: [], questions: FORMS_ALL, count: 8, intro: "Part 2 of 5. Pick the right form." },
      { id: "jobs", part: "Jobs", reviewDays: [27], title: "Jobs", detail: "Who's who?", minutes: 3, tier: 10,
        type: "quiz", items: [], questions: JOBS, count: 5, intro: "Part 3 of 5. Pick the right job or sentence." },
      { id: "listening", part: "Listening", reviewDays: [25, 26, 27], title: "Listening", detail: "Hear it, find it", minutes: 3, tier: 10,
        type: "listen", items: [...verbs, ...d27], count: 6, intro: "Part 4 of 5. Listen and pick what you heard." },
      { id: "real-life", part: "In real life", reviewDays: [26, 29], title: "In real life", detail: "Pick the right sentence", minutes: 3, tier: 10,
        type: "quiz", items: [], questions: [...LANGUAGES, ...ABOUT_ME], count: 6, intro: "Part 5 of 5. What would you say?" },
    ],
  },
];

export const WEEK5: Week = {
  n: 5,
  title: "What do you do?",
  subtitle: "Jobs, languages and your first verbs.",
  days: [25, 26, 27, 28, 29, 30],
};
