import { type Sketch } from "@p5-wrapper/react";
import {
  canvasHeight,
  canvasWidth,
  grid,
  EGameState,
  EUserDirection,
  GAME_HOME_TITLE,
  GAME_HOME_SUBTITLE,
  EMenuState,
} from "@/lib/constants";

import Croak from "@/game-objects/croak.js";
import Frog from "@/game-objects/frog.js";
import Car from "@/game-objects/car.js";
import Log from "@/game-objects/log.js";
import Scenery from "@/game-objects/scenery.js";
import { IEfrogrUser } from "@/lib/types";
import cleanUsername from "@/lib/cleanUsername";

//VARIABLES
// class variables
let frog;
let cars: Car[] = [];
let logs: Log[] = [];
let scenery;
let efrogrUser: IEfrogrUser | null = null;

let gameState = EGameState.START_SCREEN;
let menuState = EMenuState.NOT_PLAYING;
let onGameEnd: any;

const COUNTDOWN_START = 360;
let countdown = COUNTDOWN_START;
let score = 0;
let level = 1;
let gameIsActive = true;
let highScore = 0;
let highScoreUsername = "";
let lives = BigInt(1);

//row objects
const row1 = {
  amount: 1,
  gap: 300,
  speed: 2 * level,
  length: 2,
};
const row2 = {
  amount: 2,
  gap: 300,
  speed: -2.5 * level,
  length: 2,
};
const row3 = {
  amount: 3,
  gap: 250,
  speed: 2.5 * level,
  length: 2,
};
//row4 is empty
const row5 = {
  amount: 4,
  gap: 200,
  speed: 3.2 * level,
  length: 2,
};
const row6 = {
  amount: 3,
  gap: 180,
  speed: -1.8 * level,
  length: 2,
};
const row7 = {
  amount: 2,
  gap: 280,
  speed: 4.2 * level,
  length: 2,
};

function updateCars(p5) {
  cars = [];
  spawnCars(p5);
}

function updateLogs(p5) {
  logs = [];
  spawnLogs(p5);
}

function gameOver(p5) {
  gameState = EGameState.START_SCREEN;
  console.log("Game Over");
  trackPlayed(p5);
  onGameEnd({ score, reason: EGameState.GAME_OVER, menuState });

  //show a game over screen with high score and stuff
  level = 1;
  resetGame(p5);
}

//base for the screen with text (starting screen and game over screen)
function screenBackground(p5) {
  scenery.draw();
  //cars
  for (let i = 0; i < cars.length; i++) {
    cars[i].update();
    cars[i].draw();

    if (frog.overlaps(cars[i])) {
      gameOver(p5);
    }
  }

  //logs
  for (let i = 0; i < logs.length; i++) {
    logs[i].update();
    logs[i].drawLog();
  }

  //Start Screen
  p5.push();
  p5.fill(0, 0, 0, 200);
  p5.rect(0, 0, canvasWidth, canvasHeight);
  p5.pop();
}

function startingScreen(p5: any) {
  screenBackground(p5);

  p5.push();
  p5.fill("#FFF");
  // p5.textFont(pixelFont);
  p5.textAlign(p5.CENTER);
  p5.textSize(46);
  p5.text(GAME_HOME_TITLE, canvasWidth / 2, canvasHeight / 2 - 20);
  p5.textSize(16);
  p5.text(GAME_HOME_SUBTITLE, canvasWidth / 2, canvasHeight / 2 + 10);
  p5.pop();
}

function trackPlayed(p5) {
  if (menuState === EMenuState.PLAYING_JACKPOT) {
    console.log("trackPlayed", efrogrUser, score);
    const path = "api/trackPlayed";
    const data = {
      efrogrUserId: efrogrUser!.id,
      score,
    };

    p5.httpPost(path, "json", data, function (result) {
      console.log("tracked played", result);
    });
  }
  onGameEnd(score);
}

function updateObjectSpeed() {
  row1.speed = 2 * level;
  row2.speed = -2.5 * level;
  row3.speed = 2.5 * level;
  row5.speed = 3.2 * level;
  row6.speed = -1.8 * level;
  row7.speed = 4.2 * level;
}

function resetGame(p5) {
  //resets background
  scenery = new Scenery(0, 0, p5);

  //resets frog
  if (menuState === EMenuState.PLAYING_FREE) {
    frog = new Frog(
      canvasWidth / 2 - grid / 2,
      canvasHeight - grid + 10,
      grid * 0.5,
      0.1,
      gameWon,
      p5
    );
  } else {
    frog = new Croak(
      canvasWidth / 2 - grid / 2,
      canvasHeight - grid + 10,
      grid * 0.5,
      0.1,
      gameWon,
      p5
    );
  }

  frog.attach(null);

  //reset gameIsActive variable
  gameIsActive = true;

  //reset countdown
  countdown = COUNTDOWN_START;

  //updates the speeds of the logs and cars depending on level
  updateObjectSpeed();

  //updates cars and logs (so we can change the speed depending on level)
  updateCars(p5);
  updateLogs(p5);
}

function gameWon(p5) {
  score = Math.round(score + level + countdown / 10);
  level = level + 0.15;
  resetGame(p5);
}

function spawnCars(p5) {
  let index = 0;
  //initializes a variable to keep track of the position in
  //the arrays where new objects are added, starting from the beginning of the array

  //row 1 - cars
  for (let i = 0; i < row1.amount; i++) {
    const x = i * row1.gap;

    cars[index] = new Car(
      x,
      p5.height - grid * 2,
      grid * row1.length,
      grid,
      row1.speed,
      0.2,
      Math.floor(Math.random() * 3),
      false,
      p5
    );

    index++;
  }

  //row 2 - cars (rotated)
  for (let i = 0; i < row2.amount; i++) {
    const x = i * row2.gap;

    cars[index] = new Car(
      x,
      p5.height - grid * 3,
      grid * row2.length,
      grid,
      row2.speed,
      0.2,
      Math.floor(Math.random() * 3),
      true,
      p5
    );

    index++;
  }

  //row 3 - cars
  for (let i = 0; i < row3.amount; i++) {
    const x = i * row3.gap;

    cars[index] = new Car(
      x,
      p5.height - grid * 4,
      grid * row3.length,
      grid,
      row3.speed,
      0.2,
      Math.floor(Math.random() * 3),
      false,
      p5
    );

    index++;
  }
}

function spawnLogs(p5) {
  let index = 0;

  //row 5 - logs
  for (let i = 0; i < row5.amount; i++) {
    const x = i * row5.gap;

    logs[index] = new Log(
      x,
      p5.height - grid * 6 + 10,
      grid * row5.length - 25,
      grid,
      row5.speed,
      0.2,
      p5
    );

    index++;
  }

  //row 6 - logs
  for (let i = 0; i < row6.amount; i++) {
    const x = i * row6.gap;

    logs[index] = new Log(
      x,
      p5.height - grid * 7 + 10,
      grid * row6.length - 25,
      grid,
      row6.speed,
      0.2,
      p5
    );

    index++;
  }

  //row 7 - logs
  for (let i = 0; i < row7.amount; i++) {
    const x = i * row7.gap;

    logs[index] = new Log(
      x,
      p5.height - grid * 8 + 10,
      grid * row7.length - 25,
      grid,
      row7.speed,
      0.2,
      p5
    );

    index++;
  }
}

const sketch: Sketch = (p5) => {
  p5.updateWithProps = (props) => {
    console.log("Props updated", props);
    const {
      efrogrUser: user,
      userDirection,
      onGameEnd: _onGameEnd,
      menuState: _menuState,
      highScore: _highScore,
      highScoreUsername: _highScoreUsername,
      lives: _lives,
    } = props;
    const { direction } = userDirection;
    onGameEnd = _onGameEnd;
    efrogrUser = user;
    menuState = _menuState;
    highScore = _highScore;
    highScoreUsername = _highScoreUsername;
    lives = _lives;

    if (direction) {
      // Game will initially be loaded with none direction, don't try to move frog
      if (direction === EUserDirection.NONE) return;
      if (gameState === EGameState.START_SCREEN) {
        console.log("start screen ");
        gameState = EGameState.GAME;
        score = 0;
      } else {
        console.log("playing screen ");
        switch (direction) {
          case EUserDirection.UP:
            frog.move(0, -1);
            break;
          case EUserDirection.DOWN:
            frog.move(0, 1);
            break;
          case EUserDirection.LEFT:
            frog.move(-1, 0);
            break;
          case EUserDirection.RIGHT:
            frog.move(1, 0);
            break;
        }
      }
    }
  };

  p5.setup = () => {
    // p5.preload();
    p5.createCanvas(canvasWidth, canvasHeight);
    p5.frameRate(30);
    resetGame(p5);

    spawnCars(p5);

    //row 4 - empty

    spawnLogs(p5);
  };

  p5.draw = () => {
    if (gameState === EGameState.START_SCREEN) {
      startingScreen(p5);
    } else if (gameState === EGameState.GAME) {
      //general
      scenery.draw();

      //cars
      for (let i = 0; i < cars.length; i++) {
        cars[i].update();
        cars[i].draw();

        if (frog.overlaps(cars[i])) {
          gameOver(p5);
        }
      }

      //logs
      for (let i = 0; i < logs.length; i++) {
        logs[i].update();
        logs[i].drawLog();
      }

      //frog
      if (frog.y < p5.height - grid * 5 && frog.y > grid * 2) {
        let safe = false;

        for (let i = 0; i < logs.length; i++) {
          if (frog.overlaps(logs[i])) {
            safe = true;
            frog.attach(logs[i]);
          }
        }

        if (!safe) {
          gameOver(p5);
        }
      } else {
        frog.attach(null);
      }

      frog.update();
      frog.draw();

      //text
      p5.push();
      p5.textAlign(p5.CENTER, p5.CENTER);
      // textFont(pixelFont);

      const white = "#FFF";
      const locker = "#6269DF";
      const statHeight = 20;
      const statPadding = 50;
      const lineHeight = 20;

      const md = 16;
      const lg = 30;

      // left side
      p5.textSize(md);
      p5.fill(white);
      const livesText =
        menuState === EMenuState.PLAYING_FREE ? "FREE" : "LIVES:  " + lives;
      p5.text(livesText, statPadding, statHeight);
      p5.text(score, statPadding, statHeight + lineHeight);

      // middle
      p5.textSize(lg);
      p5.fill(locker);
      p5.text(
        Math.round(countdown / 36) + "s",
        Math.round(canvasWidth / 2) - 20,
        statHeight
      );

      // right
      p5.textSize(md);
      p5.fill(white);
      p5.text(
        cleanUsername(highScoreUsername),
        canvasWidth - 1.5 * statPadding,
        statHeight
      );
      p5.text(
        highScore,
        canvasWidth - 1.5 * statPadding,
        statHeight + lineHeight
      );
      p5.pop();

      //game mechanics
      if (gameIsActive === true) {
        countdown = countdown - 1;
      }

      if (countdown < 0) {
        gameIsActive = false;
        gameState = EGameState.START_SCREEN;
        onGameEnd({ score, reason: EGameState.OUT_OF_TIME, menuState });
        trackPlayed(p5);
        level = 1;
        resetGame(p5);
      }

      frog.checkForWin(canvasWidth, 100);
    }
  };

  // This causes problems with game start if user clicks on a button to start the game
  // It gets picked up here and in the prop change logic
  // p5.mousePressed = () => {
  //   if (
  //     gameState === EGameState.GAME_OVER ||
  //     gameState === EGameState.OUT_OF_TIME ||
  //     gameState === EGameState.START_SCREEN
  //   ) {
  //     gameState = EGameState.GAME;
  //     score = 0;
  //   }
  // };

  p5.keyPressed = () => {
    const { keyCode, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW } = p5;

    if (gameState === EGameState.GAME) {
      if (keyCode === LEFT_ARROW || keyCode === 65) {
        frog.move(-1, 0);
      } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
        frog.move(1, 0);
      } else if (keyCode === UP_ARROW || keyCode === 87) {
        frog.move(0, -1);
      } else if (keyCode === DOWN_ARROW || keyCode === 83) {
        frog.move(0, 1);
      }
    }
    console.log(keyCode);
    if (
      gameState === EGameState.START_SCREEN ||
      gameState === EGameState.GAME_OVER ||
      gameState === EGameState.OUT_OF_TIME
    ) {
      if (menuState === EMenuState.PLAYING_FREE) {
        frog = new Frog(
          canvasWidth / 2 - grid / 2,
          canvasHeight - grid + 10,
          grid * 0.5,
          0.1,
          gameWon,
          p5
        );
      } else {
        frog = new Croak(
          canvasWidth / 2 - grid / 2,
          canvasHeight - grid + 10,
          grid * 0.5,
          0.1,
          gameWon,
          p5
        );
      }
      gameState = EGameState.GAME;
      score = 0;
    }
  };
};

export default sketch;
