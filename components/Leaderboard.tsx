import cleanUsername from "@/lib/cleanUsername";
import { useEfrogr } from "@/providers/EfrogrProvider";
import rank1Icon from "@/public/rank1.svg";
import rank2Icon from "@/public/rank2.svg";
import rank3Icon from "@/public/rank3.svg";
import Image from "next/image";

export default function Leaderboard() {
  const { leaderboard } = useEfrogr();
  if (!leaderboard || leaderboard.length === 0) {
    return null;
  }
  const rank1 = leaderboard[0];
  const rank2 = leaderboard[1];
  const rank3 = leaderboard[2];
  return (
    <div className="w-full flex flex-col space-y-3">
      <span className="text-locker-600 font-semibold text-lg text-center">
        Leaderboard
      </span>
      <div className="grid grid-cols-3 grid-rows-5 text-xxxs space-x-1">
        {rank2 && (
          <div className="col-span-1 row-span-4 row-start-2 bg-[#BCBCBA]/25 rounded-lg py-2 text-center flex flex-col justify-center items-center space-y-1">
            <Image src={rank2Icon} alt="Rank 2" width={40} height={40} />
            <span className="break-all">{cleanUsername(rank2.tgUsername)}</span>
            <span className="text-gray-600 text-xxs font-bold">
              {rank2.highScore}
            </span>
          </div>
        )}
        {rank1 && (
          <div className="col-span-1 row-span-4 row-start-1 bg-[#F2BF27]/25 rounded-lg py-2 text-center flex flex-col justify-center items-center space-y-1">
            <Image src={rank1Icon} alt="Rank 1" width={40} height={40} />
            <span className="break-all">{cleanUsername(rank1.tgUsername)}</span>
            <span className="text-gray-600 text-xxs font-bold">
              {rank1.highScore}
            </span>
          </div>
        )}
        {rank3 && (
          <div className="col-span-1 row-span-4 row-start-2 bg-[#DD6D2C]/25 rounded-lg py-2 text-center flex flex-col justify-center items-center space-y-1">
            <Image src={rank3Icon} alt="Rank 3" width={40} height={40} />
            <span className="break-all">
              {cleanUsername(rank3.tgUsername)}a
            </span>
            <span className="text-gray-600 text-xxs font-bold">
              {rank3.highScore}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
