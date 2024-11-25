import { EGameState, EMenuState } from "@/lib/constants";
import { useEfrogr } from "@/providers/EfrogrProvider";
import UserInfo from "../UserInfo";
import Leaderboard from "../Leaderboard";

export default function GameOverScreen() {
  const { lastResult, setMenuState } = useEfrogr();

  return (
    <div className="w-full flex flex-col space-y-9 justify-between p-3">
      <div className="text-center">
        <p className="font-bold text-lg">
          {lastResult?.reason === EGameState.GAME_OVER
            ? "GAME OVER"
            : "OUT OF TIME"}
        </p>
        <p className="mt-2">
          {lastResult?.menuState === EMenuState.PLAYING_JACKPOT
            ? "you scored"
            : "free plays don't count"}
        </p>
        <p className="text-4xl font-semibold text-locker-500">
          {lastResult?.score}
        </p>
      </div>
      <div className="w-full">
        <button
          className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
          onClick={() => setMenuState(EMenuState.NOT_PLAYING)}
        >
          <div className="flex flex-col space-y-1">
            <span className="text-xl">CONTINUE</span>
          </div>
        </button>
      </div>
      <UserInfo />
      <Leaderboard />
    </div>
  );
}
