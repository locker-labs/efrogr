import {
  CROAK_BUNDLE,
  CROAK_PER_PLAY,
  EMenuState,
  MIN_ETH_DEPOSIT,
} from "./constants";
import getEfrogrUserLives from "./getEfrogrUserLives";
import { IEfrogrUser } from "./types";

export function doesEfrogrUserNeedDeposit(
  efrogrUser: IEfrogrUser | null,
  menuState: EMenuState,
  isCroakBalanceLoading: boolean,
  croakBalance: any,
  isEthBalanceLoading: boolean,
  ethBalance: any
) {
  if (!efrogrUser) return false;

  const isPlayingJackpot = menuState == EMenuState.PLAYING_JACKPOT;

  const doesNeedCroak =
    isPlayingJackpot &&
    !isCroakBalanceLoading &&
    croakBalance &&
    croakBalance?.value < CROAK_BUNDLE;

  const doesNeedEth =
    !isEthBalanceLoading && ethBalance && ethBalance.value < MIN_ETH_DEPOSIT;

  const needsCredits =
    !!efrogrUser &&
    isPlayingJackpot &&
    Number(efrogrUser.croakLeft) < CROAK_PER_PLAY;

  return (doesNeedCroak || doesNeedEth) && needsCredits;
}

export function doesEfrogrUserNeedCredits(
  efrogrUser: IEfrogrUser | null,
  menuState: EMenuState,
  isCroakBalanceLoading: boolean,
  croakBalance: any,
  isEthBalanceLoading: boolean,
  ethBalance: any
) {
  if (!efrogrUser) return false;
  const isPlayingJackpot = menuState == EMenuState.PLAYING_JACKPOT;
  return (
    !!efrogrUser &&
    isPlayingJackpot &&
    getEfrogrUserLives(efrogrUser) <= 0 &&
    !doesEfrogrUserNeedDeposit(
      efrogrUser,
      menuState,
      isCroakBalanceLoading,
      croakBalance,
      isEthBalanceLoading,
      ethBalance
    )
  );
}
