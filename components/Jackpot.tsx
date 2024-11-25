import jackpotIcon from "@/public/jackpot.svg";
import Image from "next/image";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";
import { JACKPOT_ADDRESS, CROAK_ADDRESS } from "@/lib/constants";
import { linea } from "viem/chains";
import { useBalance } from "wagmi";
import { formatUnits } from "viem";
import PlayPayButton from "./PlayPayButton";
import CroakFace from "./CroakFace";
import formatBigInt from "@/lib/formatBigInt";
import { useEfrogr } from "@/providers/EfrogrProvider";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export default function Jackpot() {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const { userInfo } = useEfrogr();
  const { data: jackpotBalance, isLoading: isJackpotLoading } = useBalance({
    address: JACKPOT_ADDRESS,
    token: CROAK_ADDRESS,
    chainId: linea.id,
    query: { refetchInterval: 60_000 },
  });

  // Countdown to next raffle
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = dayjs().tz("America/Chicago");
      let next7PM = dayjs().tz("America/Chicago").hour(19).minute(0).second(0);

      // If it's past 7 PM, set to the next day's 7 PM
      if (now.isAfter(next7PM)) {
        next7PM = next7PM.add(1, "day");
      }

      const diff = dayjs.duration(next7PM.diff(now));
      const hours = diff.hours();
      const minutes = diff.minutes();
      const seconds = diff.seconds();

      setTimeLeft(`${hours}h : ${minutes}m : ${seconds}s`);
    };

    // Update countdown every second
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // 'WIN CROAK' if jackpot is loading, otherwise show the jackpot amount
  const jackpotAmount = isJackpotLoading
    ? "WIN"
    : formatBigInt(BigInt(formatUnits(jackpotBalance?.value || BigInt(0), 18)));

  const numEntries = userInfo?.numEntries || 0;
  const numEntriesStr = numEntries === 1 ? "entry" : "entries";
  const numEntriesFormatted = `${numEntries} ${numEntriesStr}`;
  return (
    <div className="flex flex-col w-full bg-gradient-to-b border-2 border-[#831AFE] from-[#831AFE]/15 to-[#07FFFF]/15 rounded-2xl px-3 py-5 pb-3">
      <div className="flex flex-row w-full space-x-4">
        <div className="flex flex-col mt-1">
          <Image
            src={jackpotIcon}
            width={101}
            height={114}
            alt="Daily jackpot"
          />
        </div>
        <div className="flex flex-col flex-grow text-center space-y-1">
          <span className="text-sm text-locker-600 font-semibold">
            Daily Jackpot
          </span>
          <span className="space-x-1 align-middle justify-center items-center p-1 text-sm text-locker-600 flex flex-row rounded-2xl w-full border-[#FFC053] border-2 bg-[#FFFCB9]">
            <CroakFace />
            <div className="font-extrabold align-middle text-lg">
              {jackpotAmount}
            </div>
            <div className="font-semibold text-xs align-middle">CROAK</div>
          </span>
          <div className="space-y-1 mt-2">
            <div className="font-semibold font-xs text-gray-600">
              {timeLeft}
            </div>
            <div className="text-xxs text-[#646873]">
              You have {numEntriesFormatted}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full mt-5">
        <PlayPayButton />
      </div>
      <div className="flex flex-row w-full text-xs font-semibold mt-2">
        <span className="text-center w-full text-gray-600">
          1 Play = 1 Entry
        </span>
      </div>
      <div className="flex flex-row w-full text-xxxs text-gray-500 mt-7">
        <span className="text-center w-full">
          Get back 25% of your entry fees after 3 months
        </span>
      </div>
    </div>
  );
}
