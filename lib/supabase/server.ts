import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client using the service-role key. Full access — use
// ONLY in server code (route handlers, server components, server actions),
// never shipped to the browser. Returns null if the project DB hasn't been
// provisioned/wired yet, so callers can degrade gracefully.
export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
