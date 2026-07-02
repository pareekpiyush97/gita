import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser client — safe to use in Client Components.
 * Relies on the public anon key; RLS policies (see supabase/schema.sql)
 * are what actually keep data safe, not this key.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
