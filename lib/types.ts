import { EGameState } from "./constants";

export type IEfrogrTgJson = {
  authDate: number;
  firstName: string;
  lastName: string;
  username: string;
  id: number;
  photoURL: string;
  hash: string;
  iat: number;
};

export type IEfrogrUser = {
  id?: string;
  dynamicUserId: string;
  address: string;
  tgJson: IEfrogrTgJson;
  croakLeft: string;
};

export type IEfrogrPlay = {
  id?: string;
  efrogrUserId: string;
  croakUsed: string;
  score: number;
};

export type ILeaderboard = {
  efrogrUserId: string;
  highScore: number;
  croakUsed: number;
  croakLeft: number;
  tgUsername: string;
};

export type IGameResult = {
  score: number;
  reason: EGameState;
};
