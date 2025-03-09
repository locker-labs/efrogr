"use server";

import { TABLES } from "@/lib/constants";
import supabaseServer from "@/lib/supabase/supabaseServer";

async function main() {
  const { data, error } = await supabaseServer
    .from(TABLES.EFROGR_USERS)
    .select("*");
  if (error) throw error;
  console.log(data);

  return;
}

main().catch(console.error);

export default async function updateSavingsAddress({
  address,
  savingsAddress,
}): Promise<void> {
  const { error } = await supabaseServer
    .from(TABLES.EFROGR_USERS)
    .update({ savingsAddress: savingsAddress })
    .eq("address", address);
}
