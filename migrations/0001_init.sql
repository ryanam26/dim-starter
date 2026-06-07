-- Initial schema for the client app. Add new migrations as numbered files
-- (0002_*.sql, 0003_*.sql, ...); they run in order on every deploy.

-- Example table. Replace/extend as the project needs.
create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  body text not null,
  created_at timestamptz not null default now()
);

-- A private storage bucket for file uploads (e.g. for AI features that read
-- files). Access is governed by storage policies; add them as needed.
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', false)
on conflict (id) do nothing;
