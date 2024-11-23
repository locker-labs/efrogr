import type { Metadata } from "next";
import "./globals.css";
import DynamicProvider from "@/providers/DynamicProvider";
import { Inter } from "next/font/google";
import { DynamicLoadingProvider } from "@/providers/DynamicLoadingProvider";

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
        className={`flex flex-col ${inter.className} antialiased items-center`}
      >
        <DynamicProvider>
          <DynamicLoadingProvider>{children}</DynamicLoadingProvider>
        </DynamicProvider>
      </body>
    </html>
  );
}
