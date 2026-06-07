# dim-starter

The template every EndpointLabs engagement repo is cloned from. A minimal
**Next.js (App Router) + Tailwind** app that's **database-ready on day one**.

## What's wired in

- **Supabase client** — `lib/supabase/server.ts` (service-role, server only) and
  `lib/supabase/client.ts` (anon key, browser). Env vars are injected
  automatically when the engagement's database is provisioned.
- **Storage** — an `uploads` bucket is created by the initial migration; use the
  Supabase client to upload/serve files (handy for AI features that read files).
- **Migrations** — SQL files in `migrations/` run in order on every deploy
  (`npm run build` runs `scripts/migrate.mjs` before `next build`). Idempotent;
  tracked in a `_migrations` table. Add schema changes as new numbered files:
  `migrations/0002_add_customers.sql`, etc. **Never edit an already-applied
  migration — add a new one.**

## Local dev

```bash
npm install
cp .env.example .env.local   # fill from your Supabase project
npm run dev
```

## Env vars (auto-injected in deployment)

| Var | Use |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | project URL (browser + server) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public anon key (browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | full access (server only) |
| `DATABASE_URL` | pooled connection (app runtime) |
| `DIRECT_URL` | direct connection (migrations) |
