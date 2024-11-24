import { ILeaderboard } from "./types";

export default function getLeaderboardUserSavings(
  leaderboardUser: ILeaderboard | null
) {
  if (!leaderboardUser) return "0";
  return (leaderboardUser.croakUsed / 4 / 10 ** 18).toLocaleString();
}
