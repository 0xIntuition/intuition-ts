import type { Session, SupabaseClient } from "@supabase/supabase-js";

export type OutletContext = {
  supabase: SupabaseClient;
};