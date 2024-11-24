"use client";

/* eslint-disable */

import React from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { EfrogrProvider } from "@/providers/EfrogrProvider";
import ScreenSelector from "@/components/ScreenSelector";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const telegramAuthToken = searchParams.telegramAuthToken as string;

  return (
    <EfrogrProvider telegramAuthToken={telegramAuthToken}>
      <main className="flex flex-col items-center justify-center w-[300px]">
        <Header />
        <ScreenSelector />
        <Footer />
      </main>
    </EfrogrProvider>
  );
}
