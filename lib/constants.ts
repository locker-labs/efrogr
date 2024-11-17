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

export const CROAK_PER_PLAY = 100;
