import * as clipboard from "clipboard-polyfill";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  CROAK_BUNDLE_FORMATTED,
  DOCS_ADDRESS,
  EMenuState,
  MIN_ETH_DEPOSIT_FORMATTED,
} from "@/lib/constants";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { useEfrogr } from "@/providers/EfrogrProvider";
import { doesEfrogrUserNeedDeposit } from "@/lib/payment";
import { CheckCircle, Loader2, Clipboard } from "lucide-react";
import Link from "next/link";

export function DepositSheet() {
  const { address } = useAccount();
  const {
    setMenuState,
    efrogrUser,
    menuState,
    isCroakBalanceLoading,
    croakBalance,
    isEthBalanceLoading,
    ethBalance,
  } = useEfrogr();
  const depositAddress = address || "Loading...";

  const onDismiss = () => setMenuState(EMenuState.NOT_PLAYING);
  const doesNeedDeposit = doesEfrogrUserNeedDeposit(
    efrogrUser,
    menuState,
    isCroakBalanceLoading,
    croakBalance,
    isEthBalanceLoading,
    ethBalance
  );
  const open = !!doesNeedDeposit;
  const eth = ethBalance?.value || BigInt(0);
  const croak = croakBalance?.value || BigInt(0);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    clipboard.writeText(depositAddress);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Clear feedback after 2 seconds
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onDismiss()}>
      <SheetContent className="no-close">
        <SheetHeader>
          <SheetTitle className="text-left">Fund your wallet</SheetTitle>
          <SheetDescription className="text-sm text-left">
            A new wallet was created for you. Withdraw funds or export private
            key at any time.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col break-all space-y-3 my-16 text-left">
          <div className="flex justify-center items-center gap-2 text-gray-500">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
          <div
            className="flex flex-col items-center"
            onClick={handleCopyToClipboard}
          >
            <div className="flex items-center gap-2 border border-1 rounded-md border-gray-500 p-2 mt-1">
              <p className="font-bold text-locker-500 text-left">
                {depositAddress}
              </p>
              {isCopied ? (
                <CheckCircle className="h-14 w-14 text-green-500" />
              ) : (
                <Clipboard className="h-14 w-14 text-gray-500" />
              )}
            </div>
          </div>
          <div className="text-sm text-gray-500 text-left">
            <span>In order to play, you'll need:</span>
            <ul className="list-inside list-disc">
              <li>{CROAK_BUNDLE_FORMATTED.toLocaleString()} CROAK for game</li>
              <li>{MIN_ETH_DEPOSIT_FORMATTED.toString()} ETH for gas</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-muted-foreground text-xs break-all">
            ETH balance: {formatUnits(eth, 18)}
          </p>
          <p className="text-muted-foreground text-xs break-all">
            CROAK balance: {formatUnits(croak, 18)}
          </p>
          <p className="mt-8">
            <Link
              href={DOCS_ADDRESS}
              className="text-muted-foreground text-xs"
              target="_blank"
            >
              Documentation
            </Link>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
