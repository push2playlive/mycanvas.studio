import { createClient } from '@supabase/supabase-js';

// Environment variables need to be set in .env.local
// In this environment, we use process.env for server-side and import.meta.env for client-side
// But the instructions say to use import.meta.env for VITE_ prefixed vars.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Real-time features may not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
