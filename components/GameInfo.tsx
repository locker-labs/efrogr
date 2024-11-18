import { IEfrogrUser } from "@/lib/types";

export default function GameInfo({
  efrogrUser,
}: {
  efrogrUser: IEfrogrUser | null;
}) {
  return (
    <div className="flex flex-col w-full text-sm mt-5">
      <div className="flex flex-row justify-between text-xs mt-1">
        <div className="flex flex-col">
          <p className="font-bold">Leaderboard</p>
          <p>1. @foo (111,111)</p>
          <p>2. @bar (90,000)</p>
          <p>3. @game (80,000)</p>
        </div>
        <div className="flex flex-col text-right">
          <p className="font-bold">
            {efrogrUser ? `@${efrogrUser?.tgJson?.username}` : "Loading..."}
          </p>
          <p>High score: 70</p>
          <p>Balance: 1,234,567 CROAK</p>
          <p>Saved: 34,567 CROAK</p>
        </div>
      </div>
    </div>
  );
}
