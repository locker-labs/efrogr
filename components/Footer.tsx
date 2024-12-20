import Link from "next/link";
import Image from "next/image";
import xIcon from "@/public/x.svg";
import tgIcon from "@/public/telegram.svg";
import docsIcon from "@/public/docs.svg";
import { DOCS_ADDRESS } from "@/lib/constants";
export default function Footer() {
  const iconSize = 28;

  return (
    <>
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
          href="https://t.me/+stsNEbe16tU5MTY5"
          className="footer-text text-center text-sm text-gray-700"
        >
          <Image
            src={tgIcon}
            width={iconSize}
            height={iconSize}
            alt="Locker on Telegram"
          />
        </Link>
        <Link
          href={DOCS_ADDRESS}
          className="footer-text text-center text-sm text-gray-700"
        >
          <Image
            src={docsIcon}
            width={iconSize}
            height={iconSize}
            alt="Efrogr documentation"
          />
        </Link>
      </div>
    </>
  );
}
