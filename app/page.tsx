"use client";

/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import {
  canvasHeight,
  canvasWidth,
  grid,
  EGameState,
  KEYCODE_SPACE,
  EUserDirection,
  GAME_HOME_TITLE,
  GAME_HOME_SUBTITLE,
} from "@/lib/constants";
import {
  DynamicWidget,
  useTelegramLogin,
  useDynamicContext,
} from "@/lib/dynamic";
import { useAccount } from "wagmi";

//IMPORT
import Frog from "@/game-objects/frog.js";
import Car from "@/game-objects/car.js";
import Log from "@/game-objects/log.js";
import Scenery from "@/game-objects/scenery.js";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import GameInfo from "@/components/GameInfo";
import GameBanner from "@/components/GameBanner";

//VARIABLES
// class variables
let frog;
let cars = [];
let logs = [];
let scenery;

let gameState = EGameState.START_SCREEN;

let countdown = 360;
let score = 0;
let level = 1;
let gameIsActive = true;

function gameOver() {
  gameState = EGameState.GAME_OVER;
  console.log("Game Over");
  //show an game over screen with highscore and stuff
  level = 1;
  // resetGame();
}

//base for the screen with text (starting screen and game over screen)
function screenBackground(p5) {
  scenery.draw();
  //cars
  for (let i = 0; i < cars.length; i++) {
    // cars[i].update();
    // cars[i].draw();

    if (frog.overlaps(cars[i])) {
      // gameOver();
    }
  }

  //logs
  for (let i = 0; i < logs.length; i++) {
    // logs[i].update();
    // logs[i].drawLog();
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

function resetGame(p5) {
  //resets background
  scenery = new Scenery(0, 0, p5);

  //resets frog
  frog = new Frog(
    canvasWidth / 2 - grid / 2,
    canvasHeight - grid + 10,
    grid * 0.5,
    0.1,
    gameWon,
    p5
  );

  frog.attach(null);

  //reset gameIsActive varaible
  gameIsActive = true;

  //reset countdown
  countdown = 360;

  //updates the speeds of the logs and cars depending on level
  // updateObjectSpeed();

  //updates cars and logs (so we can change the speed depending on level)
  // updateCars();
  // updateLogs();
}

function gameWon(p5) {
  score = score + 100;
  level = level + 0.15;
  resetGame(p5);
}

const sketch: Sketch = (p5) => {
  p5.updateWithProps = (props) => {
    const { direction } = props.userDirection;
    if (direction) {
      if (
        gameState === EGameState.START_SCREEN &&
        direction !== EUserDirection.NONE
      ) {
        gameState = EGameState.GAME;
      } else {
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

    // spawnCars();

    //row 4 - empty

    // spawnLogs();
  };

  p5.draw = () => {
    if (gameState === EGameState.START_SCREEN) {
      startingScreen(p5);
    } else if (gameState === EGameState.GAME) {
      //general
      scenery.draw();

      //cars
      for (let i = 0; i < cars.length; i++) {
        // cars[i].update();
        // cars[i].draw();

        if (frog.overlaps(cars[i])) {
          gameOver();
        }
      }

      //logs
      for (let i = 0; i < logs.length; i++) {
        // logs[i].update();
        // logs[i].drawLog();
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
          gameOver();
        }
      } else {
        frog.attach(null);
      }

      frog.update();
      frog.draw();

      //text
      p5.push();
      p5.fill("#FFF");
      // textFont(pixelFont);
      p5.textSize(24);
      p5.text("time: " + Math.round(countdown / 36) + "s", 450, 25);
      p5.text("score: " + score + "p", 20, 25);
      p5.pop();

      //game mechanics
      if (gameIsActive === true) {
        countdown = countdown - 1;
      }

      if (countdown < 0) {
        gameIsActive = false;
        gameState = EGameState.OUT_OF_TIME;
        resetGame(p5);
      }

      frog.checkForWin(canvasWidth, 100);
    }
  };

  p5.keyPressed = () => {
    const { keyCode, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW } = p5;
    if (gameState === EGameState.START_SCREEN && keyCode === KEYCODE_SPACE) {
      gameState = EGameState.GAME;
    }

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
    if (gameState === EGameState.GAME_OVER && keyCode === KEYCODE_SPACE) {
      gameState = EGameState.GAME;
      score = 0;
    }

    if (gameState === EGameState.OUT_OF_TIME && keyCode === KEYCODE_SPACE) {
      gameState = EGameState.GAME;
      score = 0;
    }
  };
};

export default function Page() {
  const { sdkHasLoaded, user } = useDynamicContext();
  const { telegramSignIn } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { address, isConnected, chain } = useAccount();
  const [userDirection, setUserDirection] = useState<{
    direction: EUserDirection;
    key: number;
  }>({
    direction: EUserDirection.NONE,
    key: 0,
  });

  useEffect(() => {
    console.log("sdkHasLoaded", sdkHasLoaded);
    if (!sdkHasLoaded) return;

    const signIn = async () => {
      if (!user) {
        await telegramSignIn({ forceCreateUser: true });
      }
      setIsLoading(false);
    };

    signIn();
  }, [sdkHasLoaded]);

  const handleDirectionChange = (direction: EUserDirection) => {
    setUserDirection({
      direction,
      key: Date.now(), // Use the current timestamp as a unique key
    });
  };

  return (
    <>
      <main className="py-3 flex flex-row justify-between items-center space-y-3 w-[400px]">
        <img src="./efrogr.png" alt="Efrogr by Locker" className="w-12" />
        {!isLoading && <DynamicWidget />}
      </main>
      <div className="flex flex-col items-center w-[400px] min-h-[90vh]">
        <GameBanner />
        <div>
          {isLoading ? (
            <Spinner />
          ) : isConnected ? (
            <NextReactP5Wrapper sketch={sketch} userDirection={userDirection} />
          ) : null}
        </div>
        <div className="mt-4 flex flex-col space-y-1 w-2/3 text-sm">
          <button
            onClick={() => handleDirectionChange(EUserDirection.UP)}
            className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
          >
            &#8593; Up &#8593;
          </button>
          <div className="flex space-x-1 flex-row">
            <button
              onClick={() => handleDirectionChange(EUserDirection.LEFT)}
              className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
            >
              &#8592; Left
            </button>
            <button
              onClick={() => handleDirectionChange(EUserDirection.RIGHT)}
              className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
            >
              Right &#8594;
            </button>
          </div>
          <button
            onClick={() => handleDirectionChange(EUserDirection.DOWN)}
            className="rounded-md bg-locker-500 text-white px-4 py-4 w-full"
          >
            &#8595; Down &#8595;
          </button>
        </div>
        <GameInfo />
      </div>

      <footer className="py-5 bg-locker-200 w-full mt-5 flex justify-center">
        <div className="w-[400px] flex justify-center flex-col space-y-2">
          <div className="flex flex-row justify-center space-x-2">
            <Link
              href="https://twitter.com/locker_money"
              className="footer-text text-center text-sm text-gray-700"
            >
              X
            </Link>
            <Link
              href="https://discord.gg/locker"
              className="footer-text text-center text-sm text-gray-700"
            >
              Telegram
            </Link>
          </div>
          <div className="flex flex-row justify-center">
            <Link
              href="https://locker.money"
              className="footer-text text-center text-sm text-gray-700"
            >
              Made by Locker
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
