import { getServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Best-effort DB connectivity check so the kickoff page can show whether the
// database is wired up yet. Never throws — the page renders regardless.
async function checkDatabase(): Promise<boolean> {
  const supabase = getServerSupabase();
  if (!supabase) return false;
  try {
    const { error } = await supabase.from("notes").select("id").limit(1);
    return !error;
  } catch {
    return false;
  }
}

export default async function Home() {
  const dbReady = await checkDatabase();

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(1200px_600px_at_50%_-10%,#1e1b4b,#0b1020_60%)] p-8 text-center text-slate-200">
      <div className="max-w-xl">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-900 px-3 py-1.5 text-xs uppercase tracking-wider text-indigo-300">
          <span className="size-2 animate-pulse rounded-full bg-indigo-400" />
          Project kickoff
        </span>
        <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
          We&apos;re building something for you.
        </h1>
        <p className="text-lg leading-relaxed text-slate-400">
          Your project is underway. This page is live now and will update
          automatically as work ships — bookmark it and check back anytime.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 text-sm text-slate-500">
          <span
            className={`size-2 rounded-full ${dbReady ? "bg-emerald-400" : "bg-slate-600"}`}
          />
          {dbReady ? "Database connected" : "Database provisioning"}
        </div>
        <p className="mt-10 text-sm text-slate-500">
          Powered by{" "}
          <a href="https://endpointlabs.io" className="text-indigo-300">
            EndpointLabs
          </a>
        </p>
      </div>
    </main>
  );
}
