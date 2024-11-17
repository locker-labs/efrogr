"use server";

import createEfrogrUser from "@/lib/db/createUser";
import { NextResponse } from "next/server";

export type ICreateEfrogrUserProps = {
  dynamicUserId: string;
  address: string;
  telegramAuthToken: string;
};

export async function POST(request: Request) {
  console.log("createUser POST");
  const userProps = (await request.json()) as ICreateEfrogrUserProps;
  const efrogrUser = await createEfrogrUser(userProps);
  console.log("efrogrUser", efrogrUser);
  return NextResponse.json({ efrogrUser }, { status: 200 });
}
