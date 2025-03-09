import type { Address } from "viem";
// import { http, type Chain } from "viem";
// import { linea as viemLinea } from "viem/chains";
import { createModularAccountV2Client } from "@account-kit/smart-contracts";
import { alchemy, sepolia } from "@account-kit/infra";
import { getCustomSigner } from "./signer";

// const aaLinea: Chain = {
//   ...viemLinea,
//   rpcUrls: {
//     ...viemLinea.rpcUrls,
//     alchemy: {
//       http: ["https://linea-mainnet.g.alchemy.com/v2"],
//     },
//   },
// };

// const chain = aaLinea;

// transport: http(
//   "https://linea-mainnet.g.alchemy.com/v2/71KBjstCK2awJUJdoABc0HgVFNBEsUON"
// ),

// TODO: change to linea
const chain = sepolia;

export async function getMaV2Client(address: Address) {
  const signer = await getCustomSigner(address);
  const modularAccountV2Client = await createModularAccountV2Client({
    signer,
    chain,
    transport: alchemy({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
  });
  return modularAccountV2Client;
}
