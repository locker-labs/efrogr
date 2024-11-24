"use client";

import { CROAK_ADDRESS, EMenuState, EUserDirection } from "@/lib/constants";
import { useDynamicContext } from "@/lib/dynamic";
import { IEfrogrUser, IGameResult, ILeaderboard } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { linea } from "viem/chains";
import { useAccount, useBalance } from "wagmi";

interface EfrogrContextProps {
  efrogrUser: IEfrogrUser | null;
  leaderboard: ILeaderboard[];
  menuState: EMenuState;
  setMenuState: React.Dispatch<React.SetStateAction<EMenuState>>;
  userDirection: { direction: EUserDirection; key: number };
  setUserDirection: React.Dispatch<
    React.SetStateAction<{ direction: EUserDirection; key: number }>
  >;
  lastResult: IGameResult | null;
  setLastResult: React.Dispatch<React.SetStateAction<IGameResult | null>>;
  userInfo: ILeaderboard | null;
}

const EfrogrContext = createContext<EfrogrContextProps | undefined>(undefined);

export const EfrogrProvider: React.FC<{
  telegramAuthToken: string;
  children: React.ReactNode;
}> = ({ telegramAuthToken, children }) => {
  const { user: dynamicUser } = useDynamicContext();
  // const dynamicUser = null;
  const [efrogrUser, setEfrogrUser] = useState<IEfrogrUser | null>(null);
  const [leaderboard, setLeaderboard] = useState<ILeaderboard[]>([]);
  const [menuState, setMenuState] = useState<EMenuState>(
    EMenuState.NOT_PLAYING
  );
  const [userInfo, setUserInfo] = useState<ILeaderboard | null>(null);
  const { address, isConnected, chain } = useAccount();
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

  const [userDirection, setUserDirection] = useState<{
    direction: EUserDirection;
    key: number;
  }>({
    direction: EUserDirection.NONE,
    key: 0,
  });

  const [lastResult, setLastResult] = useState<IGameResult | null>(null);

  useEffect(() => {
    console.log("Dynamic User", telegramAuthToken, dynamicUser);
    if (!dynamicUser) {
      if (!!efrogrUser) setEfrogrUser(null);
      return;
    }
    // uncommenting this enables checking for tg auth token
    // but it also prevents non tg users from playing
    // if (!telegramAuthToken) return;
    const createUser = async () => {
      const response = await fetch("api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dynamicUserId: dynamicUser.userId,
          address: dynamicUser.verifiedCredentials[0].address,
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
  }, [dynamicUser]);

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

  return (
    <EfrogrContext.Provider
      value={{
        efrogrUser,
        leaderboard,
        menuState,
        setMenuState,
        userDirection,
        setUserDirection,
        lastResult,
        setLastResult,
        userInfo,
      }}
    >
      {children}
    </EfrogrContext.Provider>
  );
};

export const useEfrogr = (): EfrogrContextProps => {
  const context = useContext(EfrogrContext);
  if (!context) {
    throw new Error("useEfrogr must be used within a EfrogrProvider");
  }
  return context;
};
