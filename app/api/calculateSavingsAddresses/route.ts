import { TABLES } from "@/lib/constants";
import supabaseServer from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";
import { getMaV2Client } from "@/lib/alchemy/customMaV2Client";
import { Address } from "viem";

export type ICreateEfrogrUserProps = {
  dynamicUserId: string;
  address: string;
  telegramAuthToken: string;
};

export async function GET() {
  console.log("calculateSavingsAddresses GET");

  const { data: efrogrUsers, error } = await supabaseServer
    .from(TABLES.EFROGR_USERS)
    .select("address, savingsAddress")
    .is("savingsAddress", null);

  if (error) throw error;

  console.log("efrogrUsers", efrogrUsers);
  console.log(efrogrUsers.length);

  for (const user of efrogrUsers) {
    console.log(user.address);
    // generate savings address
    const ma = await getMaV2Client(user.address as Address);
    const savingsAddress = ma.getAddress();

    console.log("savingsAddress", savingsAddress);

    // update savings address
    const { error: updateError } = await supabaseServer
      .from(TABLES.EFROGR_USERS)
      .update({ savingsAddress: savingsAddress })
      .eq("address", user.address);

    console.log("updateError", updateError);
    if (updateError) break;
  }

  return NextResponse.json({ message: "done" }, { status: 200 });
}
