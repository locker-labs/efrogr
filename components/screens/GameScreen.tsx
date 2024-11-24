import sketch from "@/game-objects/sketch";
import { EUserDirection, EMenuState } from "@/lib/constants";
import getEfrogrUserLives from "@/lib/getEfrogrUserLives";
import { IGameResult } from "@/lib/types";
import { useEfrogr } from "@/providers/EfrogrProvider";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { useCallback } from "react";

export default function GameScreen() {
  const {
    setMenuState,
    setLastResult,
    setUserDirection,
    userDirection,
    menuState,
    efrogrUser,
    leaderboard,
  } = useEfrogr();
  const lives = getEfrogrUserLives(efrogrUser);

  // reset user and men state
  const onGameEnd = useCallback((result: IGameResult) => {
    console.log("Game ended with result", result);
    setLastResult(result);
    setUserDirection({
      direction: EUserDirection.NONE,
      key: Date.now(), // Use the current timestamp as a unique key
    });
    setMenuState(EMenuState.GAME_OVER);
  }, []);

  const handleDirectionChange = (direction: EUserDirection) => {
    setUserDirection({
      direction,
      key: Date.now(), // Use the current timestamp as a unique key
    });
  };

  return (
    <>
      <div>
        <NextReactP5Wrapper
          sketch={sketch}
          userDirection={userDirection}
          onGameEnd={onGameEnd}
          menuState={menuState}
          efrogrUser={efrogrUser}
          highScore={leaderboard[0]?.highScore}
          highScoreUsername={leaderboard[0]?.tgUsername}
          lives={lives}
        />
      </div>
      <div className="flex flex-col w-full text-sm">
        <div className="flex flex-row">
          <button
            onClick={() => handleDirectionChange(EUserDirection.LEFT)}
            className="bg-gray-500 text-white px-2 py-5 w-full"
          >
            &#8592; Left
          </button>
          <button
            onClick={() => handleDirectionChange(EUserDirection.UP)}
            className="bg-locker-500 text-white px-2 py-5 w-full border-0"
          >
            &#8593; Up &#8593;
          </button>
          <button
            onClick={() => handleDirectionChange(EUserDirection.RIGHT)}
            className="bg-gray-500 text-white px-2 py-5 w-full"
          >
            Right &#8594;
          </button>
        </div>
        <button
          onClick={() => handleDirectionChange(EUserDirection.DOWN)}
          className=" bg-locker-500 text-white px-2 py-5 w-full border-0"
        >
          &#8595; Down &#8595;
        </button>
      </div>
    </>
  );
}
