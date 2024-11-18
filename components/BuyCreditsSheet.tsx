import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import { encodeFunctionData } from "viem";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { isEthereumWallet } from "@dynamic-labs/ethereum";
import { CROAK_ADDRESS, CROAK_BUNDLE, LOCKER_TREASURY } from "@/lib/constants";

export function BuyCreditsSheet({
  open,
  efrogrUserId,
  setEfrogrUser,
}: {
  open: boolean;
  efrogrUserId: string;
  setEfrogrUser: any;
}) {
  const { primaryWallet } = useDynamicContext();
  const [isLoading, setIsLoading] = useState(false);
  const [txnHash, setTxnHash] = useState("");

  // Prevent the sheet from being closed externally if txnHash is defined
  const isSheetOpen = open || Boolean(txnHash);

  useEffect(() => {
    if (Boolean(txnHash)) {
      const processPayment = async () => {
        const response = await fetch("api/processPayment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            efrogrUserId,
            txnHash,
          }),
        }).catch((error) => {
          console.error("Could not processPayment:", error);
        });
        if (response) {
          const { efrogrUser } = await response.json();
          console.log("Got response from processPayment", efrogrUser);
          setEfrogrUser(efrogrUser);
          setTxnHash("");
        }
      };

      processPayment();
    }
  }, [txnHash]);

  if (!primaryWallet || !isEthereumWallet(primaryWallet)) return null;

  const handleBuyNow = async () => {
    setIsLoading(true);
    try {
      const publicClient = await primaryWallet.getPublicClient();
      const walletClient = await primaryWallet.getWalletClient();

      // Prepare ERC20 transfer data
      const data = encodeFunctionData({
        abi: [
          {
            name: "transfer",
            type: "function",
            inputs: [
              { name: "recipient", type: "address" },
              { name: "amount", type: "uint256" },
            ],
            outputs: [{ name: "success", type: "bool" }],
          },
        ],
        functionName: "transfer",
        args: [LOCKER_TREASURY, CROAK_BUNDLE], // Format CROAK_BUNDLE to 18 decimals
      });

      // Prepare and send transaction
      const transaction = {
        to: CROAK_ADDRESS,
        data,
      };

      const hash = await walletClient.sendTransaction(transaction as any);
      setTxnHash(hash);

      // Wait for transaction receipt
      const receipt = await publicClient.getTransactionReceipt({ hash });
      console.log(receipt);
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isSheetOpen}>
      <SheetContent className="no-close">
        <SheetHeader>
          <SheetTitle>Buy credits to play</SheetTitle>
          <SheetDescription className="text-sm">
            Qualify for the jackpot and save every time you play.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-center text-center my-16 space-y-4">
          <button
            className={`bg-locker-500 text-white px-8 py-4 text-lg font-bold rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleBuyNow}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Processing...</span>
              </div>
            ) : (
              "Buy now"
            )}
          </button>
          <p className="text-xs text-muted-foreground">
            10 lives for 1,000 CROAK
          </p>
          {txnHash && (
            <p className="text-xs text-green-500 break-all">
              Transaction Hash: {txnHash}
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
