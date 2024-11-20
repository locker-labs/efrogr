import * as clipboard from "clipboard-polyfill";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  CROAK_ADDRESS,
  CROAK_BUNDLE_FORMATTED,
  JACKPOT_ADDRESS,
  MIN_ETH_DEPOSIT,
} from "@/lib/constants";
import { Loader2, Clipboard, CheckCircle } from "lucide-react";
import { formatUnits } from "viem";
import { linea } from "viem/chains";
import { useBalance } from "wagmi";

export function DepositSheet({
  open,
  depositAddress,
  eth,
  croak,
}: {
  open: boolean;
  depositAddress: string;
  eth: bigint;
  croak: bigint;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    clipboard.writeText(depositAddress);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Clear feedback after 2 seconds
  };

  const { data: jackpotBalance, isLoading: isJackpotLoading } = useBalance({
    address: JACKPOT_ADDRESS,
    token: CROAK_ADDRESS,
    chainId: linea.id,
    query: { refetchInterval: 5_000 },
  });

  return (
    <Sheet open={open}>
      <SheetContent className="no-close">
        <SheetHeader>
          <SheetTitle>Deposit to continue</SheetTitle>
          <SheetDescription className="text-sm">
            {CROAK_BUNDLE_FORMATTED.toLocaleString()} CROAK and{" "}
            {formatUnits(MIN_ETH_DEPOSIT, 18)} ETH on Linea
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col break-all space-y-3 text-center my-16">
          <div
            className="flex flex-col items-center"
            onClick={handleCopyToClipboard}
          >
            <p className="text-sm text-gray-500">Deposit to</p>
            <div className="flex items-center gap-2">
              <p className="font-bold">{depositAddress}</p>
              {isCopied ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Clipboard className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 text-gray-500">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        </div>
        <SheetFooter className="flex flex-col">
          <p className="text-xs break-all text-green-500">
            Jackpot:{" "}
            {isJackpotLoading
              ? "Loading..."
              : `${BigInt(
                  formatUnits(jackpotBalance?.value || BigInt(0), 18)
                ).toLocaleString()} CROAK`}
          </p>
          <p className="text-muted-foreground text-xs break-all">
            ETH balance: {formatUnits(eth, 18)}
          </p>
          <p className="text-muted-foreground text-xs break-all">
            CROAK balance: {formatUnits(croak, 18)}
          </p>
          <p className="text-muted-foreground text-xs break-all">
            CROAK address: {CROAK_ADDRESS}
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
