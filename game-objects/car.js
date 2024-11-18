import Hitbox from "./hitbox.js";

//variable imports
import { canvasWidth, grid } from "@/lib/constants";

export default class Car extends Hitbox {
  constructor(x, y, width, height, speed, size, color, flipped, p5) {
    super(x, y, width, height);
    this.speed = speed;
    this.size = size;
    this.color = color;
    this.flipped = flipped;
    this.p5 = p5;
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

    this.p5.push();
    this.p5.noStroke();

    this.p5.translate(this.x, this.y);

    //flipping if car is driving the other way
    if (this.flipped === true) {
      //Garrit was here (lol)
      this.p5.translate(this.width, 0);
      this.p5.scale(-1, 1);
    }

    //outline
    this.p5.fill(carColor.outline);
    this.p5.rect(0 * s, 40 * s, 10 * s, 160 * s);
    this.p5.rect(10 * s, 30 * s, 10 * s);
    this.p5.rect(10 * s, 50 * s, 10 * s);
    this.p5.rect(10 * s, 200 * s, 10 * s);
    this.p5.rect(10 * s, 180 * s, 10 * s);
    this.p5.rect(20 * s, 20 * s, 240 * s, 10 * s);
    this.p5.rect(20 * s, 40 * s, 60 * s, 10 * s);
    this.p5.rect(20 * s, 190 * s, 60 * s, 10 * s);
    this.p5.rect(20 * s, 210 * s, 240 * s, 10 * s);
    this.p5.rect(60 * s, 90 * s, 10 * s, 60 * s);
    this.p5.rect(70 * s, 40 * s, 10 * s, 50 * s);
    this.p5.rect(70 * s, 150 * s, 10 * s, 50 * s);
    this.p5.rect(80 * s, 50 * s, 30 * s, 10 * s);
    this.p5.rect(80 * s, 180 * s, 30 * s, 10 * s);
    this.p5.rect(100 * s, 30 * s, 10 * s);
    this.p5.rect(100 * s, 200 * s, 10 * s);
    this.p5.rect(110 * s, 40 * s, 100 * s, 10 * s);
    this.p5.rect(110 * s, 190 * s, 100 * s, 10 * s);
    this.p5.rect(180 * s, 200 * s, 10 * s);
    this.p5.rect(180 * s, 30 * s, 10 * s);
    this.p5.rect(210 * s, 50 * s, 30 * s, 10 * s);
    this.p5.rect(210 * s, 180 * s, 30 * s, 10 * s);
    this.p5.rect(240 * s, 190 * s, 30 * s, 10 * s);
    this.p5.rect(240 * s, 150 * s, 10 * s, 30 * s);
    this.p5.rect(240 * s, 60 * s, 10 * s, 30 * s);
    this.p5.rect(240 * s, 40 * s, 30 * s, 10 * s);
    this.p5.rect(250 * s, 90 * s, 10 * s, 60 * s);
    this.p5.rect(250 * s, 10 * s, 10 * s);
    this.p5.rect(250 * s, 220 * s, 10 * s);
    this.p5.rect(260 * s, 0 * s, 10 * s);
    this.p5.rect(260 * s, 230 * s, 10 * s);
    this.p5.rect(260 * s, 30 * s, 40 * s, 10 * s);
    this.p5.rect(260 * s, 200 * s, 40 * s, 10 * s);
    this.p5.rect(270 * s, 10 * s, 10 * s);
    this.p5.rect(270 * s, 220 * s, 10 * s);
    this.p5.rect(270 * s, 20 * s, 150 * s, 10 * s);
    this.p5.rect(270 * s, 210 * s, 150 * s, 10 * s);
    this.p5.rect(290 * s, 40 * s, 10 * s, 20 * s);
    this.p5.rect(290 * s, 180 * s, 10 * s, 20 * s);
    this.p5.rect(300 * s, 60 * s, 10 * s, 30 * s);
    this.p5.rect(300 * s, 150 * s, 10 * s, 30 * s);
    this.p5.rect(310 * s, 90 * s, 10 * s, 60 * s);
    this.p5.rect(390 * s, 30 * s, 10 * s);
    this.p5.rect(390 * s, 200 * s, 10 * s);
    this.p5.rect(400 * s, 40 * s, 10 * s);
    this.p5.rect(400 * s, 190 * s, 10 * s);
    this.p5.rect(410 * s, 50 * s, 10 * s, 20 * s);
    this.p5.rect(410 * s, 170 * s, 10 * s, 20 * s);
    this.p5.rect(420 * s, 70 * s, 10 * s, 100 * s);
    this.p5.rect(420 * s, 30 * s, 10 * s);
    this.p5.rect(420 * s, 200 * s, 10 * s);
    this.p5.rect(430 * s, 40 * s, 10 * s);
    this.p5.rect(430 * s, 190 * s, 10 * s);
    this.p5.rect(440 * s, 50 * s, 10 * s, 20 * s);
    this.p5.rect(440 * s, 170 * s, 10 * s, 20 * s);
    this.p5.rect(450 * s, 70 * s, 10 * s, 100 * s);

    //windshield
    this.p5.fill(carColor.windshield);
    this.p5.rect(110 * s, 30 * s, 70 * s, 10 * s);
    this.p5.rect(110 * s, 200 * s, 70 * s, 10 * s);
    this.p5.rect(190 * s, 30 * s, 70 * s, 10 * s);
    this.p5.rect(190 * s, 200 * s, 70 * s, 10 * s);
    this.p5.rect(210 * s, 40 * s, 30 * s, 10 * s);
    this.p5.rect(210 * s, 190 * s, 30 * s, 10 * s);
    this.p5.rect(240 * s, 50 * s, 10 * s);
    this.p5.rect(240 * s, 180 * s, 10 * s);
    this.p5.rect(250 * s, 50 * s, 10 * s, 40 * s);
    this.p5.rect(250 * s, 150 * s, 10 * s, 40 * s);
    this.p5.rect(260 * s, 50 * s, 30 * s, 140 * s);
    this.p5.rect(270 * s, 40 * s, 20 * s, 10 * s);
    this.p5.rect(270 * s, 190 * s, 20 * s, 10 * s);
    this.p5.rect(290 * s, 90 * s, 20 * s, 60 * s);
    this.p5.rect(290 * s, 60 * s, 10 * s, 120 * s);

    //windshield highlights
    this.p5.fill(carColor.highlight);
    this.p5.rect(140 * s, 30 * s, 10 * s);
    this.p5.rect(140 * s, 200 * s, 10 * s);
    this.p5.rect(220 * s, 190 * s, 10 * s);
    this.p5.rect(230 * s, 200 * s, 10 * s);
    this.p5.rect(220 * s, 40 * s, 10 * s);
    this.p5.rect(230 * s, 30 * s, 10 * s);
    this.p5.rect(260 * s, 70 * s, 10 * s);
    this.p5.rect(270 * s, 60 * s, 20 * s, 10 * s);

    //random car color (red, blue or yellow)
    let randomCarColor = this.color;
    // let lightCarColor;
    // let normalCarColor;
    // let darkCarColor;

    //light parts of the car
    if (randomCarColor === 0) {
      //red
      this.p5.fill(carColor.lightRed);
    } else if (randomCarColor === 1) {
      //blue
      this.p5.fill(carColor.lightBlue);
    } else if (randomCarColor === 2) {
      //yellow
      this.p5.fill(carColor.lightYellow);
    }
    this.p5.rect(10 * s, 40 * s, 10 * s);
    this.p5.rect(10 * s, 60 * s, 20 * s, 20 * s);
    this.p5.rect(10 * s, 80 * s, 10 * s);
    this.p5.rect(20 * s, 30 * s, 80 * s, 10 * s);
    this.p5.rect(20 * s, 50 * s, 50 * s, 20 * s);
    this.p5.rect(80 * s, 40 * s, 30 * s, 10 * s);
    this.p5.rect(80 * s, 60 * s, 30 * s, 20 * s);
    this.p5.rect(80 * s, 80 * s, 10 * s);
    this.p5.rect(110 * s, 50 * s, 100 * s, 10 * s);
    this.p5.rect(110 * s, 60 * s, 20 * s, 10 * s);
    this.p5.rect(190 * s, 60 * s, 50 * s, 10 * s);
    this.p5.rect(220 * s, 70 * s, 20 * s, 10 * s);
    this.p5.rect(230 * s, 80 * s, 10 * s);
    this.p5.rect(300 * s, 30 * s, 90 * s, 20 * s);
    this.p5.rect(300 * s, 50 * s, 10 * s);
    this.p5.rect(390 * s, 40 * s, 10 * s, 20 * s);
    this.p5.rect(400 * s, 30 * s, 10 * s);
    this.p5.rect(410 * s, 40 * s, 10 * s);
    this.p5.rect(420 * s, 50 * s, 10 * s, 20 * s);
    this.p5.rect(400 * s, 50 * s, 10 * s, 30 * s);
    this.p5.rect(410 * s, 70 * s, 10 * s, 20 * s);

    //normal colored parts of the car
    if (randomCarColor === 0) {
      //red
      this.p5.fill(carColor.red);
    } else if (randomCarColor === 1) {
      //blue
      this.p5.fill(carColor.blue);
    } else if (randomCarColor === 2) {
      //yellow
      this.p5.fill(carColor.yellow);
    }
    this.p5.rect(10 * s, 90 * s, 50 * s, 40 * s);
    this.p5.rect(20 * s, 80 * s, 40 * s, 80 * s);
    this.p5.rect(30 * s, 70 * s, 20 * s, 100 * s);
    this.p5.rect(50 * s, 70 * s, 20 * s);
    this.p5.rect(50 * s, 150 * s, 20 * s);
    this.p5.rect(70 * s, 90 * s, 180 * s, 60 * s);
    this.p5.rect(90 * s, 80 * s, 140 * s, 90 * s);
    this.p5.rect(110 * s, 70 * s, 110 * s, 110 * s);
    this.p5.rect(130 * s, 60 * s, 60 * s, 10 * s);
    this.p5.rect(260 * s, 10 * s, 10 * s, 20 * s);
    this.p5.rect(260 * s, 210 * s, 10 * s, 20 * s);
    this.p5.rect(310 * s, 50 * s, 80 * s, 40 * s);
    this.p5.rect(310 * s, 150 * s, 80 * s, 40 * s);
    this.p5.rect(320 * s, 90 * s, 100 * s, 60 * s);
    this.p5.rect(390 * s, 60 * s, 10 * s, 30 * s);
    this.p5.rect(390 * s, 150 * s, 20 * s);
    this.p5.rect(390 * s, 170 * s, 10 * s);
    this.p5.rect(400 * s, 80 * s, 10 * s);
    this.p5.rect(400 * s, 200 * s, 10 * s);
    this.p5.rect(410 * s, 30 * s, 10 * s);
    this.p5.rect(410 * s, 190 * s, 10 * s);
    this.p5.rect(420 * s, 40 * s, 10 * s);
    this.p5.rect(420 * s, 170 * s, 10 * s, 20 * s);
    this.p5.rect(430 * s, 60 * s, 10 * s, 120 * s);

    //dark colored parts of the car
    if (randomCarColor === 0) {
      //red
      this.p5.fill(carColor.darkRed);
    } else if (randomCarColor === 1) {
      //blue
      this.p5.fill(carColor.darkBlue);
    } else if (randomCarColor === 2) {
      //yellow
      this.p5.fill(carColor.darkYellow);
    }
    this.p5.rect(10 * s, 130 * s, 10 * s, 50 * s);
    this.p5.rect(10 * s, 190 * s, 10 * s);
    this.p5.rect(20 * s, 170 * s, 50 * s, 20 * s);
    this.p5.rect(20 * s, 160 * s, 10 * s);
    this.p5.rect(20 * s, 200 * s, 80 * s, 10 * s);
    this.p5.rect(80 * s, 190 * s, 30 * s, 10 * s);
    this.p5.rect(80 * s, 150 * s, 10 * s, 30 * s);
    this.p5.rect(90 * s, 170 * s, 20 * s, 10 * s);
    this.p5.rect(110 * s, 180 * s, 100 * s, 10 * s);
    this.p5.rect(210 * s, 170 * s, 30 * s, 10 * s);
    this.p5.rect(230 * s, 150 * s, 10 * s, 20 * s);
    this.p5.rect(300 * s, 180 * s, 10 * s);
    this.p5.rect(300 * s, 190 * s, 90 * s, 20 * s);
    this.p5.rect(390 * s, 180 * s, 10 * s, 20 * s);
    this.p5.rect(400 * s, 170 * s, 10 * s, 20 * s);
    this.p5.rect(410 * s, 150 * s, 10 * s, 20 * s);
    this.p5.rect(410 * s, 200 * s, 10 * s);
    this.p5.rect(420 * s, 190 * s, 10 * s);
    this.p5.rect(430 * s, 180 * s, 10 * s);
    this.p5.rect(430 * s, 50 * s, 10 * s);
    this.p5.rect(440 * s, 70 * s, 10 * s, 100 * s);
    this.p5.pop();
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
