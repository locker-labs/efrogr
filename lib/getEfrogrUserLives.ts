import { CROAK_PER_PLAY } from "./constants";
import { IEfrogrUser } from "./types";

export default function getEfrogrUserLives(efrogrUser: IEfrogrUser | null) {
  return BigInt(efrogrUser?.croakLeft || "0") / CROAK_PER_PLAY;
}
