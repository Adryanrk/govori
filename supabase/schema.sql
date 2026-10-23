-- Govori: one row of progress per user.
-- Paste this into Supabase → SQL Editor → New query, and press Run.

create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Row Level Security: everyone can only ever read and write their own row.
alter table public.progress enable row level security;

create policy "Read own progress" on public.progress
  for select using ((select auth.uid()) = user_id);

create policy "Insert own progress" on public.progress
  for insert with check ((select auth.uid()) = user_id);

create policy "Update own progress" on public.progress
  for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
