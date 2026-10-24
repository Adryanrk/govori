// Week 3: Family (days 13–18).
// у меня́ есть, my/your/our, his/her/their, plurals, talking about people.
import { W } from "./build";
import type { CustomQuestion, Day, Week, Word } from "./types";

export const WEEK3_WORDS: Word[] = [
  // Day 13
  W("семья́", "sim'-YA", "family"),
  W("мать", "mat'", "mother"),
  W("оте́ц", "a-TYETS", "father"),
  W("брат", "brat", "brother"),
  W("сестра́", "sis-TRA", "sister"),
  W("сын", "syn", "son"),
  W("дочь", "doch'", "daughter"),
  W("роди́тели", "ra-DEE-ti-li", "parents"),
  W("у меня́ есть", "u mi-NYA yest'", "I have"),
  W("у тебя́ есть?", "u ti-BYA yest'", "do you have?"),
  // Day 14
  W("моя́", "ma-YA", "my (she-word)"),
  W("моё", "ma-YO", "my (it-word)"),
  W("мои́", "ma-EE", "my (plural)"),
  W("твой", "tvoy", "your (he-word, friendly)"),
  W("твоя́", "tva-YA", "your (she-word, friendly)"),
  W("наш", "nash", "our"),
  W("ваш", "vash", "your (polite or plural)"),
  W("муж", "moosh", "husband"),
  W("жена́", "zhe-NA", "wife"),
  // Day 15
  W("его́", "yi-VO", "his"),
  W("её", "yi-YO", "her"),
  W("их", "ikh", "their"),
  W("ба́бушка", "BA-boosh-ka", "grandmother"),
  W("де́душка", "DYE-doosh-ka", "grandfather"),
  W("тётя", "TYO-tya", "aunt"),
  W("дя́дя", "DYA-dya", "uncle"),
  W("внук", "vnook", "grandson"),
  W("вну́чка", "VNOOCH-ka", "granddaughter"),
  W("ро́дственник", "ROT-stvin-nik", "relative"),
  // Day 16
  W("де́ти", "DYE-ti", "children"),
  W("ребёнок", "ri-BYO-nak", "child"),
  W("друзья́", "drooz'-YA", "friends"),
  W("ма́льчик", "MAL'-chik", "boy"),
  W("де́вочка", "DYE-vach-ka", "girl"),
  W("мужчи́на", "moo-SHCHEE-na", "man"),
  W("же́нщина", "ZHEN-shchi-na", "woman"),
  W("де́вушка", "DYE-voosh-ka", "young woman, girlfriend"),
  W("па́рень", "PA-rin'", "guy, boyfriend"),
  W("ко́шка", "KOSH-ka", "cat (female)"),
  // Day 17
  W("сосе́д", "sa-SYET", "neighbour (a man)"),
  W("сосе́дка", "sa-SYET-ka", "neighbour (a woman)"),
  W("все", "fsye", "everyone"),
  W("вме́сте", "VMYES-tye", "together"),
  W("то́же", "TO-zhe", "also, too"),
  W("о́чень", "O-chen'", "very"),
  W("и́мя", "EE-mya", "first name"),
  W("фами́лия", "fa-MEE-li-ya", "surname"),
];

const w = (...ru: string[]) => ru.map((s) => `w-${s}`);

const d13 = w("семья", "мать", "отец", "брат", "сестра", "сын", "дочь", "родители", "у меня есть", "у тебя есть?");
const d14 = w("моя", "моё", "мои", "твой", "твоя", "наш", "ваш", "муж", "жена");
const d15 = w("его", "её", "их", "бабушка", "дедушка", "тётя", "дядя", "внук", "внучка", "родственник");
const d16 = w("дети", "ребёнок", "друзья", "мальчик", "девочка", "мужчина", "женщина", "девушка", "парень", "кошка");
const d17 = w("сосед", "соседка", "все", "вместе", "тоже", "очень", "имя", "фамилия");
export const week3Words = [...d13, ...d14, ...d15, ...d16, ...d17];

const MY = ["мой", "моя́", "моё", "мои́"];
const P = (noun: string, answer: string, note: string, options = MY): CustomQuestion => ({
  prompt: `___ ${noun}`,
  ask: "Which word fits?",
  options,
  answer,
  say: `${answer} ${noun}`,
  note,
});

const POSSESSIVE: CustomQuestion[] = [
  P("брат", "мой", "брат is он, so мой брат."),
  P("сестра́", "моя́", "сестра́ is она́, so моя́ сестра́."),
  P("окно́", "моё", "окно́ is оно́, so моё окно́."),
  P("роди́тели", "мои́", "More than one, so мои́ роди́тели."),
  P("па́па", "мой", "A man is always он: мой па́па."),
  P("семья́", "моя́", "семья́ ends in -я, so моя́ семья́."),
  P("письмо́", "моё", "письмо́ is оно́, so моё письмо́."),
  P("де́ти", "мои́", "More than one, so мои́ де́ти."),
  P("дом", "наш", "Our house: наш дом.", ["наш", "на́ша", "на́ше", "на́ши"]),
  P("ко́мната", "на́ша", "Our room: на́ша ко́мната.", ["наш", "на́ша", "на́ше", "на́ши"]),
  P("друг", "твой", "Your friend (to a friend): твой друг.", ["твой", "твоя́", "твоё", "твои́"]),
  P("кни́га", "твоя́", "Your book (to a friend): твоя́ кни́га.", ["твой", "твоя́", "твоё", "твои́"]),
];

const PL = (sg: string, answer: string, wrong: string, note: string): CustomQuestion => ({
  prompt: sg,
  ask: "Which is the plural?",
  options: [answer, wrong],
  answer,
  say: answer,
  note,
});

const PLURAL: CustomQuestion[] = [
  PL("стол", "столы́", "столи́", "Add -ы. The stress moves to the end: столы́."),
  PL("кни́га", "кни́ги", "кни́гы", "After г, к, х, ж, ш, ч, щ you write и, never ы."),
  PL("ко́мната", "ко́мнаты", "ко́мнати", "-а becomes -ы."),
  PL("студе́нт", "студе́нты", "студе́нти", "Add -ы."),
  PL("ру́чка", "ру́чки", "ру́чкы", "After к you write и: ру́чки."),
  PL("ключ", "ключи́", "ключы́", "After ч you write и: ключи́."),
  PL("окно́", "о́кна", "о́кны", "-о becomes -а, and the stress moves: о́кна."),
  PL("письмо́", "пи́сьма", "пи́сьмы", "-о becomes -а: пи́сьма."),
  PL("ребёнок", "де́ти", "ребёнки", "One of the irregular ones: ребёнок, де́ти."),
  PL("друг", "друзья́", "дру́ги", "Irregular: друг, друзья́."),
  PL("ма́ма", "ма́мы", "ма́ми", "-а becomes -ы."),
  PL("сестра́", "сёстры", "сестри́", "Irregular stress: сёстры. Note the ё."),
];

const FAMILY_TALK: CustomQuestion[] = [
  { prompt: "Someone asks: У тебя́ есть брат?", ask: "You have one. What do you answer?", options: ["Да, есть.", "Да, моя́.", "Нет, есть.", "Я брат."],
    answer: "Да, есть.", note: "Yes, I do. Russians answer with есть." },
  { prompt: "You show a photo of your sister.", ask: "What do you say?", options: ["Э́то моя́ сестра́.", "Э́то мой сестра́.", "Э́то моё сестра́.", "Э́то мои́ сестра́."],
    answer: "Э́то моя́ сестра́.", note: "сестра́ is она́, so моя́." },
  { prompt: "You want to know a man's name.", ask: "What do you ask?", options: ["Как его́ зову́т?", "Как её зову́т?", "Как их зову́т?", "Как тебя́ зову́т?"],
    answer: "Как его́ зову́т?", note: "его́ = him. Как его́ зову́т? What's his name?" },
  { prompt: "You want to know a woman's name.", ask: "What do you ask?", options: ["Как её зову́т?", "Как его́ зову́т?", "Как вас зову́т?", "Кто она́?"],
    answer: "Как её зову́т?", note: "её = her. Как её зову́т? What's her name?" },
  { prompt: "Your friend says: Я из Шве́ции. You are too.", ask: "What do you say?", options: ["Я то́же.", "Я о́чень.", "Я вме́сте.", "Я все."],
    answer: "Я то́же.", note: "Me too: я то́же." },
  { prompt: "A friend introduces you to his parents.", ask: "What do you say?", options: ["О́чень прия́тно!", "Я то́же.", "Да, есть.", "Вот они́."],
    answer: "О́чень прия́тно!", note: "Nice to meet you!" },
];

export const WEEK3_DAYS: Day[] = [
  {
    n: 13,
    week: 3,
    title: "My family",
    subtitle: "Mother, father, brothers and sisters, and how to say “I have”.",
    glyph: "С",
    stage: "Family",
    milestone: { title: "You can name your family", detail: "У меня́ есть брат и сестра́." },
    steps: [
      { id: "have", title: "“I have” the Russian way", detail: "у меня́ есть", minutes: 3, tier: 10, type: "grammar", items: [],
        intro: "Russian doesn't really have a verb for “to have”. It says it another way.",
        grammar: {
          body: [
            "To say “I have”, Russians say у меня́ есть, literally “by me there is”.",
            "The answer to a have-question is short: Да, есть (yes, I do) or Нет (no).",
            "Мать and оте́ц are a bit formal, like “mother” and “father”. At home people say ма́ма and па́па.",
          ],
          examples: [
            { ru: "У меня́ есть брат.", tr: "u mi-NYA yest' brat", en: "I have a brother." },
            { ru: "У тебя́ есть сестра́? — Да, есть.", tr: "u ti-BYA yest' sis-TRA? da, yest'", en: "Do you have a sister? Yes, I do." },
            { ru: "У меня́ есть сын и дочь.", tr: "u mi-NYA yest' syn i doch'", en: "I have a son and a daughter." },
          ],
          rule: "У меня́ есть + the thing = I have it.",
        } },
      { id: "words", title: "New words", detail: "семья́ · брат · сестра́", minutes: 5, tier: 10, type: "cards", items: d13,
        intro: "Your closest family, and the phrase to talk about them." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 10, type: "quiz", items: d13, count: 6,
        intro: "Read each one and pick what it means." },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d13, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "talk", title: "In real life", detail: "Answer like a Russian", minutes: 3, tier: 20, type: "quiz", items: [], questions: FAMILY_TALK.slice(0, 2), count: 2,
        intro: "Two quick situations." },
      { id: "type", title: "Type it", detail: "Family on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("брат", "сестра", "сын", "дочь", "мать", "семья"), count: 6, intro: "Type the Russian word." },
      { id: "mixed", title: "Mixed review", detail: "Today and week 2", minutes: 6, tier: 45, type: "quiz",
        items: [...d13, ...w("он", "она", "мы", "они", "кто", "где?")], count: 10, intro: "Today's words mixed with last week's." },
    ],
  },
  {
    n: 14,
    week: 3,
    title: "My, your, our",
    subtitle: "мой or моя́? The word for “my” follows the gender of the thing.",
    glyph: "М",
    stage: "Family",
    milestone: { title: "You can say whose something is", detail: "мой брат · моя́ сестра́ · мои́ роди́тели" },
    steps: [
      { id: "possessive", title: "мой, моя́, моё, мои́", detail: "Match the thing, not the owner", minutes: 4, tier: 10, type: "grammar", items: [],
        intro: "The gender rule from week 2 pays off right away.",
        grammar: {
          body: [
            "The word for “my” changes to match the thing you own: мой for он, моя́ for она́, моё for оно́, мои́ for more than one.",
            "It follows the thing, not you. A woman says мой брат too, because брат is он.",
          ],
          table: {
            head: ["", "он", "она́", "оно́", "plural"],
            rows: [
              ["my", "мой", "моя́", "моё", "мои́"],
              ["your (friend)", "твой", "твоя́", "твоё", "твои́"],
              ["our", "наш", "на́ша", "на́ше", "на́ши"],
              ["your (polite)", "ваш", "ва́ша", "ва́ше", "ва́ши"],
            ],
          },
          rule: "Look at the thing: он = мой, она́ = моя́, оно́ = моё, plural = мои́.",
        } },
      { id: "words", title: "New words", detail: "моя́ · твой · наш · муж", minutes: 5, tier: 10, type: "cards", items: d14,
        intro: "The new forms of “my”, “your” and “our”, plus husband and wife." },
      { id: "which", title: "Which word fits?", detail: "мой, моя́, моё or мои́", minutes: 4, tier: 10, type: "quiz", items: [], questions: POSSESSIVE, count: 10,
        intro: "Pick the right form. Check the gender of the thing first." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 20, type: "quiz", items: d14, count: 6,
        intro: "Read each one and pick what it means." },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: [...d13, ...d14], count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "Short words on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("наш", "ваш", "муж", "жена", "твой"), count: 5, intro: "Type the Russian word." },
      { id: "mixed", title: "Mixed review", detail: "Days 13 and 14", minutes: 6, tier: 45, type: "quiz", items: [...d13, ...d14], count: 10,
        intro: "Yesterday and today, shuffled." },
    ],
  },
  {
    n: 15,
    week: 3,
    title: "His, her, their",
    subtitle: "The easy ones: его́, её and их never change.",
    glyph: "Е",
    stage: "Family",
    milestone: { title: "You can talk about other people's families", detail: "его́ сестра́ · её брат · их дом" },
    steps: [
      { id: "his-her", title: "его́, её, их", detail: "Three words that never change", minutes: 3, tier: 10, type: "grammar", items: [],
        intro: "After yesterday, some good news.",
        grammar: {
          body: [
            "His, her and their are его́, её and их. Unlike мой, they never change, whatever comes after them.",
            "Его́ is said yi-VO: here the Г sounds like В, just as in сего́дня.",
          ],
          examples: [
            { ru: "Э́то его́ сестра́.", tr: "E-ta yi-VO sis-TRA", en: "This is his sister." },
            { ru: "Э́то её брат.", tr: "E-ta yi-YO brat", en: "This is her brother." },
            { ru: "Э́то их де́ти.", tr: "E-ta ikh DYE-ti", en: "These are their children." },
          ],
          rule: "его́, её, их stay the same with он, она́, оно́ and plurals.",
        } },
      { id: "words", title: "New words", detail: "ба́бушка · де́душка · тётя", minutes: 5, tier: 10, type: "cards", items: d15,
        intro: "The rest of the family tree." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 10, type: "quiz", items: d15, count: 6,
        intro: "Read each one and pick what it means." },
      { id: "dialogue", title: "Looking at a photo", detail: "A short dialogue", minutes: 3, tier: 20, type: "grammar", items: [],
        intro: "Play each line and read along.",
        grammar: {
          body: ["Two friends look at a family photo:"],
          examples: [
            { ru: "— Кто э́то?", tr: "kto E-ta", en: "Who is this?" },
            { ru: "— Э́то моя́ ба́бушка, а э́то мой де́душка.", tr: "E-ta ma-YA BA-boosh-ka, a E-ta moy DYE-doosh-ka", en: "This is my grandmother, and this is my grandfather." },
            { ru: "— А кто э́то?", tr: "a kto E-ta", en: "And who is this?" },
            { ru: "— Э́то мой дя́дя и его́ жена́.", tr: "E-ta moy DYA-dya i yi-VO zhe-NA", en: "This is my uncle and his wife." },
          ],
          rule: "Мой дя́дя, but его́ жена́: его́ doesn't change for she-words.",
        } },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d15, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "Family on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("его", "их", "внук", "тётя", "дядя"), count: 5, intro: "Type the Russian. ё can be typed as е." },
      { id: "mixed", title: "Mixed review", detail: "The whole family", minutes: 6, tier: 45, type: "quiz", items: [...d13, ...d14, ...d15], count: 10,
        intro: "All the family words so far." },
    ],
  },
  {
    n: 16,
    week: 3,
    title: "More than one",
    subtitle: "Plurals with -ы and -и, the spelling rule, and a few irregulars.",
    glyph: "Ы",
    stage: "Family",
    milestone: { title: "You can make most nouns plural", detail: "столы́ · кни́ги · о́кна · де́ти" },
    steps: [
      { id: "plural", title: "Making plurals", detail: "-ы, -и and -а", minutes: 4, tier: 10, type: "grammar", items: [],
        intro: "Most plurals follow a few simple patterns.",
        grammar: {
          body: [
            "Он- and она́-words usually end in -ы in the plural. Оно́-words change -о to -а.",
            "The spelling rule: after г, к, х, ж, ш, ч, щ you always write и, never ы. So кни́га becomes кни́ги.",
            "A few common words are irregular, and the stress sometimes moves. Learn those as you meet them.",
          ],
          table: {
            head: ["Singular", "Plural", "Pattern"],
            rows: [
              ["стол · ко́мната", "столы́ · ко́мнаты", "-ы"],
              ["кни́га · ключ", "кни́ги · ключи́", "-и after г к х ж ш ч щ"],
              ["окно́ · письмо́", "о́кна · пи́сьма", "-о becomes -а"],
              ["ребёнок · друг · челове́к", "де́ти · друзья́ · лю́ди", "irregular"],
            ],
          },
          rule: "Mostly -ы. After г к х ж ш ч щ, write -и. Оно́-words take -а.",
        } },
      { id: "words", title: "New words", detail: "де́ти · друзья́ · ма́льчик", minutes: 5, tier: 10, type: "cards", items: d16,
        intro: "People of all ages, including two irregular plurals." },
      { id: "which", title: "Which is the plural?", detail: "-ы or -и?", minutes: 4, tier: 10, type: "quiz", items: [], questions: PLURAL, count: 10,
        intro: "Pick the right plural. Watch the spelling rule." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 20, type: "quiz", items: d16, count: 6,
        intro: "Read each one and pick what it means." },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d16, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "Plurals on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("дети", "друзья", "кошка", "мальчик", "парень"), count: 5, intro: "Type the Russian word." },
      { id: "mixed", title: "Mixed review", detail: "Days 15 and 16", minutes: 6, tier: 45, type: "quiz", items: [...d15, ...d16], count: 10,
        intro: "Yesterday and today, shuffled." },
    ],
  },
  {
    n: 17,
    week: 3,
    title: "Who's who",
    subtitle: "Names, neighbours, and saying “me too”.",
    glyph: "И",
    stage: "Family",
    milestone: { title: "You can describe the people around you", detail: "Как его́ зову́т? · Я то́же." },
    steps: [
      { id: "names", title: "His name, her name", detail: "Как его́ зову́т?", minutes: 3, tier: 10, type: "grammar", items: [],
        intro: "You already know Меня́ зову́т. Now for everyone else.",
        grammar: {
          body: [
            "The name phrase changes with the person: меня́ зову́т (me), тебя́ зову́т (you), его́ зову́т (him), её зову́т (her).",
            "И́мя is your first name and фами́лия your surname. И́мя is an оно́-word, even though it ends in -я.",
            "То́же means “too”: Я то́же is “me too”.",
          ],
          examples: [
            { ru: "Как его́ зову́т? — Его́ зову́т Макс.", tr: "kak yi-VO za-VOOT? yi-VO za-VOOT maks", en: "What's his name? His name is Max." },
            { ru: "Как её зову́т? — Её зову́т А́нна.", tr: "kak yi-YO za-VOOT? yi-YO za-VOOT AN-na", en: "What's her name? Her name is Anna." },
            { ru: "Мы все вме́сте.", tr: "my fsye VMYES-tye", en: "We are all together." },
          ],
          rule: "меня́ / тебя́ / его́ / её + зову́т = my / your / his / her name is.",
        } },
      { id: "words", title: "New words", detail: "сосе́д · то́же · фами́лия", minutes: 4, tier: 10, type: "cards", items: d17,
        intro: "The last words of the family week." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 10, type: "quiz", items: d17, count: 6,
        intro: "Read each one and pick what it means." },
      { id: "talk", title: "In real life", detail: "Pick the right phrase", minutes: 4, tier: 20, type: "quiz", items: [], questions: FAMILY_TALK,
        intro: "Real moments with family and friends." },
      { id: "listen", title: "Listen and pick", detail: "The whole week", minutes: 3, tier: 20, type: "listen", items: week3Words, count: 8,
        intro: "Words from the whole week. Listen, then pick." },
      { id: "type", title: "Type it", detail: "Short words on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("тоже", "имя", "все", "сосед", "очень"), count: 5, intro: "Type the Russian word." },
      { id: "mixed", title: "Mixed review", detail: "The whole week", minutes: 6, tier: 45, type: "quiz", items: week3Words, count: 12,
        intro: "Every word from the family week." },
    ],
  },
  {
    n: 18,
    week: 3,
    check: true,
    title: "Week 3 check",
    subtitle: "Five short parts. Pass each with 66 %, just like the real TORFL exam.",
    glyph: "Я",
    stage: "Family",
    milestone: { title: "Week 3 complete: you can talk about your family", detail: "мой, моя́, моё · его́, её · plurals" },
    steps: [
      { id: "words", part: "Words", reviewDays: [13, 14, 15, 16, 17], title: "Words", detail: "See it, pick the meaning", minutes: 4, tier: 10,
        type: "quiz", items: week3Words, count: 10, intro: "Part 1 of 5. Pick what each word means." },
      { id: "possessive", part: "My, your, our", reviewDays: [14], title: "Which word fits?", detail: "мой, моя́, моё, мои́", minutes: 3, tier: 10,
        type: "quiz", items: [], questions: POSSESSIVE, count: 6, intro: "Part 2 of 5. Pick the right form." },
      { id: "plural", part: "Plurals", reviewDays: [16], title: "Which is the plural?", detail: "-ы or -и?", minutes: 3, tier: 10,
        type: "quiz", items: [], questions: PLURAL, count: 6, intro: "Part 3 of 5. Pick the plural." },
      { id: "listening", part: "Listening", reviewDays: [13, 15, 17], title: "Listening", detail: "Hear it, pick it", minutes: 3, tier: 10,
        type: "listen", items: week3Words, count: 6, intro: "Part 4 of 5. Listen and pick what you heard." },
      { id: "real-life", part: "In real life", reviewDays: [13, 17], title: "In real life", detail: "Pick the right phrase", minutes: 3, tier: 10,
        type: "quiz", items: [], questions: FAMILY_TALK, count: 6, intro: "Part 5 of 5. What would you say?" },
    ],
  },
];

export const WEEK3: Week = {
  n: 3,
  title: "Family",
  subtitle: "Family and friends, мой and моя́, plurals.",
  days: [13, 14, 15, 16, 17, 18],
};
