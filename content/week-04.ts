// Week 4: Numbers and money (days 19–24).
// 0–100 and 1000, prices, рубль/рубля́/рубле́й, paying at the kiosk.
import { W } from "./build";
import type { CustomQuestion, Day, Week, Word } from "./types";

export const WEEK4_WORDS: Word[] = [
  // Day 19
  W("ноль", "nol'", "zero"),
  W("оди́н", "a-DEEN", "one"),
  W("два", "dva", "two"),
  W("три", "tri", "three"),
  W("четы́ре", "chi-TY-ri", "four"),
  W("пять", "pyat'", "five"),
  W("шесть", "shest'", "six"),
  W("семь", "syem'", "seven"),
  W("во́семь", "VO-sim'", "eight"),
  W("де́вять", "DYE-vit'", "nine"),
  W("де́сять", "DYE-sit'", "ten"),
  // Day 20
  W("оди́ннадцать", "a-DEE-na-tsat'", "eleven"),
  W("двена́дцать", "dvi-NA-tsat'", "twelve"),
  W("трина́дцать", "tri-NA-tsat'", "thirteen"),
  W("четы́рнадцать", "chi-TYR-na-tsat'", "fourteen"),
  W("пятна́дцать", "pit-NA-tsat'", "fifteen"),
  W("два́дцать", "DVA-tsat'", "twenty"),
  W("три́дцать", "TREE-tsat'", "thirty"),
  W("со́рок", "SO-rak", "forty"),
  W("пятьдеся́т", "pi-di-SYAT", "fifty"),
  W("шестьдеся́т", "shiz-di-SYAT", "sixty"),
  W("се́мьдесят", "SYEM-di-sit", "seventy"),
  W("во́семьдесят", "VO-sim-di-sit", "eighty"),
  W("девяно́сто", "di-vi-NO-sta", "ninety"),
  W("сто", "sto", "a hundred"),
  W("ты́сяча", "TY-si-cha", "a thousand"),
  // Day 21
  W("ско́лько?", "SKOL'-ka", "how many? how much?"),
  W("ско́лько сто́ит?", "SKOL'-ka STO-it", "how much does it cost?"),
  W("сто́ит", "STO-it", "costs"),
  W("рубль", "rubl'", "rouble"),
  W("копе́йка", "ka-PYEY-ka", "kopeck"),
  W("де́ньги", "DYEN'-gi", "money"),
  W("дёшево", "DYO-shi-va", "cheap"),
  W("до́рого", "DO-ra-ga", "expensive"),
  W("мно́го", "MNO-ga", "a lot"),
  W("ма́ло", "MA-la", "a little, not much"),
  // Day 22
  W("ка́рта", "KAR-ta", "card, map"),
  W("нали́чные", "na-LEECH-ny-ye", "cash"),
  W("ка́сса", "KAS-sa", "checkout, till"),
  W("чек", "chek", "receipt"),
  W("сда́ча", "SDA-cha", "change (money back)"),
  W("кио́ск", "ki-OSK", "kiosk"),
  W("газе́та", "ga-ZYE-ta", "newspaper"),
  W("вода́", "va-DA", "water"),
  W("биле́т", "bi-LYET", "ticket"),
  W("но́мер", "NO-mir", "number"),
  W("вот, пожа́луйста", "vot, pa-ZHAL-sta", "here you are"),
];

const w = (...ru: string[]) => ru.map((s) => `w-${s}`);

const d19 = w("ноль", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять");
const d20 = w("одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "двадцать", "тридцать", "сорок",
  "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто", "сто", "тысяча");
const d21 = w("сколько?", "сколько стоит?", "стоит", "рубль", "копейка", "деньги", "дёшево", "дорого", "много", "мало");
const d22 = w("карта", "наличные", "касса", "чек", "сдача", "киоск", "газета", "вода", "билет", "номер", "вот, пожалуйста");
export const week4Words = [...d19, ...d20, ...d21, ...d22];
const numbers = [...d19, ...d20];

const N = (digits: string, answer: string, options: string[], note = ""): CustomQuestion => ({
  prompt: digits,
  ask: "How do you say it?",
  options,
  answer,
  say: answer,
  note: note || `${digits} = ${answer}`,
});

const DIGITS_10: CustomQuestion[] = [
  N("0", "ноль", ["ноль", "оди́н", "де́вять", "шесть"]),
  N("2", "два", ["два", "три", "де́сять", "оди́н"]),
  N("3", "три", ["три", "два", "пять", "де́сять"]),
  N("4", "четы́ре", ["четы́ре", "пять", "оди́н", "во́семь"]),
  N("5", "пять", ["пять", "четы́ре", "шесть", "во́семь"]),
  N("6", "шесть", ["шесть", "семь", "пять", "два"]),
  N("7", "семь", ["семь", "шесть", "де́вять", "три"]),
  N("8", "во́семь", ["во́семь", "семь", "де́сять", "четы́ре"]),
  N("9", "де́вять", ["де́вять", "де́сять", "пять", "шесть"]),
  N("10", "де́сять", ["де́сять", "де́вять", "два", "семь"]),
];

const DIGITS_100: CustomQuestion[] = [
  N("12", "двена́дцать", ["двена́дцать", "два́дцать", "оди́ннадцать", "трина́дцать"], "12 = двена́дцать: two-on-ten."),
  N("20", "два́дцать", ["два́дцать", "двена́дцать", "три́дцать", "два"], "20 = два́дцать: two tens."),
  N("15", "пятна́дцать", ["пятна́дцать", "пятьдеся́т", "четы́рнадцать", "пять"], "15 = пятна́дцать, 50 = пятьдеся́т."),
  N("40", "со́рок", ["со́рок", "четы́рнадцать", "четы́ре", "девяно́сто"], "40 is the odd one out: со́рок."),
  N("90", "девяно́сто", ["девяно́сто", "де́вять", "во́семьдесят", "сто"], "90 is irregular too: девяно́сто."),
  N("50", "пятьдеся́т", ["пятьдеся́т", "пятна́дцать", "шестьдеся́т", "пять"], "50 = пятьдеся́т: five tens."),
  N("21", "два́дцать оди́н", ["два́дцать оди́н", "двена́дцать", "оди́ннадцать", "два́дцать два"], "Just like English: twenty-one."),
  N("35", "три́дцать пять", ["три́дцать пять", "трина́дцать", "пятьдеся́т три", "два́дцать пять"], "Thirty + five."),
  N("48", "со́рок во́семь", ["со́рок во́семь", "во́семьдесят четы́ре", "четы́рнадцать", "со́рок шесть"], "Forty + eight."),
  N("77", "се́мьдесят семь", ["се́мьдесят семь", "се́мьдесят", "семь", "шестьдеся́т семь"], "Seventy + seven."),
  N("100", "сто", ["сто", "ты́сяча", "девяно́сто", "де́сять"]),
  N("1000", "ты́сяча", ["ты́сяча", "сто", "де́сять", "девяно́сто"]),
];

const R = (digits: string, answer: string, num: string, note: string): CustomQuestion => ({
  prompt: `${digits} ₽`,
  ask: "How do you say the price?",
  options: [`${num} рубль`, `${num} рубля́`, `${num} рубле́й`],
  answer,
  say: answer,
  note,
});

const ROUBLES: CustomQuestion[] = [
  R("1", "оди́н рубль", "оди́н", "1 takes рубль."),
  R("2", "два рубля́", "два", "2, 3 and 4 take рубля́."),
  R("4", "четы́ре рубля́", "четы́ре", "2, 3 and 4 take рубля́."),
  R("5", "пять рубле́й", "пять", "5 and up take рубле́й."),
  R("10", "де́сять рубле́й", "де́сять", "5 and up take рубле́й."),
  R("11", "оди́ннадцать рубле́й", "оди́ннадцать", "11 to 14 always take рубле́й."),
  R("21", "два́дцать оди́н рубль", "два́дцать оди́н", "The last word decides: оди́н, so рубль."),
  R("33", "три́дцать три рубля́", "три́дцать три", "The last word decides: три, so рубля́."),
  R("50", "пятьдеся́т рубле́й", "пятьдеся́т", "5 and up take рубле́й."),
  R("100", "сто рубле́й", "сто", "сто takes рубле́й."),
];

const KIOSK: CustomQuestion[] = [
  { prompt: "You want to know the price of a newspaper.", ask: "What do you ask?", options: ["Ско́лько сто́ит газе́та?", "Где газе́та?", "Что э́то зна́чит?", "Газе́та до́рого."],
    answer: "Ско́лько сто́ит газе́та?", note: "How much is the newspaper?" },
  { prompt: "The seller asks: Ка́рта и́ли нали́чные? (card or cash?) You want to pay by card.", ask: "What do you answer?", options: ["Ка́рта, пожа́луйста.", "Нали́чные, пожа́луйста.", "Сда́ча, пожа́луйста.", "Чек, пожа́луйста."],
    answer: "Ка́рта, пожа́луйста.", note: "Card, please." },
  { prompt: "You hand over the money.", ask: "What do you say?", options: ["Вот, пожа́луйста.", "Ско́лько?", "Мо́жно?", "Здесь."],
    answer: "Вот, пожа́луйста.", note: "Here you are." },
  { prompt: "A coffee costs 900 roubles. You think that's a lot.", ask: "What do you say?", options: ["До́рого!", "Дёшево!", "Ма́ло!", "Ноль!"],
    answer: "До́рого!", note: "Expensive!" },
  { prompt: "You want to buy one ticket.", ask: "What do you say?", options: ["Оди́н биле́т, пожа́луйста.", "Одна́ биле́т, пожа́луйста.", "Биле́т есть?", "Мно́го биле́т."],
    answer: "Оди́н биле́т, пожа́луйста.", note: "биле́т is он, so оди́н биле́т." },
  { prompt: "You would like your receipt.", ask: "What do you say?", options: ["Чек, пожа́луйста.", "Ка́сса, пожа́луйста.", "Сда́ча, пожа́луйста.", "Кио́ск, пожа́луйста."],
    answer: "Чек, пожа́луйста.", note: "Receipt, please." },
];

export const WEEK4_DAYS: Day[] = [
  {
    n: 19,
    week: 4,
    title: "0 to 10",
    subtitle: "The first numbers, and why “one” changes like мой.",
    glyph: "0",
    stage: "Numbers and money",
    milestone: { title: "You can count to ten", detail: "оди́н · два · три … де́сять" },
    steps: [
      { id: "one", title: "оди́н, одна́, одно́", detail: "One changes with gender", minutes: 3, tier: 10, type: "grammar", items: [],
        intro: "Numbers are mostly easy. One and two have a small twist.",
        grammar: {
          body: [
            "Оди́н (one) changes like мой: оди́н брат, одна́ сестра́, одно́ окно́.",
            "Два (two) becomes две for она́-words: два бра́та, две сестры́. The noun after 2, 3 and 4 also changes a little; you will see why in week 10.",
            "When you simply count, use оди́н and два.",
          ],
          table: {
            head: ["", "он", "она́", "оно́"],
            rows: [
              ["one", "оди́н стол", "одна́ ко́мната", "одно́ окно́"],
              ["two", "два стола́", "две ко́мнаты", "два окна́"],
            ],
          },
          rule: "Counting: оди́н, два, три. With she-words: одна́, две.",
        } },
      { id: "words", title: "New words", detail: "оди́н … де́сять", minutes: 4, tier: 10, type: "cards", items: d19,
        intro: "Zero to ten. Listen to each one." },
      { id: "digits", title: "Say the number", detail: "See it, pick the word", minutes: 4, tier: 10, type: "quiz", items: [], questions: DIGITS_10,
        intro: "Pick the Russian word for each number." },
      { id: "listen", title: "Listen and pick", detail: "Hear the number", minutes: 4, tier: 20, type: "listen", items: d19, count: 8,
        intro: "Listen to a number and pick it." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 20, type: "quiz", items: d19, count: 6,
        intro: "Read each number and pick its meaning." },
      { id: "type", title: "Type it", detail: "Numbers on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("два", "три", "пять", "семь", "десять", "один"), count: 6, intro: "Type the number in Russian." },
      { id: "mixed", title: "Mixed review", detail: "Numbers and family", minutes: 6, tier: 45, type: "quiz",
        items: [...d19, ...w("семья", "брат", "сестра", "дети", "друзья")], count: 10, intro: "Today's numbers mixed with last week's family." },
    ],
  },
  {
    n: 20,
    week: 4,
    title: "11 to 100",
    subtitle: "Two patterns cover almost everything up to a hundred.",
    glyph: "2",
    stage: "Numbers and money",
    milestone: { title: "You can say any number up to 100", detail: "два́дцать оди́н · со́рок во́семь · девяно́сто" },
    steps: [
      { id: "patterns", title: "Two patterns, two oddballs", detail: "-на́дцать and -дцать", minutes: 4, tier: 10, type: "grammar", items: [],
        intro: "Learn the patterns, and the rest builds itself.",
        grammar: {
          body: [
            "11 to 19 end in -надцать, which means “on ten”: оди́ннадцать is “one-on-ten”.",
            "20 and 30 end in -дцать (два́дцать, три́дцать), 50 to 80 end in -десят (пятьдеся́т). 40 and 90 are the odd ones out: со́рок and девяно́сто.",
            "Bigger numbers work like English: два́дцать оди́н is 21, со́рок во́семь is 48.",
          ],
          table: {
            head: ["", "Pattern", "Examples"],
            rows: [
              ["11–19", "-надцать", "оди́ннадцать · двена́дцать · пятна́дцать"],
              ["20, 30", "-дцать", "два́дцать · три́дцать"],
              ["50–80", "-десят", "пятьдеся́т · шестьдеся́т · се́мьдесят"],
              ["40, 90", "irregular", "со́рок · девяно́сто"],
            ],
          },
          rule: "Tens + ones, like English: три́дцать пять = 35.",
        } },
      { id: "words", title: "New words", detail: "оди́ннадцать … ты́сяча", minutes: 5, tier: 10, type: "cards", items: d20,
        intro: "Fifteen words, but really just the two patterns." },
      { id: "digits", title: "Say the number", detail: "See it, pick the word", minutes: 4, tier: 10, type: "quiz", items: [], questions: DIGITS_100, count: 10,
        intro: "Pick the Russian for each number. Watch 12 and 20, 15 and 50." },
      { id: "listen", title: "Listen and pick", detail: "Hear the number", minutes: 4, tier: 20, type: "listen", items: d20, count: 8,
        intro: "Listen to a number and pick it." },
      { id: "type", title: "Type it", detail: "Numbers on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("сто", "сорок", "двадцать", "тридцать", "пятнадцать"), count: 5, intro: "Type the number in Russian." },
      { id: "mixed", title: "Mixed review", detail: "0 to 1000", minutes: 6, tier: 45, type: "quiz", items: numbers, count: 12,
        intro: "Every number so far, shuffled." },
    ],
  },
  {
    n: 21,
    week: 4,
    title: "How much is it?",
    subtitle: "Prices, and the three forms of рубль.",
    glyph: "₽",
    stage: "Numbers and money",
    milestone: { title: "You can ask and understand prices", detail: "Ско́лько сто́ит? — Сто рубле́й." },
    steps: [
      { id: "roubles", title: "рубль, рубля́, рубле́й", detail: "The last number decides", minutes: 4, tier: 10, type: "grammar", items: [],
        intro: "One small pattern you will use every time you pay.",
        grammar: {
          body: [
            "After a number, рубль changes. Look at the last word of the number: 1 takes рубль, 2 to 4 take рубля́, everything else takes рубле́й.",
            "11 to 14 are the exception: they always take рубле́й.",
            "The same pattern works for many words. You will learn why in week 10. For now, learn the three forms.",
          ],
          table: {
            head: ["Number ends in", "Form", "Examples"],
            rows: [
              ["1 (not 11)", "рубль", "оди́н рубль · два́дцать оди́н рубль"],
              ["2, 3, 4 (not 12–14)", "рубля́", "два рубля́ · три́дцать три рубля́"],
              ["0, 5–20, and the rest", "рубле́й", "пять рубле́й · сто рубле́й"],
            ],
          },
          rule: "1 = рубль, 2–4 = рубля́, 5+ = рубле́й.",
        } },
      { id: "words", title: "New words", detail: "ско́лько сто́ит? · де́ньги", minutes: 4, tier: 10, type: "cards", items: d21,
        intro: "Everything you need to talk about prices." },
      { id: "prices", title: "Say the price", detail: "рубль, рубля́ or рубле́й?", minutes: 4, tier: 10, type: "quiz", items: [], questions: ROUBLES,
        intro: "Pick the right form for each price." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 20, type: "quiz", items: d21, count: 6,
        intro: "Read each one and pick what it means." },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d21, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "Money words on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("рубль", "деньги", "дорого", "много", "мало"), count: 5, intro: "Type the Russian word." },
      { id: "mixed", title: "Mixed review", detail: "Numbers and money", minutes: 6, tier: 45, type: "quiz", items: [...numbers, ...d21], count: 10,
        intro: "Numbers and money, shuffled." },
    ],
  },
  {
    n: 22,
    week: 4,
    title: "At the kiosk",
    subtitle: "Buying a ticket or a bottle of water, and paying by card.",
    glyph: "К",
    stage: "Numbers and money",
    milestone: { title: "You can buy something and pay", detail: "Ка́рта, пожа́луйста. · Вот, пожа́луйста." },
    steps: [
      { id: "dialogue", title: "Buying something", detail: "A dialogue at the kiosk", minutes: 3, tier: 10, type: "grammar", items: [],
        intro: "Play each line and read along. Then the words come next.",
        grammar: {
          body: ["A short scene at a kiosk. Notice how much you can already follow."],
          examples: [
            { ru: "— Здра́вствуйте! Ско́лько сто́ит вода́?", tr: "ZDRA-stvuy-tye! SKOL'-ka STO-it va-DA?", en: "Hello! How much is the water?" },
            { ru: "— Пятьдеся́т рубле́й.", tr: "pi-di-SYAT rub-LYEY", en: "Fifty roubles." },
            { ru: "— Ка́рта мо́жно?", tr: "KAR-ta MOZH-na?", en: "Can I pay by card?" },
            { ru: "— Коне́чно. Вот ваш чек.", tr: "ka-NYESH-na. vot vash chek", en: "Of course. Here's your receipt." },
            { ru: "— Спаси́бо!", tr: "spa-SEE-ba", en: "Thank you!" },
          ],
          rule: "Вот, пожа́луйста is what you say when you hand something over.",
        } },
      { id: "words", title: "New words", detail: "ка́рта · нали́чные · биле́т", minutes: 5, tier: 10, type: "cards", items: d22,
        intro: "Words for paying and buying." },
      { id: "read", title: "Read it", detail: "See the word, pick the meaning", minutes: 3, tier: 10, type: "quiz", items: d22, count: 6,
        intro: "Read each one and pick what it means." },
      { id: "kiosk", title: "What would you say?", detail: "Pick the right phrase", minutes: 4, tier: 20, type: "quiz", items: [], questions: KIOSK,
        intro: "Real moments at a kiosk or a till." },
      { id: "listen", title: "Listen and pick", detail: "Hear it, find it", minutes: 3, tier: 20, type: "listen", items: d22, count: 6,
        intro: "Listen, then pick what you heard." },
      { id: "type", title: "Type it", detail: "Shopping words on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("чек", "вода", "билет", "карта", "касса"), count: 5, intro: "Type the Russian word." },
      { id: "mixed", title: "Mixed review", detail: "Days 21 and 22", minutes: 6, tier: 45, type: "quiz", items: [...d21, ...d22], count: 10,
        intro: "Yesterday and today, shuffled." },
    ],
  },
  {
    n: 23,
    week: 4,
    title: "Numbers in real life",
    subtitle: "A practice day: hearing numbers fast, and prices on the go.",
    glyph: "9",
    stage: "Numbers and money",
    milestone: { title: "You can catch numbers when they're spoken", detail: "двена́дцать or два́дцать? · пятна́дцать or пятьдеся́т?" },
    steps: [
      { id: "ears", title: "Train your ears", detail: "Numbers that sound alike", minutes: 3, tier: 10, type: "grammar", items: [],
        intro: "No new words today. Just practice, so numbers stop being scary.",
        grammar: {
          body: [
            "Some pairs are easy to mix up when people speak fast. Listen for the ending: -на́дцать (teens) has its stress in the middle, -десят (tens) is longer.",
            "In shops you mostly hear the number and the word for roubles, often very quickly. Catch the first word, and the rest usually follows.",
          ],
          table: {
            head: ["Sounds like", "But is", "Listen for"],
            rows: [
              ["двена́дцать (12)", "два́дцать (20)", "-на- in the middle"],
              ["пятна́дцать (15)", "пятьдеся́т (50)", "-десят at the end"],
              ["четы́рнадцать (14)", "со́рок (40)", "со́рок is short"],
            ],
          },
          rule: "Teens have -на-. Tens don't.",
        } },
      { id: "listen", title: "Listen and pick", detail: "Every number", minutes: 4, tier: 10, type: "listen", items: numbers, count: 10,
        intro: "Listen to a number and pick it." },
      { id: "digits", title: "Say the number", detail: "Big and small numbers", minutes: 4, tier: 10, type: "quiz", items: [], questions: [...DIGITS_10, ...DIGITS_100], count: 10,
        intro: "Pick the Russian for each number." },
      { id: "prices", title: "Say the price", detail: "рубль, рубля́ or рубле́й?", minutes: 4, tier: 20, type: "quiz", items: [], questions: ROUBLES, count: 8,
        intro: "One more round of prices." },
      { id: "kiosk", title: "At the till", detail: "Pick the right phrase", minutes: 3, tier: 20, type: "quiz", items: [], questions: KIOSK, count: 4,
        intro: "A few situations from yesterday." },
      { id: "type", title: "Type it", detail: "Numbers on the keyboard", minutes: 8, tier: 45, type: "type",
        items: w("четыре", "восемь", "девять", "шесть", "сто", "сорок"), count: 6, intro: "Type the number in Russian." },
      { id: "mixed", title: "Mixed review", detail: "The whole week", minutes: 6, tier: 45, type: "quiz", items: week4Words, count: 12,
        intro: "Every word from the week, shuffled." },
    ],
  },
  {
    n: 24,
    week: 4,
    check: true,
    title: "Week 4 check",
    subtitle: "Five short parts. Pass each with 66 %, just like the real TORFL exam.",
    glyph: "Ч",
    stage: "Numbers and money",
    milestone: { title: "Week 4 complete: you can count, ask prices and pay", detail: "0–1000 · рубль, рубля́, рубле́й · at the till" },
    steps: [
      { id: "numbers", part: "Numbers", reviewDays: [19, 20, 23], title: "Say the number", detail: "See it, pick the word", minutes: 3, tier: 10,
        type: "quiz", items: [], questions: [...DIGITS_10, ...DIGITS_100], count: 8, intro: "Part 1 of 5. Pick the Russian for each number." },
      { id: "words", part: "Money words", reviewDays: [21, 22], title: "Money words", detail: "See it, pick the meaning", minutes: 3, tier: 10,
        type: "quiz", items: [...d21, ...d22], count: 8, intro: "Part 2 of 5. Pick what each word means." },
      { id: "prices", part: "Prices", reviewDays: [21], title: "Say the price", detail: "рубль, рубля́ or рубле́й?", minutes: 3, tier: 10,
        type: "quiz", items: [], questions: ROUBLES, count: 6, intro: "Part 3 of 5. Pick the right form." },
      { id: "listening", part: "Listening", reviewDays: [19, 20, 23], title: "Listening", detail: "Hear the number", minutes: 3, tier: 10,
        type: "listen", items: numbers, count: 6, intro: "Part 4 of 5. Listen and pick the number." },
      { id: "real-life", part: "At the till", reviewDays: [22], title: "At the till", detail: "Pick the right phrase", minutes: 3, tier: 10,
        type: "quiz", items: [], questions: KIOSK, count: 6, intro: "Part 5 of 5. What would you say?" },
    ],
  },
];

export const WEEK4: Week = {
  n: 4,
  title: "Numbers and money",
  subtitle: "0 to 100, prices, the kiosk.",
  days: [19, 20, 21, 22, 23, 24],
};
