import * as clipboard from "clipboard-polyfill";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CheckCircle, Clipboard } from "lucide-react";
import { formatUnits } from "viem";
import { EMenuState } from "@/lib/constants";
import { useEfrogr } from "@/providers/EfrogrProvider";
import { WithdrawSavingsForm } from "./WithdrawSavingsForm";

export function SavingsSheet() {
  const [isCopied, setIsCopied] = useState(false);

  const {
    menuState,
    setMenuState,
    efrogrUser,
    savingsCroakBalance,
    savingsEthBalance,
  } = useEfrogr();

  const displaySavingsAddress = efrogrUser?.savingsAddress || "Loading...";

  const open = menuState === EMenuState.SAVINGS_MENU;
  const onDismiss = () => setMenuState(EMenuState.NOT_PLAYING);

  const eth = savingsEthBalance?.value ?? BigInt(0);
  const croak = savingsCroakBalance?.value ?? BigInt(0);

  const handleCopyToClipboard = () => {
    clipboard.writeText(displaySavingsAddress);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Clear feedback after 2 seconds
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onDismiss()}>
      <SheetContent className="no-close">
        <SheetHeader>
          <SheetTitle className="text-left">Check your savings</SheetTitle>
          <SheetDescription className="text-sm text-left">
            Your CROAK savings are stored in below savings address. Withdraw
            funds or make deposits at any time.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col break-all space-y-3 mt-16 mb-4 text-left">
          <div
            className="flex flex-col items-center"
            onClick={handleCopyToClipboard}
          >
            <div className="flex items-center gap-2 border border-1 rounded-md border-gray-500 p-2 mt-1">
              <p className="font-bold text-locker-500 text-left">
                {displaySavingsAddress}
              </p>
              {isCopied ? (
                <CheckCircle className="h-14 w-14 text-green-500" />
              ) : (
                <Clipboard className="h-14 w-14 text-gray-500" />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-muted-foreground text-xs break-all">
            ETH Balance: {formatUnits(eth, 18)}
          </p>
          <p className="text-muted-foreground text-xs break-all">
            $CROAK Balance: {formatUnits(croak, 18)}
          </p>
          <p className="mt-12 mb-2 font-semibold text-lg break-all">
            Withdraw Savings
          </p>
          <WithdrawSavingsForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
