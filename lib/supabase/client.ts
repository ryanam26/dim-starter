"use client";

import { createClient } from "@supabase/supabase-js";

// Browser Supabase client using the public anon key (safe to ship to the
// client; Row Level Security governs what it can read/write). Use in client
// components for queries, realtime, and storage uploads.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(url, anonKey);
