import Jackpot from "../Jackpot";
import PlayFreeButton from "../PlayFreeButton";

export default function HomeScreen() {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Jackpot />
      <span className="text-center text-xxxs text-gray-500">or</span>
      <PlayFreeButton />
    </div>
  );
}
