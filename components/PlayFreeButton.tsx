import { EMenuState } from "@/lib/constants";
import { useEfrogr } from "@/providers/EfrogrProvider";

export default function PlayPayButton() {
  const { setMenuState } = useEfrogr();
  return (
    <button
      className="rounded-md text-gray-600 text-xxs bg-gray-200 px-4 py-2 w-full"
      onClick={() => setMenuState(EMenuState.PLAYING_FREE)}
    >
      Free play
    </button>
  );
}
