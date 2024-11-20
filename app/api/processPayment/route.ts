import { CROAK_BUNDLE, TABLES } from "@/lib/constants";
import supabaseServer from "@/lib/supabase/supabaseServer";
import { IEfrogrUser } from "@/lib/types";
import { NextResponse } from "next/server";

export type IProcessPaymentProps = {
  efrogrUser: IEfrogrUser;
  txHash: string;
};

export async function POST(request: Request) {
  console.log("processPayment POST");
  const params = (await request.json()) as IProcessPaymentProps;
  console.log("processPayment POST", params);
  const { efrogrUser } = params;

  // increase croakLeft by CROAK_BUNDLE
  const data = await supabaseServer
    .from(TABLES.EFROGR_USERS)
    .update({ croakLeft: CROAK_BUNDLE.toString() })
    .eq("id", efrogrUser.id)
    .single();

  console.log("data", data);
  // TODO verify txHash is a unique CROAK payment for at least 1000 to the treasury
  // For some reason, getting this response. so optimistically returning the updated the user
  // data {
  //   error: null,
  //   data: null,
  //   count: null,
  //   status: 204,
  //   statusText: 'No Content'
  // }
  return NextResponse.json(
    { efrogrUser: { ...efrogrUser, croakLeft: CROAK_BUNDLE.toString() } },
    { status: 200 }
  );
}
