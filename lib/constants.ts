// general game variables
export const grid = 50;
export const canvasWidth = 400;
export const canvasHeight = 350;
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
