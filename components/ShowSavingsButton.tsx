import { EMenuState } from "@/lib/constants";
import { useEfrogr } from "@/providers/EfrogrProvider";
import CroakFace from "./CroakFace";

export default function ShowSavingsButton() {
  const { setMenuState, efrogrUser } = useEfrogr();

  if (!efrogrUser) return null;
  return (
    <button
      className="rounded-md bg-locker-500 text-white p-2 w-full text-xs flex flex-row justify-center space-x-1"
      onClick={() => setMenuState(EMenuState.SAVINGS_MENU)}
    >
      <span className="font-semibold">Grab</span>
      <CroakFace />
      <span className="text-xs">Savings</span>
    </button>
  );
}
