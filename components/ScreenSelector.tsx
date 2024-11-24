"use client";

import { useEfrogr } from "@/providers/EfrogrProvider";
import HomeScreen from "./screens/HomeScreen";
import { EMenuState } from "@/lib/constants";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function ScreenSelector() {
  const { menuState } = useEfrogr();

  switch (menuState) {
    case EMenuState.NOT_PLAYING:
      return <HomeScreen />;
    case EMenuState.PLAYING_JACKPOT:
    case EMenuState.PLAYING_FREE:
      return <GameScreen />;
    case EMenuState.GAME_OVER:
      return <GameOverScreen />;
    default:
      throw new Error("Invalid menu state " + menuState);
  }
}
