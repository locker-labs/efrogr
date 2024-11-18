// general game variables
export const grid = 50;
export const canvasWidth = 350;
export const canvasHeight = 300;
export enum EGameState {
  START_SCREEN = "START_SCREEN",
  GAME = "GAME",
  GAME_OVER = "GAME_OVER",
  OUT_OF_TIME = "OUT_OF_TIME",
}

export enum EUserDirection {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  NONE = "NONE",
}

// keycodes
export const KEYCODE_SPACE = 32;

// game text
export const GAME_HOME_TITLE = "Efrogr";
export const GAME_HOME_SUBTITLE = "Press any button below to start";

export const GAME_OUT_OF_TIME_TITLE = "Out of time!";
export const GAME_OUT_OF_TIME_SUBTITLE = "Keep playing for the jackpot";

// table names
export const TABLES = {
  EFROGR_USERS: "efrogr_users",
  EFROGR_PLAYS: "efrogr_plays",
};

export const CROAK_BUNDLE = BigInt(1000 * 10 ** 18);
export const CROAK_PER_PLAY = BigInt(100 * 10 ** 18);
export const MIN_CROAK_DEPOSIT = BigInt(1000 * 10 ** 18);
export const MIN_ETH_DEPOSIT = BigInt(0.00001 * 10 ** 18);

export const CROAK_ADDRESS = "0xaCb54d07cA167934F57F829BeE2cC665e1A5ebEF";
export const LOCKER_TREASURY = "0x119677b2a0f782cbd78f322f9b8ba6a3adf3c299";
