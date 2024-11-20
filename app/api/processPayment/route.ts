import { CROAK_BUNDLE, TABLES } from "@/lib/constants";
import supabaseServer from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export type IProcessPaymentProps = {
  efrogrUserId: string;
  txHash: string;
};

export async function POST(request: Request) {
  console.log("processPayment POST");
  const params = (await request.json()) as IProcessPaymentProps;
  console.log("processPayment POST", params);
  const { efrogrUserId } = params;

  // increase croakLeft by CROAK_BUNDLE
  const { data: efrogrUser } = await supabaseServer
    .from(TABLES.EFROGR_USERS)
    .update({ croakLeft: CROAK_BUNDLE.toString() })
    .eq("id", efrogrUserId)
    .single();

  console.log("efrogrUser", efrogrUser);
  // TODO verify txHash is a unique CROAK payment for at least 1000 to the treasury
  return NextResponse.json({ efrogrUser }, { status: 200 });
}
