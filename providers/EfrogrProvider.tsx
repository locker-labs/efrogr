"use client";

import { EMenuState } from "@/lib/constants";
import { useDynamicContext } from "@/lib/dynamic";
import { IEfrogrUser, ILeaderboard } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface EfrogrContextProps {
  efrogrUser: IEfrogrUser | null;
  leaderboard: ILeaderboard[];
  menuState: EMenuState;
  setMenuState: React.Dispatch<React.SetStateAction<EMenuState>>;
}

const EfrogrContext = createContext<EfrogrContextProps | undefined>(undefined);

export const EfrogrProvider: React.FC<{
  telegramAuthToken: string;
  children: React.ReactNode;
}> = ({ telegramAuthToken, children }) => {
  const { user } = useDynamicContext();
  const [efrogrUser, setEfrogrUser] = useState<IEfrogrUser | null>(null);
  const [leaderboard, setLeaderboard] = useState<ILeaderboard[]>([]);
  const [menuState, setMenuState] = useState<EMenuState>(
    EMenuState.NOT_PLAYING
  );

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
        // setUserInfo(updatedUser);
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
      value={{ efrogrUser, leaderboard, menuState, setMenuState }}
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
