"use client";

/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import {
  EUserDirection,
  CROAK_ADDRESS,
  CROAK_PER_PLAY,
  CROAK_BUNDLE,
  MIN_ETH_DEPOSIT,
  EGameState,
  EMenuState,
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

  const onGameEnd = async (score: number) => {
    console.log("Game ended with score", score);
    setMenuState(EMenuState.NOT_PLAYING);
  };

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
    if (!user) return;
    if (!telegramAuthToken) return;
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
        const { efrogrUser } = await response.json();
        console.log("Got response from user!", efrogrUser);
        setEfrogrUser(efrogrUser);
      }
    };

    createUser();
  }, [telegramAuthToken, user]);

  // Refresh leaderboard
  useEffect(() => {
    const getLeaderboard = async () => {
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
        // console.log("got leaderboard", leaderboard, updatedUser);
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

  const handleDirectionChange = (direction: EUserDirection) => {
    setUserDirection({
      direction,
      key: Date.now(), // Use the current timestamp as a unique key
    });
  };

  const lives = BigInt(efrogrUser?.croakLeft || "0") / CROAK_PER_PLAY;

  const needsCredits =
    !!efrogrUser &&
    Number(efrogrUser.croakLeft) >= 0 &&
    Number(efrogrUser.croakLeft) < CROAK_PER_PLAY;

  // open modal if no croak left, croak balance is below 100 and eth balance is 0
  const doesNeedCroak =
    !isCroakBalanceLoading &&
    croakBalance &&
    croakBalance?.value < CROAK_BUNDLE;

  const doesNeedEth =
    !isEthBalanceLoading && ethBalance && ethBalance.value < MIN_ETH_DEPOSIT;

  const doesNeedDeposit = (doesNeedCroak || doesNeedEth) && needsCredits;

  const doesNeedCredits =
    !!efrogrUser &&
    lives <= 0 &&
    !doesNeedDeposit &&
    Number(efrogrUser.croakLeft) > -1;

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

  const modeSelector = (
    <div className="w-full flex flex-col space-y-2 h-[500px] justify-center border-locker-500 border p-3">
      <button
        className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
        onClick={() => setMenuState(EMenuState.PLAYING_JACKPOT)}
      >
        Play to win
      </button>
      <button
        className="rounded-md text-gray-500  px-4 py-4 w-full"
        onClick={() => setMenuState(EMenuState.PLAYING_FREE)}
      >
        Free play
      </button>
    </div>
  );

  return (
    <>
      <main className="py-3 flex flex-row justify-between items-center space-y-3 w-[350px]">
        <img src="./efrogr.png" alt="Efrogr by Locker" className="w-12" />
        {!isLoading && <DynamicWidget />}
      </main>
      <div className="flex flex-col items-center w-[350px] min-h-[90vh]">
        <GameBanner lives={lives} />
        {menuState === EMenuState.NOT_PLAYING ? modeSelector : gamePlay}
        <GameInfo
          efrogrUser={efrogrUser}
          leaderboard={leaderboard}
          userInfo={userInfo}
        />
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
        depositAddress={address || "Loading..."}
        eth={ethBalance?.value || BigInt(0)}
        croak={croakBalance?.value || BigInt(0)}
      />
      <BuyCreditsSheet
        open={doesNeedCredits}
        efrogrUserId={efrogrUser?.id || ""}
        setEfrogrUser={setEfrogrUser}
      />
    </>
  );
}
