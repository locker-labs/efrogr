import { createClient } from "@supabase/supabase-js";

console.log(
  "process.env.NEXT_PUBLIC_SUPABASE_URL",
  process.env.NEXT_PUBLIC_SUPABASE_URL
);
console.log(
  "process.env.NEXT_PUBLIC_SUPABASE_ANON",
  process.env.NEXT_PUBLIC_SUPABASE_ANON
);

// Create a single supabase client for interacting with your database
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON!
);

export default supabaseClient;
