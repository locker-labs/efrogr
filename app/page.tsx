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
      </main>
      <footer className="py-5 w-[300px] flex-col space-y-3 flex justify-center mt-8">
        <Footer />
      </footer>
    </EfrogrProvider>
  );
}
