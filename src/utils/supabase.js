const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("SUPABASE_URL =", supabaseUrl);
console.log("SUPABASE_ANON_KEY =", supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);