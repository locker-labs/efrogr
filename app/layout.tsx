import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DynamicProvider from "@/providers/DynamicProvider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased items-center`}
      >
        <DynamicProvider>{children}</DynamicProvider>
      </body>
    </html>
  );
}
