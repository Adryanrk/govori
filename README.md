# Govori

Learn Russian, one day at a time. Built with Next.js, accounts with Supabase.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Accounts (Supabase)

1. Create a project on supabase.com.
2. SQL Editor → paste `supabase/schema.sql` → Run.
3. Copy `.env.local.example` to `.env.local` and fill in the Project URL and the anon / publishable key
   (Project Settings → API).
4. Add the same two variables in Vercel (Settings → Environment Variables) and redeploy.
5. Authentication → URL Configuration: set Site URL to your Vercel address and add it under Redirect URLs.

Without the variables the site still works, with progress kept in the browser only.

## Where things live

- `content/`: all lesson content. One file per week (`week-01.ts`), letters in `letters.ts`,
  everything gathered in `days.ts`. Add a week there.
- `lib/progress.ts`: progress, streak, rest days and spaced repetition.
- `lib/sync.ts`: accounts and syncing between devices.
- `lib/quiz.ts`: builds quizzes, listening and typing exercises.
- `app/`: pages: landing, `/today`, `/day/[n]`, `/day/[n]/play`, `/day/[n]/complete`, `/alphabet`, `/review`, `/account`.
- `components/`: flip cards, quiz, typing with the Russian keyboard, grammar cards, the week orbit, the sidebar.
- `app/globals.css`: design tokens and all styles.

## Notes

- Audio uses the browser's built-in Russian voice for now.
- Stress marks use the combining acute accent (U+0301) after the stressed vowel, e.g. `вода́`.
