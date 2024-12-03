import { SAVINGS_FRACTION } from "./constants";
import { ILeaderboard } from "./types";

export default function getLeaderboardUserSavings(
  leaderboardUser: ILeaderboard | null
) {
  if (!leaderboardUser) return "0";
  return (
    (leaderboardUser.croakUsed * SAVINGS_FRACTION) /
    10 ** 18
  ).toLocaleString();
}
