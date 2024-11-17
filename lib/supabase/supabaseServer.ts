import { createClient } from "@supabase/supabase-js";

console.log(
  "process.env.NEXT_PUBLIC_SUPABASE_URL",
  process.env.NEXT_PUBLIC_SUPABASE_URL
);
console.log(
  "process.env.SUPABASE_SERVICE_ROLE",
  process.env.SUPABASE_SERVICE_ROLE
);
// Create a single supabase client for interacting with your database
const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export default supabaseServer;
