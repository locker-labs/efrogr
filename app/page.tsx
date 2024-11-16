/* eslint-disable */

"use client"

import React from "react";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { canvasHeight, canvasWidth, grid } from "@/lib/constants";

//IMPORT
import Frog from "@/game-objects/frog.js";
import Car from "@/game-objects/car.js";
import Log from "@/game-objects/log.js";
import Scenery from "@/game-objects/scenery.js";

//VARIABLES
// class variabless
let frog;
let cars = [];
let logs = [];
let scenery;

let gameState = 1;

let countdown = 360;
let score = 0;
let level = 1;
let gameIsActive = true;


function gameOver() {
  gameState = 3;
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
    cars[i].update();
    cars[i].draw();

    if (frog.overlaps(cars[i])) {
      // gameOver();
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
  p5.text("Welcome to Frogger", canvasWidth / 2, canvasHeight / 2 - 20);
  p5.textSize(16);
  p5.text(
    "Press Spacebar to Start, Good Luck!",
    canvasWidth / 2,
    canvasHeight / 2 + 10
  );
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
    0.1
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


const sketch: Sketch = (p5) => {
  p5.setup = () => {
    // p5.preload();
    p5.createCanvas(canvasWidth, canvasHeight);
    p5.frameRate(30);
    resetGame(p5);
  
    // spawnCars();
  
    //row 4 - empty
  
    // spawnLogs();
  }

  p5.draw = () => {
    if (gameState === 1) {
      startingScreen(p5);
    } 
  };
};

export default function Page() {
  return <NextReactP5Wrapper sketch={sketch} />;
}