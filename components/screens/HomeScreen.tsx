import { useEfrogr } from "@/providers/EfrogrProvider";
import { BuyCreditsSheet } from "../BuyCreditsSheet";
import { DepositSheet } from "../DepositSheet";
import { SavingsSheet } from "../SavingsSheet";
import Jackpot from "../Jackpot";
import PlayFreeButton from "../PlayFreeButton";
import ShowSavingsButton from "../ShowSavingsButton";
import StreaksDrawer from "../StreaksDrawer";

export default function HomeScreen() {
  const { efrogrUser } = useEfrogr();
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Jackpot />
      {efrogrUser && (
        <>
          <span className="text-center text-xxxs text-gray-500">or</span>
          <PlayFreeButton />
          <span className="text-center text-xxxs text-gray-500">or</span>
          <ShowSavingsButton />
        </>
      )}
      <DepositSheet />
      <BuyCreditsSheet />
      <SavingsSheet />
      <StreaksDrawer />
    </div>
  );
}
