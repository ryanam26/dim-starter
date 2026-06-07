// Applies migrations/*.sql in order, once each, tracked in a _migrations table.
// Runs on every deploy (wired into `build`). Idempotent and safe to re-run.
// Skips gracefully when no DB is wired yet (e.g. the very first deploy, before
// the database env vars are injected) so the build still succeeds.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationsDir = join(__dirname, "..", "migrations");

const url = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!url) {
  console.log("[migrate] No DIRECT_URL/DATABASE_URL set — skipping migrations.");
  process.exit(0);
}

const sql = postgres(url, { ssl: "require", max: 1 });

async function run() {
  await sql`create table if not exists _migrations (
    id text primary key,
    applied_at timestamptz not null default now()
  )`;

  const applied = new Set(
    (await sql`select id from _migrations`).map((r) => r.id),
  );

  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    if (applied.has(file)) continue;
    const content = readFileSync(join(migrationsDir, file), "utf-8");
    console.log(`[migrate] applying ${file}`);
    await sql.begin(async (tx) => {
      await tx.unsafe(content);
      await tx`insert into _migrations (id) values (${file})`;
    });
  }

  console.log("[migrate] up to date.");
}

run()
  .then(() => sql.end())
  .catch(async (err) => {
    console.error("[migrate] failed:", err.message);
    await sql.end();
    process.exit(1);
  });
