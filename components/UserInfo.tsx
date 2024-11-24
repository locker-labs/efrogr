import getEfrogrUserLives from "@/lib/getEfrogrUserLives";
import { useEfrogr } from "@/providers/EfrogrProvider";
import CroakFace from "./CroakFace";

export default function UserInfo() {
  const { userInfo, efrogrUser } = useEfrogr();
  const lives = getEfrogrUserLives(efrogrUser);
  return (
    <div className="flex flex-row justify-between w-full text-xxxs bg-gradient-to-b border-2 border-[#831AFE] from-[#831AFE]/15 to-[#07FFFF]/15 rounded-2xl px-3 py-5 pb-3">
      <div className="flex flex-col space-y-1">
        <span>Lives Left</span>
        <span>{lives}</span>
      </div>
      <div className="flex flex-col space-y-1">
        <span>High Score</span>
        <span>{userInfo?.highScore}</span>
      </div>
      <div className="flex flex-col space-y-1">
        <span>Savings</span>
        <span className="flex flex-row items-center align-middle">
          <CroakFace /> {} CROAK
        </span>
      </div>
    </div>
  );
}
