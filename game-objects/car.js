import Hitbox from "./hitbox.js";

//variable imports
import { grid } from "./game.js";
import { canvasWidth } from "./game.js";

export default class Car extends Hitbox {
  constructor(x, y, width, height, speed, size, color, flipped) {
    super(x, y, width, height);
    this.speed = speed;
    this.size = size;
    this.color = color;
    this.flipped = flipped;
  }

  draw() {
    const carColor = {
      outline: "#282828",
      windshield: "#93e7e8",
      highlight: "#FFF",

      //red car
      lightRed: "#d9705b",
      red: "#c83d28",
      darkRed: "#910100",

      //blue car
      lightBlue: "#5b67d9",
      blue: "#283ec8",
      darkBlue: "#002491",

      //yellow car
      lightYellow: "#d9cc5b",
      yellow: "#c8b128",
      darkYellow: "#916c00",
    };

    let s = this.size;

    push();
    noStroke();

    translate(this.x, this.y);

    //flipping if car is driving the other way
    if (this.flipped === true) {
      //Garrit was here (lol)
      translate(this.width, 0);
      scale(-1, 1);
    }

    //outline
    fill(carColor.outline);
    rect(0 * s, 40 * s, 10 * s, 160 * s);
    rect(10 * s, 30 * s, 10 * s);
    rect(10 * s, 50 * s, 10 * s);
    rect(10 * s, 200 * s, 10 * s);
    rect(10 * s, 180 * s, 10 * s);
    rect(20 * s, 20 * s, 240 * s, 10 * s);
    rect(20 * s, 40 * s, 60 * s, 10 * s);
    rect(20 * s, 190 * s, 60 * s, 10 * s);
    rect(20 * s, 210 * s, 240 * s, 10 * s);
    rect(60 * s, 90 * s, 10 * s, 60 * s);
    rect(70 * s, 40 * s, 10 * s, 50 * s);
    rect(70 * s, 150 * s, 10 * s, 50 * s);
    rect(80 * s, 50 * s, 30 * s, 10 * s);
    rect(80 * s, 180 * s, 30 * s, 10 * s);
    rect(100 * s, 30 * s, 10 * s);
    rect(100 * s, 200 * s, 10 * s);
    rect(110 * s, 40 * s, 100 * s, 10 * s);
    rect(110 * s, 190 * s, 100 * s, 10 * s);
    rect(180 * s, 200 * s, 10 * s);
    rect(180 * s, 30 * s, 10 * s);
    rect(210 * s, 50 * s, 30 * s, 10 * s);
    rect(210 * s, 180 * s, 30 * s, 10 * s);
    rect(240 * s, 190 * s, 30 * s, 10 * s);
    rect(240 * s, 150 * s, 10 * s, 30 * s);
    rect(240 * s, 60 * s, 10 * s, 30 * s);
    rect(240 * s, 40 * s, 30 * s, 10 * s);
    rect(250 * s, 90 * s, 10 * s, 60 * s);
    rect(250 * s, 10 * s, 10 * s);
    rect(250 * s, 220 * s, 10 * s);
    rect(260 * s, 0 * s, 10 * s);
    rect(260 * s, 230 * s, 10 * s);
    rect(260 * s, 30 * s, 40 * s, 10 * s);
    rect(260 * s, 200 * s, 40 * s, 10 * s);
    rect(270 * s, 10 * s, 10 * s);
    rect(270 * s, 220 * s, 10 * s);
    rect(270 * s, 20 * s, 150 * s, 10 * s);
    rect(270 * s, 210 * s, 150 * s, 10 * s);
    rect(290 * s, 40 * s, 10 * s, 20 * s);
    rect(290 * s, 180 * s, 10 * s, 20 * s);
    rect(300 * s, 60 * s, 10 * s, 30 * s);
    rect(300 * s, 150 * s, 10 * s, 30 * s);
    rect(310 * s, 90 * s, 10 * s, 60 * s);
    rect(390 * s, 30 * s, 10 * s);
    rect(390 * s, 200 * s, 10 * s);
    rect(400 * s, 40 * s, 10 * s);
    rect(400 * s, 190 * s, 10 * s);
    rect(410 * s, 50 * s, 10 * s, 20 * s);
    rect(410 * s, 170 * s, 10 * s, 20 * s);
    rect(420 * s, 70 * s, 10 * s, 100 * s);
    rect(420 * s, 30 * s, 10 * s);
    rect(420 * s, 200 * s, 10 * s);
    rect(430 * s, 40 * s, 10 * s);
    rect(430 * s, 190 * s, 10 * s);
    rect(440 * s, 50 * s, 10 * s, 20 * s);
    rect(440 * s, 170 * s, 10 * s, 20 * s);
    rect(450 * s, 70 * s, 10 * s, 100 * s);

    //windshield
    fill(carColor.windshield);
    rect(110 * s, 30 * s, 70 * s, 10 * s);
    rect(110 * s, 200 * s, 70 * s, 10 * s);
    rect(190 * s, 30 * s, 70 * s, 10 * s);
    rect(190 * s, 200 * s, 70 * s, 10 * s);
    rect(210 * s, 40 * s, 30 * s, 10 * s);
    rect(210 * s, 190 * s, 30 * s, 10 * s);
    rect(240 * s, 50 * s, 10 * s);
    rect(240 * s, 180 * s, 10 * s);
    rect(250 * s, 50 * s, 10 * s, 40 * s);
    rect(250 * s, 150 * s, 10 * s, 40 * s);
    rect(260 * s, 50 * s, 30 * s, 140 * s);
    rect(270 * s, 40 * s, 20 * s, 10 * s);
    rect(270 * s, 190 * s, 20 * s, 10 * s);
    rect(290 * s, 90 * s, 20 * s, 60 * s);
    rect(290 * s, 60 * s, 10 * s, 120 * s);

    //windshield highlights
    fill(carColor.highlight);
    rect(140 * s, 30 * s, 10 * s);
    rect(140 * s, 200 * s, 10 * s);
    rect(220 * s, 190 * s, 10 * s);
    rect(230 * s, 200 * s, 10 * s);
    rect(220 * s, 40 * s, 10 * s);
    rect(230 * s, 30 * s, 10 * s);
    rect(260 * s, 70 * s, 10 * s);
    rect(270 * s, 60 * s, 20 * s, 10 * s);

    //random car color (red, blue or yellow)
    let randomCarColor = this.color;
    // let lightCarColor;
    // let normalCarColor;
    // let darkCarColor;

    //light parts of the car
    if (randomCarColor === 0) {
      //red
      fill(carColor.lightRed);
    } else if (randomCarColor === 1) {
      //blue
      fill(carColor.lightBlue);
    } else if (randomCarColor === 2) {
      //yellow
      fill(carColor.lightYellow);
    }
    rect(10 * s, 40 * s, 10 * s);
    rect(10 * s, 60 * s, 20 * s, 20 * s);
    rect(10 * s, 80 * s, 10 * s);
    rect(20 * s, 30 * s, 80 * s, 10 * s);
    rect(20 * s, 50 * s, 50 * s, 20 * s);
    rect(80 * s, 40 * s, 30 * s, 10 * s);
    rect(80 * s, 60 * s, 30 * s, 20 * s);
    rect(80 * s, 80 * s, 10 * s);
    rect(110 * s, 50 * s, 100 * s, 10 * s);
    rect(110 * s, 60 * s, 20 * s, 10 * s);
    rect(190 * s, 60 * s, 50 * s, 10 * s);
    rect(220 * s, 70 * s, 20 * s, 10 * s);
    rect(230 * s, 80 * s, 10 * s);
    rect(300 * s, 30 * s, 90 * s, 20 * s);
    rect(300 * s, 50 * s, 10 * s);
    rect(390 * s, 40 * s, 10 * s, 20 * s);
    rect(400 * s, 30 * s, 10 * s);
    rect(410 * s, 40 * s, 10 * s);
    rect(420 * s, 50 * s, 10 * s, 20 * s);
    rect(400 * s, 50 * s, 10 * s, 30 * s);
    rect(410 * s, 70 * s, 10 * s, 20 * s);

    //normal colored parts of the car
    if (randomCarColor === 0) {
      //red
      fill(carColor.red);
    } else if (randomCarColor === 1) {
      //blue
      fill(carColor.blue);
    } else if (randomCarColor === 2) {
      //yellow
      fill(carColor.yellow);
    }
    rect(10 * s, 90 * s, 50 * s, 40 * s);
    rect(20 * s, 80 * s, 40 * s, 80 * s);
    rect(30 * s, 70 * s, 20 * s, 100 * s);
    rect(50 * s, 70 * s, 20 * s);
    rect(50 * s, 150 * s, 20 * s);
    rect(70 * s, 90 * s, 180 * s, 60 * s);
    rect(90 * s, 80 * s, 140 * s, 90 * s);
    rect(110 * s, 70 * s, 110 * s, 110 * s);
    rect(130 * s, 60 * s, 60 * s, 10 * s);
    rect(260 * s, 10 * s, 10 * s, 20 * s);
    rect(260 * s, 210 * s, 10 * s, 20 * s);
    rect(310 * s, 50 * s, 80 * s, 40 * s);
    rect(310 * s, 150 * s, 80 * s, 40 * s);
    rect(320 * s, 90 * s, 100 * s, 60 * s);
    rect(390 * s, 60 * s, 10 * s, 30 * s);
    rect(390 * s, 150 * s, 20 * s);
    rect(390 * s, 170 * s, 10 * s);
    rect(400 * s, 80 * s, 10 * s);
    rect(400 * s, 200 * s, 10 * s);
    rect(410 * s, 30 * s, 10 * s);
    rect(410 * s, 190 * s, 10 * s);
    rect(420 * s, 40 * s, 10 * s);
    rect(420 * s, 170 * s, 10 * s, 20 * s);
    rect(430 * s, 60 * s, 10 * s, 120 * s);

    //dark colored parts of the car
    if (randomCarColor === 0) {
      //red
      fill(carColor.darkRed);
    } else if (randomCarColor === 1) {
      //blue
      fill(carColor.darkBlue);
    } else if (randomCarColor === 2) {
      //yellow
      fill(carColor.darkYellow);
    }
    rect(10 * s, 130 * s, 10 * s, 50 * s);
    rect(10 * s, 190 * s, 10 * s);
    rect(20 * s, 170 * s, 50 * s, 20 * s);
    rect(20 * s, 160 * s, 10 * s);
    rect(20 * s, 200 * s, 80 * s, 10 * s);
    rect(80 * s, 190 * s, 30 * s, 10 * s);
    rect(80 * s, 150 * s, 10 * s, 30 * s);
    rect(90 * s, 170 * s, 20 * s, 10 * s);
    rect(110 * s, 180 * s, 100 * s, 10 * s);
    rect(210 * s, 170 * s, 30 * s, 10 * s);
    rect(230 * s, 150 * s, 10 * s, 20 * s);
    rect(300 * s, 180 * s, 10 * s);
    rect(300 * s, 190 * s, 90 * s, 20 * s);
    rect(390 * s, 180 * s, 10 * s, 20 * s);
    rect(400 * s, 170 * s, 10 * s, 20 * s);
    rect(410 * s, 150 * s, 10 * s, 20 * s);
    rect(410 * s, 200 * s, 10 * s);
    rect(420 * s, 190 * s, 10 * s);
    rect(430 * s, 180 * s, 10 * s);
    rect(430 * s, 50 * s, 10 * s);
    rect(440 * s, 70 * s, 10 * s, 100 * s);
    pop();
  }

  update() {
    this.x = this.x + this.speed;

    if (this.speed > 0 && this.x > canvasWidth + grid) {
      this.x = -this.width - grid;
    } else if (this.speed < 0 && this.x < -this.width - grid) {
      if (this.flipped === true) {
        this.x = canvasWidth + grid + this.width;
      } else {
        this.x = canvasWidth + grid;
      }
    }
  }
}
