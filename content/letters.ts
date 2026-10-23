import { L } from "./build";
import type { Letter } from "./types";

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
