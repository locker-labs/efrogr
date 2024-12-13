import type { Metadata } from "next";
import "./globals.css";
import DynamicProvider from "@/providers/DynamicProvider";
import { Inter } from "next/font/google";
import { DynamicLoadingProvider } from "@/providers/DynamicLoadingProvider";
import { CookiesProvider } from "next-client-cookies/server";

export const metadata: Metadata = {
  title: "Efrogr by Locker",
  description: "Get your Efrog across the street. Win and save CROAK.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col ${inter.className} antialiased items-center justify-center w-full`}
      >
        <DynamicProvider>
          <DynamicLoadingProvider>
            <CookiesProvider>{children}</CookiesProvider>
          </DynamicLoadingProvider>
        </DynamicProvider>
      </body>
    </html>
  );
}
