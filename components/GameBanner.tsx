export default function GameBanner({ lives }: { lives: bigint }) {
  return (
    <div className="flex flex-col w-full my-3 text-center">
      <p className="text-green-700 text-sm">
        {lives.toString() || 0} lives left
      </p>
      <p className="text-gray-500 text-sm">Save CROAK every time you play</p>
      <p className="text-gray-500 text-sm">Play for entry in jackpot</p>
      <p className="text-locker-500 text-lg">Jackpot: 123,456 CROAK</p>
    </div>
  );
}
