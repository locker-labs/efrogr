import supabaseServer from "@/lib/supabase/supabaseServer";
import { CROAK_PER_PLAY, TABLES } from "../constants";
import { IEfrogrPlay } from "../types";

export default async function trackPlayed(
  efrogrUserId: string,
  score: number
): Promise<IEfrogrPlay> {
  console.log("trackPlayed", efrogrUserId, score);

  // fetch user
  const { data: user, error: userError } = await supabaseServer
    .from(TABLES.EFROGR_USERS)
    .select("*")
    .eq("id", efrogrUserId);

  if (userError || !user) {
    console.error("Failed to fetch user", userError);
    throw new Error("Failed to fetch user", userError);
  }

  // if croakLeft < CROAK_PER_PLAY
  // don't record play
  const croakLeft = BigInt(user[0].croakLeft);

  const newPlay: IEfrogrPlay = {
    efrogrUserId,
    score,
    croakUsed: "-1",
  };

  // if croakLeft = -1, then the user has not played the game yet
  // record play with croakUsed = 0 and update user.croakLeft to 0
  let newCroakLeft;
  if (croakLeft === BigInt(-1)) {
    newPlay.croakUsed = "0";
    newCroakLeft = 0;
  } else if (croakLeft < CROAK_PER_PLAY) {
    throw new Error("Not enough croak left to play");
  } else {
    // if croakLeft >= CROAK_PER_PLAY
    // record play with croakUsed = CROAK_PER_PLAY and update user.croakLeft to croakLeft - CROAK_PER_PLAY
    newPlay.croakUsed = CROAK_PER_PLAY.toString();
    newCroakLeft = croakLeft - CROAK_PER_PLAY;
  }

  // insert new play
  const { data, error } = await supabaseServer
    .from(TABLES.EFROGR_PLAYS)
    .insert(newPlay)
    .select();

  console.log("data", data);
  console.log(error);

  if (!data) throw new Error("Failed to track play", error);

  // update user.croakLeft
  const { data: updatedUser, error: updatedUserError } = await supabaseServer
    .from(TABLES.EFROGR_USERS)
    .update({ croakLeft: newCroakLeft.toString() })
    .eq("id", efrogrUserId)
    .select();

  if (updatedUserError || !updatedUser) {
    console.error("Failed to update user", updatedUserError);
    throw new Error("Failed to update user", updatedUserError);
  }

  console.log("updatedUser", updatedUser);
  return data[0];
}
