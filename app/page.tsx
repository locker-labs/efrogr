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
import { IEfrogrUser, IGameResult, ILeaderboard } from "@/lib/types";
import { linea } from "viem/chains";
import { DepositSheet } from "@/components/DepositSheet";
import { BuyCreditsSheet } from "@/components/BuyCreditsSheet";
import sketch from "@/game-objects/sketch";
import Jackpot from "@/components/Jackpot";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useDynamicLoading } from "@/providers/DynamicLoadingProvider";
import { EfrogrProvider, useEfrogr } from "@/providers/EfrogrProvider";
import Game from "@/components/Game";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { user } = useDynamicContext();

  const [userInfo, setUserInfo] = useState<ILeaderboard | null>(null);
  const { address, isConnected, chain } = useAccount();
  const [userDirection, setUserDirection] = useState<{
    direction: EUserDirection;
    key: number;
  }>({
    direction: EUserDirection.NONE,
    key: 0,
  });
  // const [efrogrUser, setEfrogrUser] = useState<IEfrogrUser | null>(null);
  // const { menuState, setMenuState, efrogrUser, leaderboard } = useEfrogr();
  const [efrogrUser, setEfrogrUser] = useState<IEfrogrUser | null>(null);
  const [leaderboard, setLeaderboard] = useState<ILeaderboard[]>([]);
  const [menuState, setMenuState] = useState<EMenuState>(
    EMenuState.NOT_PLAYING
  );

  const [lastResult, setLastResult] = useState<IGameResult | null>(null);
  const { isDynamicLoading } = useDynamicLoading();

  // When game ends
  const onGameEnd = useCallback((result: IGameResult) => {
    console.log("Game ended with result", result);
    setLastResult(result);
    setUserDirection({
      direction: EUserDirection.NONE,
      key: Date.now(), // Use the current timestamp as a unique key
    });
    setMenuState(EMenuState.GAME_OVER);
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

  // if croakLeft = -1, then the user has not played the game yet
  // let them play once for free
  // record efrogr_played with croakUsed = 0 and upgrade croakLeft to 0

  // if croackLeft > 100
  // let them play the game

  // if 0 <= croakLeft < 100,
  // get balance of this wallet via wagmi. if it's 0, then display modal to deposit into wallet
  // if there's balance, then display modal to buy 10 games for 1,000 croak by sending to Locker treasury

  // when game ends, create new efrogr_played record with croakUsed = 100
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
        {isDynamicLoading ? (
          <Spinner />
        ) : isConnected ? (
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

  // const gameOver = (
  //   <div className="w-full flex flex-col space-y-2 h-[500px] justify-between border-locker-500 border p-3">
  //     <div className="text-center">
  //       <p className="font-bold  text-lg">
  //         {lastResult?.reason === EGameState.GAME_OVER
  //           ? "GAME OVER"
  //           : "OUT OF TIME"}
  //       </p>
  //       <p className="mt-3">
  //         {lastResult?.menuState === EMenuState.PLAYING_JACKPOT
  //           ? "you scored"
  //           : "free plays don't count"}
  //       </p>
  //       <p className="text-4xl font-semibold text-locker-500">
  //         {lastResult?.score}
  //       </p>
  //     </div>
  //     <div>
  //       <button
  //         className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
  //         onClick={() => setMenuState(EMenuState.NOT_PLAYING)}
  //       >
  //         <div className="flex flex-col space-y-1">
  //           <span className="text-xl">CONTINUE</span>
  //         </div>
  //       </button>
  //     </div>

  //     <GameInfo
  //       efrogrUser={efrogrUser}
  //       leaderboard={leaderboard}
  //       userInfo={userInfo}
  //       lives={lives}
  //     />
  //   </div>
  // );

  // const modeSelector = (
  //   <div className="w-full flex flex-col space-y-2 h-[500px] justify-between border-locker-500 border p-3">
  //     <div>
  //       <button
  //         className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
  //         onClick={() => setMenuState(EMenuState.PLAYING_JACKPOT)}
  //       >
  //         <div className="flex flex-col space-y-1">
  //           <span className="text-lg">Play to win</span>
  //           <span className="text-xs">
  //             {CROAK_PER_PLAY_FORMATTED} CROAK per play
  //           </span>
  //         </div>
  //       </button>
  //       <button
  //         className="rounded-md text-gray-500  px-4 py-4 w-full"
  //         onClick={() => setMenuState(EMenuState.PLAYING_FREE)}
  //       >
  //         Free play
  //       </button>
  //     </div>

  //     <div className="flex flex-col space-y-2">
  //       <p className="text-center text-sm text-gray-500">brought to you by</p>
  //       <div className="flex justify-center space-x-8">
  //         <Link href="https://locker.money">
  //           <img src="/locker.png" alt="locker" width={150} />
  //         </Link>
  //         <span>
  //           <img src="/croak.png" alt="Croak" width={150} />
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const showGame =
  //   (isPlayingJackpot || menuState === EMenuState.PLAYING_FREE) &&
  //   !doesNeedDeposit &&
  //   !doesNeedCredits;

  // const game = showGame ? gamePlay : modeSelector;
  // let gameSection = <Spinner />;
  // if (!!efrogrUser) gameSection = game;
  // else if (!user)
  //   gameSection = (
  //     <p className="mt-4 text-locker-500">Connect your wallet to play.</p>
  //   );

  // if (menuState === EMenuState.GAME_OVER) {
  //   gameSection = gameOver;
  // }

  return (
    <EfrogrProvider telegramAuthToken={telegramAuthToken}>
      <main className="flex flex-col items-center w-[300px]">
        <Header />
        <Game />
        {/* {gameSection} */}
      </main>

      <Footer />
      {/* <DepositSheet
        open={!!doesNeedDeposit}
        onDismiss={() => setMenuState(EMenuState.NOT_PLAYING)}
        depositAddress={address || "Loading..."}
        eth={ethBalance?.value || BigInt(0)}
        croak={croakBalance?.value || BigInt(0)}
      /> */}
      {/* <BuyCreditsSheet
        open={!!doesNeedCredits}
        efrogrUser={efrogrUser}
        setEfrogrUser={setEfrogrUser}
        onDismiss={() => setMenuState(EMenuState.NOT_PLAYING)}
      /> */}
    </EfrogrProvider>
  );
}
