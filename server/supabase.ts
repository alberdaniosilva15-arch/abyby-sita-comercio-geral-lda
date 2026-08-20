import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''; // Preferably Service Role Key for backend

let client: SupabaseClient | null = null;

/**
 * Lazy Supabase client. Não crasha no arranque quando faltam credenciais
 * (essencial num serverless/CI/deploy sem .env).
 */
function getClient(): SupabaseClient | null {
  if (supabaseUrl && supabaseKey) {
    if (!client) client = createClient(supabaseUrl, supabaseKey);
    return client;
  }
  return null;
}

/** Lança um erro claro se o Supabase não estiver configurado. */
function requireSupabase(): SupabaseClient {
  const c = getClient();
  if (!c) throw new Error('SUPABASE_URL/SUPABASE_KEY em falta. Configure o Supabase no .env.');
  return c;
}

export const supabase = {
  from: (table: string) => requireSupabase().from(table),
  rpc: (fn: string, args?: object) => requireSupabase().rpc(fn, args),
};