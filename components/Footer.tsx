import Link from "next/link";
import Image from "next/image";
import xIcon from "@/public/x.svg";
import tgIcon from "@/public/telegram.svg";
export default function Footer() {
  const iconSize = 28;

  return (
    <footer className="py-5 w-full mt-5 flex justify-center">
      <div className="w-[300px] flex flex-col space-y-3">
        <div className="border-t-2 border-[#D9D9D9]"></div>
        <div className="flex flex-row space-x-4">
          <Link
            href="https://twitter.com/locker_money"
            className="footer-text text-center text-sm text-gray-700"
          >
            <Image
              src={xIcon}
              width={iconSize}
              height={iconSize}
              alt="Locker on X"
            />
          </Link>
          <Link
            href="https://discord.gg/locker"
            className="footer-text text-center text-sm text-gray-700"
          >
            <Image
              src={tgIcon}
              width={iconSize}
              height={iconSize}
              alt="Locker on Telegram"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
