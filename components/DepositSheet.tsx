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
  MIN_ETH_DEPOSIT_FORMATTED,
} from "@/lib/constants";
import { Loader2, Clipboard, CheckCircle } from "lucide-react";
import { formatUnits } from "viem";

export function DepositSheet({
  open,
  onDismiss,
  depositAddress,
  eth,
  croak,
}: {
  open: boolean;
  depositAddress: string;
  eth: bigint;
  croak: bigint;
  onDismiss: () => void;
}) {
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
          <SheetTitle>Deposit to continue</SheetTitle>
          <SheetDescription className="text-sm">
            A new wallet was created for you using your Telegram details. Your
            address is below. Withdraw funds or export private key at any time.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col break-all space-y-3 text-center my-16">
          <div className="flex justify-center items-center gap-2 text-gray-500">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
          <div
            className="flex flex-col items-center"
            onClick={handleCopyToClipboard}
          >
            <div className="flex items-center gap-2 border border-1 rounded-md border-gray-500 p-2 mt-1">
              <p className="font-bold text-locker-500">{depositAddress}</p>
              {isCopied ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Clipboard className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <span>Your wallet needs at least</span>
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
