"use client";
import { useRouter, useSearchParams } from "next/navigation"; // Import from next/navigation
import flameIcon from "@/public/flame.svg";
import croakFaceIcon from "@/public/croak-face.svg";
import Image from "next/image";

import React from "react";
import { DrawerContent, Drawer } from "./ui/drawer";
import { STREAK_GOALS, STREAK_PARAM } from "@/lib/constants";
import { useEfrogr } from "@/providers/EfrogrProvider";

export default function StreakDrawer() {
  const router = useRouter(); // Get the router
  const searchParams = useSearchParams(); // Get the search params
  const { userInfo } = useEfrogr(); // Get the efrogrUser from the EfrogrProvider

  // Get the current query parameters
  const params = new URLSearchParams(searchParams.toString());
  const [isOpen, setIsOpen] = React.useState(true);

  if (params.get(STREAK_PARAM) !== STREAK_PARAM) return null; // Return null if 'o' is not 'streak'

  // Function to handle closing the modal and removing 'o' param
  const handleCloseDrawer = () => {
    params.delete(STREAK_PARAM); // Remove 'o' from the query

    // Replace the current URL without the 'o' param
    router.replace(`?${params.toString()}`, { scroll: true });

    // Trigger the passed-in closeModal function to close the modal
    setIsOpen(false);
  };

  const streak = userInfo?.currentStreak || 0;
  const hasStreak = !!STREAK_GOALS.find((goal) => goal.day === streak);

  return (
    <Drawer open={isOpen} onOpenChange={handleCloseDrawer}>
      <DrawerContent className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center w-[300px]">
          <div
            className={`w-full flex flex-col justify-center items-center ${
              hasStreak
                ? "pt-10 bg-[url('/streak-achieved.svg')] bg-bottom"
                : "pt-4"
            }`}
          >
            <Image src={flameIcon} width={64} height={64} alt="Locker on X" />
            <span className="text-xxxl font-bold">{streak}</span>
            <span className="font-bold">Day Streak</span>
          </div>

          <div className="flex flex-row mt-7 space-x-1 text-gray-600 text-xxxs text-center">
            {STREAK_GOALS.map((goal, index) => (
              <div className="flex flex-col" key={index}>
                <div
                  className={`flex flex-col items-center border rounded-lg p-2 ${
                    goal.day === streak
                      ? " bg-gradient-to-b border-2 border-[#831AFE] from-[#831AFE]/15 to-[#07FFFF]/15"
                      : "bg-gray-600/5"
                  }`}
                >
                  <Image
                    src={croakFaceIcon}
                    width={28}
                    height={28}
                    alt="Streak for CROAK"
                  />
                  <span className="mt-2">
                    {goal.croakFormatted.toLocaleString()}
                  </span>

                  <span>CROAK</span>
                </div>
                <span className="mt-1">Day {goal.day}</span>
              </div>
            ))}
          </div>
          <button
            className="w-full rounded-md bg-[#6368DE] text-white text-xs py-2 mt-5"
            onClick={handleCloseDrawer}
          >
            Continue
          </button>
          {hasStreak && (
            <span className="text-center text-xxs text-gray-700 mt-1">
              CROAK will be sent within 24H
            </span>
          )}
          <div className="mb-5"></div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
