import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import { encodeFunctionData } from "viem";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { isEthereumWallet } from "@dynamic-labs/ethereum";
import {
  CROAK_ADDRESS,
  CROAK_BUNDLE,
  CROAK_BUNDLE_FORMATTED,
  CROAK_PER_PLAY_FORMATTED,
  DOCS_ADDRESS,
  EMenuState,
  LOCKER_TREASURY,
} from "@/lib/constants";
import { useEfrogr } from "@/providers/EfrogrProvider";
import { doesEfrogrUserNeedCredits } from "@/lib/payment";
import Link from "next/link";

export function BuyCreditsSheet() {
  const { primaryWallet } = useDynamicContext();
  const [isLoading, setIsLoading] = useState(false);
  const [txnHash, setTxnHash] = useState("");
  const {
    setMenuState,
    efrogrUser,
    menuState,
    isCroakBalanceLoading,
    croakBalance,
    isEthBalanceLoading,
    ethBalance,
    setEfrogrUser,
  } = useEfrogr();
  const onDismiss = () => setMenuState(EMenuState.NOT_PLAYING);

  const open = doesEfrogrUserNeedCredits(
    efrogrUser,
    menuState,
    isCroakBalanceLoading,
    croakBalance,
    isEthBalanceLoading,
    ethBalance
  );

  // Prevent the sheet from being closed externally if txnHash is defined
  const isSheetOpen = open || Boolean(txnHash);

  useEffect(() => {
    if (Boolean(txnHash)) {
      const processPayment = async () => {
        console.log("Processing payment with txnHash", txnHash, efrogrUser);
        const response = await fetch("api/processPayment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            efrogrUser,
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

      // @typescript-eslint/no-explicit-any
      const hash = await walletClient.sendTransaction(transaction as any);
      setTxnHash(hash);

      // Wait for transaction receipt
      // const receipt = await publicClient.getTransactionReceipt({ hash });
      // console.log(receipt);
    } catch (error) {
      console.error("Transaction failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={(isOpen) => !isOpen && onDismiss()}>
      <SheetContent className="no-close">
        <SheetHeader>
          <SheetTitle className="text-left">Buy credits to play</SheetTitle>
          <SheetDescription className="text-sm text-left">
            It&apos;s good for you and good for Efrogs.
          </SheetDescription>
        </SheetHeader>

        <div className="flex justify-between flex-col">
          <div className="flex flex-col items-center text-center my-16 space-y-2">
            <button
              className={`bg-locker-500 text-white px-8 py-4 text-lg font-bold rounded-md w-full ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleBuyNow}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Buy now"
              )}
            </button>
            <p className="text-xs text-muted-foreground">
              {Math.floor(CROAK_BUNDLE_FORMATTED / CROAK_PER_PLAY_FORMATTED)}{" "}
              lives for {CROAK_BUNDLE_FORMATTED.toLocaleString()} CROAK
            </p>
          </div>

          <div>
            <p className="text-locker-500 font-semibold">
              The majority of fees go back to you and the community.
            </p>
            <ul className="list-inside text-sm  text-left">
              <li>💰 Jackpots (50%)</li>
              <li>🤑 You save CROAK (30%)</li>
            </ul>
          </div>
          <Link
            href={DOCS_ADDRESS}
            className="text-gray-500 mt-8 text-xs"
            target="_blank"
          >
            Documentation
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
