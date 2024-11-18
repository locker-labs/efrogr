import { IEfrogrUser, ILeaderboard } from "@/lib/types";

export default function GameInfo({
  efrogrUser,
  leaderboard,
  userInfo,
}: {
  efrogrUser: IEfrogrUser | null;
  leaderboard: ILeaderboard[];
  userInfo: ILeaderboard | null;
}) {
  let leaderboardList = leaderboard
    .sort((a, b) => b.highScore - a.highScore)
    .map((ranking, index) => {
      return (
        <p key={index}>
          {index + 1}. @{ranking.tgUsername} ({ranking.highScore})
        </p>
      );
    });

  const leaderboardSection =
    leaderboard.length > 0 ? (
      <>
        <p className="font-bold">Leaderboard</p>
        {leaderboardList}
      </>
    ) : null;

  return (
    <div className="flex flex-col w-full text-sm mt-5">
      <div className="flex flex-row justify-between text-xs mt-1">
        <div className="flex flex-col">{leaderboardSection}</div>
        <div className="flex flex-col text-right">
          <p className="font-bold">
            {efrogrUser ? `@${efrogrUser?.tgJson?.username}` : "Loading..."}
          </p>
          {userInfo && (
            <>
              <p>High score: {userInfo.highScore}</p>
              <p>
                Saved: {(userInfo.croakUsed / 4 / 10 ** 18).toLocaleString()}{" "}
                CROAK
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
