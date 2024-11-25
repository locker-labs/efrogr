"use client";

import { useEfrogr } from "@/providers/EfrogrProvider";
import HomeScreen from "./screens/HomeScreen";
import { EMenuState } from "@/lib/constants";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import {
  doesEfrogrUserNeedCredits,
  doesEfrogrUserNeedDeposit,
} from "@/lib/payment";

export default function ScreenSelector() {
  const {
    efrogrUser,
    menuState,
    isCroakBalanceLoading,
    croakBalance,
    isEthBalanceLoading,
    ethBalance,
  } = useEfrogr();

  const doesNeedDeposit = doesEfrogrUserNeedDeposit(
    efrogrUser,
    menuState,
    isCroakBalanceLoading,
    croakBalance,
    isEthBalanceLoading,
    ethBalance
  );

  const doesNeedCredits = doesEfrogrUserNeedCredits(
    efrogrUser,
    menuState,
    isCroakBalanceLoading,
    croakBalance,
    isEthBalanceLoading,
    ethBalance
  );

  switch (menuState) {
    case EMenuState.NOT_PLAYING:
      return <HomeScreen />;
    case EMenuState.PLAYING_JACKPOT:
    case EMenuState.PLAYING_FREE:
      if (!doesNeedDeposit && !doesNeedCredits) return <GameScreen />;
      else return <HomeScreen />;
    case EMenuState.GAME_OVER:
      return <GameOverScreen />;
    default:
      throw new Error("Invalid menu state " + menuState);
  }
}
