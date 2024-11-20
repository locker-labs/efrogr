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
  const leaderboardList = leaderboard
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

  let username = efrogrUser ? efrogrUser?.tgJson?.username : "Loading...";

  // trim ethereum addresses
  if (username.length === 42)
    username = `${username.slice(0, 4)}...${username.slice(-4)}`;
  else username = `@${username}`;

  return (
    <div className="flex flex-col w-full text-sm mt-5">
      <div className="flex flex-row justify-between text-xs mt-1">
        <div className="flex flex-col">{leaderboardSection}</div>
        <div className="flex flex-col text-right">
          <p className="font-bold">{username}</p>
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
