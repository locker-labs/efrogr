import { TABLES } from "@/lib/constants";
import trackPlayed from "@/lib/db/trackPlayed";
import supabaseServer from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export type ILeaderboardProps = {
  efrogrUserId: string;
};

export async function POST(request: Request) {
  const { efrogrUserId } = (await request.json()) as ILeaderboardProps;
  //   console.log("leardeboard POST", efrogrUserId);

  // return existing user if exists
  let user = null;

  if (efrogrUserId) {
    const { data: users, error: usersError } = await supabaseServer
      .from(TABLES.EFROGR_LEADERBOARD)
      .select("*")
      .eq("id", efrogrUserId);

    // console.log("users", users);

    if (!usersError && users && users.length > 0) {
      user = users[0];
    }
  }

  const { data: leaderboard, error: leaderboardError } = await supabaseServer
    .from(TABLES.EFROGR_LEADERBOARD)
    .select("*")
    .limit(3);

  if (leaderboardError || !leaderboard || leaderboard.length <= 0) {
    throw new Error("User not found");
  }

  //   console.log("leaderboard", leaderboard);
  return NextResponse.json({ leaderboard, user: user }, { status: 200 });
}
