import { CROAK_PER_PLAY_FORMATTED, EMenuState } from "@/lib/constants";
import { useEfrogr } from "@/providers/EfrogrProvider";
import CroakFace from "./CroakFace";

export default function PlayPayButton() {
  const { setMenuState } = useEfrogr();
  return (
    <button
      className="rounded-md bg-locker-500 text-white p-2 w-full text-xs flex flex-row justify-center space-x-1"
      onClick={() => setMenuState(EMenuState.PLAYING_JACKPOT)}
    >
      <span className="font-semibold">Play for</span>
      <CroakFace />
      <span className="text-xs">{CROAK_PER_PLAY_FORMATTED} CROAK</span>
    </button>
  );
}
