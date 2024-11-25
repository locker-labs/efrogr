"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  useTelegramLogin,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";

interface DynamicLoadingContextProps {
  isDynamicLoading: boolean;
}

const DynamicLoadingContext = createContext<
  DynamicLoadingContextProps | undefined
>(undefined);

export const DynamicLoadingProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isDynamicLoading, setIsDynamicLoading] = useState<boolean>(true);
  const { sdkHasLoaded, user } = useDynamicContext();
  const { telegramSignIn } = useTelegramLogin();

  useEffect(() => {
    if (!sdkHasLoaded) return;

    const signIn = async () => {
      if (!user) {
        await telegramSignIn({ forceCreateUser: true });
      }
      setIsDynamicLoading(false);
    };

    signIn();
  }, [sdkHasLoaded, user, telegramSignIn]);

  return (
    <DynamicLoadingContext.Provider value={{ isDynamicLoading }}>
      {children}
    </DynamicLoadingContext.Provider>
  );
};

export const useDynamicLoading = (): DynamicLoadingContextProps => {
  const context = useContext(DynamicLoadingContext);
  if (!context) {
    throw new Error(
      "useDynamicLoading must be used within a DynamicLoadingProvider"
    );
  }
  return context;
};
