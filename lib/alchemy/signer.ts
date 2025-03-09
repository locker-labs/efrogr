/* eslint-disable */
import { type Address } from "viem";
import { type SmartAccountSigner } from "@aa-sdk/core";

// This will be used only for calculating Mav2 addresses without private key. It cannot sign messages.
export async function getCustomSigner(address: Address) {
  // Custom SmartAccountSigner implementation (minimal for address-only use)
  const customSigner: SmartAccountSigner = {
    // @ts-expect-error
    address,
    signerType: "custom", // A string identifier for the signer type
    async signMessage(_msg: any) {
      //   throw new Error("Signing not supported without private key");
      return address;
    },
    async signTypedData(_params: any) {
      throw new Error("Signing not supported without private key");
    },
    async getAddress() {
      return address;
    },
  };
  return customSigner;
}
