import { CROAK_ADDRESS, JACKPOT_ADDRESS } from "@/lib/constants";
import { formatUnits } from "viem";
import { linea } from "viem/chains";
import { useBalance } from "wagmi";

export default function GameBanner({ lives }: { lives: bigint }) {
  const { data: jackpotBalance, isLoading: isJackpotLoading } = useBalance({
    address: JACKPOT_ADDRESS,
    token: CROAK_ADDRESS,
    chainId: linea.id,
    query: { refetchInterval: 10_000 },
  });

  return (
    <div className="flex flex-col w-full my-3 text-center">
      <p className="text-green-700 text-sm">
        {lives.toString() || 0} lives left
      </p>
      <p className="text-gray-500 text-sm">Save CROAK every time you play</p>
      <p className="text-gray-500 text-sm">Play for entry in jackpot</p>
      <p className="text-locker-500 text-lg">
        Jackpot:{" "}
        {isJackpotLoading
          ? "Loading..."
          : `${BigInt(
              formatUnits(jackpotBalance?.value!, 18)
            ).toLocaleString()} CROAK`}
      </p>
    </div>
  );
}
