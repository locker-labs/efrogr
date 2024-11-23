import Link from "next/link";
import Image from "next/image";
import xIcon from "@/public/x.svg";
import tgIcon from "@/public/telegram.svg";
export default function Footer() {
  const iconSize = 28;

  return (
    <footer className="py-5 w-full mt-5 flex justify-center">
      <div className="w-[300px] flex flex-col space-y-3">
        <div className="flex flex-col space-y-2">
          <p className="text-xxxs text-gray-500">brought to you by</p>
          <div className="flex space-x-4">
            <Link href="https://locker.money">
              <Image src="/locker.png" alt="locker" width={106} height={40} />
            </Link>
            <span>
              <Image src="/croak.png" alt="Croak" width={110} height={40} />
            </span>
          </div>
        </div>
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
