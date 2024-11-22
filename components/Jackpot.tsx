import jackpotIcon from "@/public/jackpot.svg";
import Image from "next/image";

export default function Jackpot() {
  return (
    <div className="flex flex-col w-full bg-gradient-to-b border-2 border-[#831AFE] from-[#831AFE]/15 to-[#07FFFF]/15 rounded-2xl p-6 mt-4">
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-1/3">
          <Image
            src={jackpotIcon}
            width={101}
            height={114}
            alt="Daily jackpot"
          />
        </div>
        <div className="flex flex-col w-2/3">
          <span className="text-lg text-white font-bold">0.00</span>
          <span className="text-sm text-white">BNB</span>
        </div>
      </div>
    </div>
  );
}
