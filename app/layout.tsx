import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
} from "@/lib/dynamic";
import { GlobalWalletExtension } from "@dynamic-labs/global-wallet";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Efrogr by Locker",
  description: "Get your Efrog across the street. Win and save CROAK.",
};

const dynamicEnvId = process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID;

export default function RootLayout({
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
    <html lang="en">
      <body
        className={`flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased items-center`}
      >
        <DynamicContextProvider
          settings={{
            environmentId: dynamicEnvId,
            walletConnectors: [EthereumWalletConnectors],
            walletConnectorExtensions: [GlobalWalletExtension],
          }}
        >
          {children}
        </DynamicContextProvider>
      </body>
    </html>
  );
}
