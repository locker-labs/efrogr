"use client";

/* eslint-disable */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import {
  EUserDirection,
  CROAK_ADDRESS,
  CROAK_PER_PLAY,
  CROAK_BUNDLE,
  MIN_ETH_DEPOSIT,
  EGameState,
  EMenuState,
  CROAK_PER_PLAY_FORMATTED,
  JACKPOT_ADDRESS,
} from "@/lib/constants";
import {
  DynamicWidget,
  useTelegramLogin,
  useDynamicContext,
} from "@/lib/dynamic";
import { useAccount, useBalance } from "wagmi";

import Spinner from "@/components/Spinner";
import Link from "next/link";
import GameInfo from "@/components/GameInfo";
import GameBanner from "@/components/GameBanner";
import { IEfrogrUser, ILeaderboard } from "@/lib/types";
import { linea } from "viem/chains";
import { DepositSheet } from "@/components/DepositSheet";
import { BuyCreditsSheet } from "@/components/BuyCreditsSheet";
import sketch from "@/game-objects/sketch";
import { formatUnits } from "viem";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { sdkHasLoaded, user } = useDynamicContext();
  const { telegramSignIn } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [leaderboard, setLeaderboard] = useState<ILeaderboard[]>([]);
  const [userInfo, setUserInfo] = useState<ILeaderboard | null>(null);
  const { address, isConnected, chain } = useAccount();
  const [userDirection, setUserDirection] = useState<{
    direction: EUserDirection;
    key: number;
  }>({
    direction: EUserDirection.NONE,
    key: 0,
  });
  const [efrogrUser, setEfrogrUser] = useState<IEfrogrUser | null>(null);
  const [menuState, setMenuState] = useState<EMenuState>(
    EMenuState.NOT_PLAYING
  );

  // When game ends
  const onGameEnd = useCallback((score: number, gameState: EGameState) => {
    console.log("Game ended with score", score, gameState);
    setUserDirection({
      direction: EUserDirection.NONE,
      key: Date.now(), // Use the current timestamp as a unique key
    });
    setMenuState(EMenuState.NOT_PLAYING);
  }, []);

  const telegramAuthToken = searchParams.telegramAuthToken as string;

  const { data: croakBalance, isLoading: isCroakBalanceLoading } = useBalance({
    address,
    token: CROAK_ADDRESS,
    chainId: linea.id,
    query: { refetchInterval: 5000 },
  });

  const { data: ethBalance, isLoading: isEthBalanceLoading } = useBalance({
    address,
    chainId: linea.id,
    query: { refetchInterval: 5000 },
  });

  // console.log("croakBalance", croakBalance);
  // console.log("ethBalance", ethBalance);

  // console.log("doesNeedCroak", doesNeedCroak);
  // console.log("doesNeedEth", doesNeedEth);
  // console.log("doesNeedDeposit", doesNeedDeposit);
  // create user record if it doesn't exist
  useEffect(() => {
    // console.log("Efrogr User", telegramAuthToken, user);
    if (!user) {
      if (!!efrogrUser) setEfrogrUser(null);
      return;
    }
    // if (!telegramAuthToken) return;
    const createUser = async () => {
      const response = await fetch("api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dynamicUserId: user.userId,
          address: user.verifiedCredentials[0].address,
          telegramAuthToken,
        }),
      }).catch((error) => {
        console.error("Could not createUser:", error);
      });
      if (response) {
        const { efrogrUser: _efrogrUser } = await response.json();
        console.log("Got response from user!", _efrogrUser);
        setEfrogrUser(_efrogrUser);
      }
    };

    createUser();
  }, [user]);

  // Refresh leaderboard
  useEffect(() => {
    console.log("efrogrUserUpdated", efrogrUser);
    const getLeaderboard = async () => {
      console.log("fetching leaderboard", efrogrUser);
      const response = await fetch("api/getLeaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          efrogrUserId: efrogrUser?.id,
        }),
      }).catch((error) => {
        console.error("Could not update leaderboard:", error);
      });
      if (response) {
        const { leaderboard: newLeaderboard, user: updatedUser } =
          await response.json();
        console.log("got leaderboard", leaderboard, updatedUser);
        setLeaderboard(newLeaderboard);
        setUserInfo(updatedUser);
        if (updatedUser && efrogrUser)
          if (
            updatedUser.croakLeft.toString() !== efrogrUser.croakLeft.toString()
          )
            setEfrogrUser({
              ...efrogrUser,
              croakLeft: updatedUser.croakLeft.toString(),
            });
      }
    };

    getLeaderboard(); // Fetch immediately
    const intervalId = setInterval(getLeaderboard, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [efrogrUser]);

  // if croakLeft = -1, then the user has not played the game yet
  // let them play once for free
  // record efrogr_played with croakUsed = 0 and upgrade croakLeft to 0

  // if croackLeft > 100
  // let them play the game

  // if 0 <= croakLeft < 100,
  // get balance of this wallet via wagmi. if it's 0, then display modal to deposit into wallet
  // if there's balance, then display modal to buy 10 games for 1,000 croak by sending to Locker treasury

  // when game ends, create new efrogr_played record with croakUsed = 100
  useEffect(() => {
    console.log("sdkHasLoaded", sdkHasLoaded);
    if (!sdkHasLoaded) return;

    const signIn = async () => {
      if (!user) {
        await telegramSignIn({ forceCreateUser: true });
      }
      setIsLoading(false);
    };

    signIn();
  }, [sdkHasLoaded]);

  const { data: jackpotBalance, isLoading: isJackpotLoading } = useBalance({
    address: JACKPOT_ADDRESS,
    token: CROAK_ADDRESS,
    chainId: linea.id,
    query: { refetchInterval: 60_000 },
  });

  const handleDirectionChange = (direction: EUserDirection) => {
    setUserDirection({
      direction,
      key: Date.now(), // Use the current timestamp as a unique key
    });
  };

  const lives = BigInt(efrogrUser?.croakLeft || "0") / CROAK_PER_PLAY;

  const isPlayingJackpot = menuState == EMenuState.PLAYING_JACKPOT;

  const needsCredits =
    !!efrogrUser &&
    isPlayingJackpot &&
    Number(efrogrUser.croakLeft) < CROAK_PER_PLAY;

  // open modal if no croak left, croak balance is below 100 and eth balance is 0
  const doesNeedCroak =
    isPlayingJackpot &&
    !isCroakBalanceLoading &&
    croakBalance &&
    croakBalance?.value < CROAK_BUNDLE;

  const doesNeedEth =
    !isEthBalanceLoading && ethBalance && ethBalance.value < MIN_ETH_DEPOSIT;

  const doesNeedDeposit = (doesNeedCroak || doesNeedEth) && needsCredits;

  const doesNeedCredits =
    !!efrogrUser && isPlayingJackpot && lives <= 0 && !doesNeedDeposit;

  const gamePlay = (
    <>
      <div>
        {isLoading ? (
          <Spinner />
        ) : isConnected ? (
          <NextReactP5Wrapper
            sketch={sketch}
            userDirection={userDirection}
            onGameEnd={onGameEnd}
            menuState={menuState}
            efrogrUser={efrogrUser}
          />
        ) : null}
      </div>
      <div className="mt-4 flex flex-col space-y-1 w-2/3 text-sm">
        <button
          onClick={() => handleDirectionChange(EUserDirection.UP)}
          className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
        >
          &#8593; Up &#8593;
        </button>
        <div className="flex space-x-1 flex-row">
          <button
            onClick={() => handleDirectionChange(EUserDirection.LEFT)}
            className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
          >
            &#8592; Left
          </button>
          <button
            onClick={() => handleDirectionChange(EUserDirection.RIGHT)}
            className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
          >
            Right &#8594;
          </button>
        </div>
        <button
          onClick={() => handleDirectionChange(EUserDirection.DOWN)}
          className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
        >
          &#8595; Down &#8595;
        </button>
      </div>
    </>
  );

  // if free play then start game
  // if jackpot play then check if user has enough croak to play
  // if not, then show modal to buy or deposit
  // if user has enough croak
  // const startGame = (mode: EMenuState) => {
  //   if (mode === EMenuState.PLAYING_JACKPOT) {
  //   } else {
  //     setMenuState(mode);
  //   }
  // };

  const modeSelector = (
    <div className="w-full flex flex-col space-y-2 h-[500px] justify-between border-locker-500 border p-3">
      <div>
        <p className="text-locker-500 text-xl text-center font-semibold">
          {isJackpotLoading
            ? null
            : `${BigInt(
                formatUnits(jackpotBalance?.value || BigInt(0), 18)
              ).toLocaleString()} CROAK JACKPOT`}
        </p>
      </div>

      <div>
        <button
          className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
          onClick={() => setMenuState(EMenuState.PLAYING_JACKPOT)}
        >
          <div className="flex flex-col space-y-1">
            <span className="text-lg">Play to win</span>
            <span className="text-xs">
              {CROAK_PER_PLAY_FORMATTED} CROAK per play
            </span>
          </div>
        </button>
        <button
          className="rounded-md text-gray-500  px-4 py-4 w-full"
          onClick={() => setMenuState(EMenuState.PLAYING_FREE)}
        >
          Free play
        </button>
      </div>

      <GameInfo
        efrogrUser={efrogrUser}
        leaderboard={leaderboard}
        userInfo={userInfo}
      />
    </div>
  );

  const showGame =
    (isPlayingJackpot || menuState === EMenuState.PLAYING_FREE) &&
    !doesNeedDeposit &&
    !doesNeedCredits;

  const game = showGame ? gamePlay : modeSelector;
  const gameSection = !!efrogrUser ? (
    game
  ) : (
    <p className="mt-4 text-locker-500">Connect your wallet to play.</p>
  );
  return (
    <>
      <main className="py-3 flex flex-row justify-between items-center space-y-3 w-[350px]">
        <img src="./efrogr.png" alt="Efrogr by Locker" className="w-12" />
        {!isLoading && <DynamicWidget />}
      </main>
      <div className="flex flex-col items-center w-[350px] min-h-[90vh]">
        <GameBanner />
        {gameSection}
      </div>

      <footer className="py-5 bg-locker-200 w-full mt-5 flex justify-center">
        <div className="w-[350px] flex justify-center flex-col space-y-2">
          <div className="flex flex-row justify-center space-x-2">
            <Link
              href="https://twitter.com/locker_money"
              className="footer-text text-center text-sm text-gray-700"
            >
              X
            </Link>
            <Link
              href="https://discord.gg/locker"
              className="footer-text text-center text-sm text-gray-700"
            >
              Telegram
            </Link>
          </div>
          <div className="flex flex-row justify-center">
            <Link
              href="https://locker.money"
              className="footer-text text-center text-sm text-gray-700"
            >
              Made by Locker
            </Link>
          </div>
        </div>
      </footer>
      <DepositSheet
        open={!!doesNeedDeposit}
        onDismiss={() => setMenuState(EMenuState.NOT_PLAYING)}
        depositAddress={address || "Loading..."}
        eth={ethBalance?.value || BigInt(0)}
        croak={croakBalance?.value || BigInt(0)}
      />
      <BuyCreditsSheet
        open={!!doesNeedCredits}
        efrogrUserId={efrogrUser?.id || ""}
        setEfrogrUser={setEfrogrUser}
        onDismiss={() => setMenuState(EMenuState.NOT_PLAYING)}
      />
    </>
  );
}
