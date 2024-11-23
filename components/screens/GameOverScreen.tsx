import GameInfo from "../GameInfo";

export default function GameOverScreen() {
  return (
    <div className="w-full flex flex-col space-y-2 h-[500px] justify-between border-locker-500 border p-3">
      <div className="text-center">
        <p className="font-bold  text-lg">
          {lastResult?.reason === EGameState.GAME_OVER
            ? "GAME OVER"
            : "OUT OF TIME"}
        </p>
        <p className="mt-3">
          {lastResult?.menuState === EMenuState.PLAYING_JACKPOT
            ? "you scored"
            : "free plays don't count"}
        </p>
        <p className="text-4xl font-semibold text-locker-500">
          {lastResult?.score}
        </p>
      </div>
      <div>
        <button
          className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
          onClick={() => setMenuState(EMenuState.NOT_PLAYING)}
        >
          <div className="flex flex-col space-y-1">
            <span className="text-xl">CONTINUE</span>
          </div>
        </button>
      </div>

      <GameInfo
        userInfo={userInfo}
        lives={lives}
        efrogrUser={null}
        leaderboard={[]}
      />
    </div>
  );
}
