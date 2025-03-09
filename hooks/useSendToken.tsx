import type { Address } from "viem";
import { encodeAbiParameters } from "viem";
import useTransactionApis from "./useTransactionApis";
import type { ModularAccountV2Client } from "@account-kit/smart-contracts";
import { CROAK_ADDRESS } from "@/lib/constants";

const useSendToken = () => {
  const { getTransactionReceipt, getUserOperationByHash } =
    useTransactionApis();

  const sendToken = async (
    maV2Client: ModularAccountV2Client,
    RECIPIENT: Address,
    AMOUNT: bigint
  ) => {
    try {
      const transferData = encodeAbiParameters(
        [
          { name: "recipient", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        [RECIPIENT, AMOUNT]
      );

      // Prepend the function selector for the transfer function
      const transferSelector = "0xa9059cbb"; // This is the selector for `transfer(address,uint256)`
      const data = transferSelector + transferData.slice(2);
      const res = await maV2Client.sendUserOperation({
        uo: {
          target: CROAK_ADDRESS as `0x${string}`,
          data: data as `0x${string}`,
          value: BigInt(0),
        },
      });

      console.log("User Operation Hash:", res.hash);

      let txHash;

      while (!txHash) {
        txHash = await getUserOperationByHash(res.hash);
        if (txHash) {
          console.log("txHash:", txHash);
          break;
        }
        console.log("Waiting for txHash...");
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds before retrying
      }

      let txReceipt;

      while (!txReceipt) {
        txReceipt = await getTransactionReceipt(txHash);
        if (txReceipt) {
          console.log("Receipt:", txReceipt);
          break;
        }
        console.log("Waiting for txReceipt...");
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      }

      return txReceipt;
    } catch (e) {
      console.error("Sending UserOp Failed", e);
    }
  };

  return { sendToken };
};

export default useSendToken;
