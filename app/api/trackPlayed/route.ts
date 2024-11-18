import trackPlayed from "@/lib/db/trackPlayed";
import { NextResponse } from "next/server";

export type ITrackPlayedProps = {
  efrogrUserId: string;
  score: number;
};

export async function POST(request: Request) {
  console.log("trackPlayed POST");
  const { efrogrUserId, score } = (await request.json()) as ITrackPlayedProps;
  const played = await trackPlayed(efrogrUserId, score);
  console.log("played", played);
  return NextResponse.json({ played }, { status: 200 });
}
