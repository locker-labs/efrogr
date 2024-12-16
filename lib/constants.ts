// general game variables
export const grid = 50;
export const canvasWidth = 300;
export const canvasHeight = 500;

// state of the actual game
export enum EGameState {
  START_SCREEN = "START_SCREEN",
  GAME = "GAME",
  GAME_OVER = "GAME_OVER",
  OUT_OF_TIME = "OUT_OF_TIME",
}

// state of the menu before the game
export enum EMenuState {
  NOT_PLAYING = "NOT_PLAYING",
  PLAYING_FREE = "PLAYING_FREE",
  PLAYING_JACKPOT = "PLAYING_JACKPOT",
  GAME_OVER = "GAME_OVER",
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
  EFROGR_LEADERBOARD: "efrogr_user_stats",
};

export const CROAK_PER_PLAY_FORMATTED = 333;
export const CROAK_BUNDLE_FORMATTED = 999;
export const MIN_ETH_DEPOSIT_FORMATTED = 0.00001;
export const CROAK_BUNDLE = BigInt(CROAK_BUNDLE_FORMATTED * 10 ** 18);
export const CROAK_PER_PLAY = BigInt(CROAK_PER_PLAY_FORMATTED * 10 ** 18);
export const MIN_ETH_DEPOSIT = BigInt(MIN_ETH_DEPOSIT_FORMATTED * 10 ** 18);

export const CROAK_ADDRESS = "0xaCb54d07cA167934F57F829BeE2cC665e1A5ebEF";
export const LOCKER_TREASURY = "0x119677b2a0f782cbd78f322f9b8ba6a3adf3c299";
export const JACKPOT_ADDRESS = "0xd7F723f8EDeC8D6D62caa4Ecc2b5Ca1292618355";
export const SAVINGS_ADDRESS = "0x4A67BbF59916D64362b4f2d27Bf4D1956b38D5fE";
export const DOCS_ADDRESS = "https://efrogr.gitbook.io/docs/";
export const SAVINGS_FRACTION = 0.3;

export const STREAK_PARAM = "o";
export const STREAK_GOALS: { day: number; croakFormatted: number | null }[] = [
  { day: 7, croakFormatted: null },
  { day: 14, croakFormatted: null },
  { day: 30, croakFormatted: null },
  { day: 50, croakFormatted: null },
  { day: 90, croakFormatted: null },
];
export const STREAK_COOKIE = "efrogr-streak";
