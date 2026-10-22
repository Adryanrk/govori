# Govori

Learn Russian, one day at a time. Built with Next.js.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things live

- `content/days.ts`: all lesson content (letters, words, days, steps). Add a new day here.
- `lib/progress.ts`: progress, streak and rest days (saved in the browser for now).
- `app/`: the pages: landing (`/`), `/today`, `/day/[n]`, `/day/[n]/complete`, `/alphabet`, `/review`.
- `components/`: flip cards, quiz, the week orbit, the sidebar.
- `app/globals.css`: the design tokens and all styles.

## Notes

- Audio uses the browser's built-in Russian voice as a placeholder. On Windows,
  add a Russian voice in Settings → Time & language → Speech if nothing plays.
- Stress marks use the combining acute accent (U+0301) after the stressed vowel, e.g. `вода́`.
