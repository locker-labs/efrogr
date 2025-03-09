import type { ChangeEvent, FormEvent } from "react";
import type { Address } from "viem";
import type { SmartAccountSigner } from "@aa-sdk/core";

import { useState } from "react";
import { useEfrogr } from "@/providers/EfrogrProvider";
import { isAddress, parseUnits } from "viem";
import { z } from "zod";
import { WalletClientSigner } from "@alchemy/aa-core";
import { useDynamicContext, isEthereumWallet } from "@/lib/dynamic";
import { createModularAccountV2Client } from "@account-kit/smart-contracts";
import { alchemy, sepolia } from "@account-kit/infra";
// import { linea as viemLinea } from "viem/chains";
// import { type Chain }, http from "viem";
import { Loader2 } from "lucide-react";
import useSendToken from "@/hooks/useSendToken";

// const linea: Chain = {
//   ...viemLinea,
//   rpcUrls: {
//     ...viemLinea.rpcUrls,
//     alchemy: {
//       http: ["https://linea-mainnet.g.alchemy.com/v2"],
//     },
//   },
// };

// const chain = linea;

// TODO: change to linea
const chain = sepolia;

const amountSchema = (balance: number) =>
  z
    .string()
    .nonempty({ message: "is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "must be a positive number",
    })
    .superRefine((val, ctx) => {
      if (Number(val) > balance) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "must not exceed your $CROAK savings balance",
        });
      }
    });

const addressSchema = z
  .string()
  .nonempty({ message: "is required" })
  .refine((val) => isAddress(val), {
    message: "Invalid Ethereum address",
  });

export function WithdrawSavingsForm() {
  const { savingsCroakBalance } = useEfrogr();
  const { primaryWallet } = useDynamicContext();
  const croak = savingsCroakBalance?.formatted ?? 0;
  const [amount, setAmount] = useState<string | null>(null);
  const [destination, setDestination] = useState<Address | null>(null);

  const [amountError, setAmountError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("WithdrawSavingsForm", {
    amountError,
    addressError,
    amount,
    destination,
    isLoading,
  });

  const { sendToken } = useSendToken();

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(value);
    const validation = amountSchema(croak).safeParse(value);
    if (!validation.success) {
      setAmountError(validation.error.errors[0].message);
    } else {
      setAmountError(null);
    }
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDestination(value as Address);

    const validation = addressSchema.safeParse(value);
    if (!validation.success) {
      setAddressError(validation.error.errors[0].message);
    } else {
      setAddressError(null);
    }
  };

  if (!primaryWallet || !isEthereumWallet(primaryWallet)) return null;

  const handleWithdraw = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const dynamicProvider = await primaryWallet.getWalletClient();

      // a smart account signer you can use as an owner on ISmartContractAccount
      const dynamicSigner = new WalletClientSigner(
        dynamicProvider as unknown as any,
        "dynamic" // signer type
      );

      const savingsAccountClient = await createModularAccountV2Client({
        signer: dynamicSigner as SmartAccountSigner,
        chain,
        transport: alchemy({
          apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
        }),
        // transport: http(
        //   `https://linea-mainnet.g.alchemy.com/v2/${
        //     process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string
        //   }`
        // ),
      });

      console.log("savingsAccountClient", savingsAccountClient);
      if (!savingsAccountClient || !amount || !destination) return;
      console.log("Withdraw amount:", amount);
      console.log("Destination address:", destination);
      console.log("Sending $CROAK to savings account...");
      console.log("amount", parseUnits(amount, 18));
      await sendToken(
        savingsAccountClient,
        destination,
        parseUnits(amount, 18)
      );
      // @typescript-eslint/no-explicit-any
      // const hash = await walletClient.sendTransaction(transaction as any);
      // setTxnHash(hash);
      // Wait for transaction receipt
      // const receipt = await publicClient.getTransactionReceipt({ hash });
      // console.log(receipt);
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form>
      <div className="flex flex-col space-y-2">
        <label htmlFor="amount" className="text-sm text-left">
          Amount <span className="text-red-500 text-xxs">{amountError}</span>
        </label>
        <input
          type="text"
          id="amount"
          name="amount"
          placeholder={croak.toString()}
          className="border border-gray-300 rounded-md p-2"
          onChange={handleAmountChange}
          required
          readOnly={isLoading}
        />
        <label htmlFor="destination" className="text-sm text-left">
          Destination Address{" "}
          <span className="text-red-500 text-xxs">{addressError}</span>
        </label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={destination ?? ""}
          placeholder="0x..."
          className="border border-gray-300 rounded-md p-2"
          onChange={handleAddressChange}
          required
          readOnly={isLoading}
        />
        <button
          onClick={handleWithdraw}
          className={`rounded-md text-white text-xxs bg-locker-500 px-2 py-2 w-full
          ${
            isLoading
              ? "disabled:opacity-50"
              : "disabled:bg-red-300 disabled:cursor-not-allowed"
          }`}
          disabled={
            !!amountError ||
            !!addressError ||
            !amount ||
            !destination ||
            isLoading
          }
        >
          {isLoading ? (
            <span className="flex justify-between items-center">
              <span className="h-[14px] w-[14px]"></span>
              <span>Withdrawing</span>
              <Loader2 className="animate-spin h-4 w-4 align-right" />
            </span>
          ) : (
            "Withdraw"
          )}
        </button>
      </div>
    </form>
  );
}
