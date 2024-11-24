import getEfrogrUserLives from "@/lib/getEfrogrUserLives";
import { useEfrogr } from "@/providers/EfrogrProvider";
import CroakFace from "./CroakFace";
import getLeaderboardUserSavings from "@/lib/getLeaderboardUserSavings";

export default function UserInfo() {
  const { userInfo, efrogrUser } = useEfrogr();
  const lives = getEfrogrUserLives(efrogrUser);
  const savings = getLeaderboardUserSavings(userInfo);

  console.log("userInfo", userInfo, lives);
  return (
    <div className="flex flex-row justify-between w-full text-xxxs bg-gradient-to-b border-2 border-[#831AFE] from-[#831AFE]/15 to-[#07FFFF]/15 rounded-2xl px-3 py-2 pb-3">
      <div className="flex flex-col space-y-1">
        <span>Lives Left</span>
        <span>{lives.toLocaleString()}</span>
      </div>
      <div className="flex flex-col space-y-1">
        <span>High Score</span>
        <span>{userInfo?.highScore}</span>
      </div>
      <div className="flex flex-col space-y-1">
        <span>Savings</span>
        <div className="flex flex-row items-center align-middle space-x-1">
          <CroakFace /> <span className="text-xxs font-medium">{savings}</span>
        </div>
      </div>
    </div>
  );
}
