"use client";

import {
  DynamicContextProvider,
  EthereumWalletConnectors,
} from "@/lib/dynamic";
import { GlobalWalletExtension } from "@dynamic-labs/global-wallet";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { linea, sepolia } from "viem/chains";
const dynamicEnvId = process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID;

const config = createConfig({
  chains: [sepolia, linea],
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http(),
    [linea.id]: http(),
  },
});
const queryClient = new QueryClient();

export default function DynamicProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!dynamicEnvId) {
    const errMsg =
      "Please add your Dynamic Environment to this project's .env file";
    console.error(errMsg);
    throw new Error(errMsg);
  }

  return (
    <DynamicContextProvider
      settings={{
        environmentId: dynamicEnvId,
        walletConnectors: [EthereumWalletConnectors],
        walletConnectorExtensions: [GlobalWalletExtension],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
