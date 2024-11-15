import Hitbox from "./hitbox.js";

//variable imports
import { canvasWidth } from "./game.js";
import { grid } from "./game.js";

export default class Log extends Hitbox {
  constructor(x, y, width, height, speed, size) {
    super(x, y, width, height);
    this.speed = speed;
    this.size = size;
  }

  drawLog() {
    let s = this.size;

    const logColor = {
      outline: "#61433d",
      darkBrown1: "#674f33",
      darkBrown2: "#796743",
      brown: "#93754f",
      lightBrown: "#ae9a6c",
      hole: "#3d2b27",
    };
    push();
    noStroke();
    translate(this.x, this.y);

    //mid brown parts
    fill(logColor.brown);
    rect(20 * s, 13 * s, 350 * s, 100 * s);
    rect(10 * s, 30 * s, 10 * s, 60 * s);
    rect(370 * s, 20 * s, 30 * s, 80 * s);

    //outline
    fill(logColor.outline);
    rect(0 * s, 30 * s, 10 * s, 70 * s);
    rect(10 * s, 10 * s, 10 * s, 20 * s);
    rect(10 * s, 100 * s, 10 * s);
    rect(20 * s, 0 * s, 390 * s, 10 * s);
    rect(20 * s, 110 * s, 350 * s, 10 * s);
    rect(370 * s, 100 * s, 40 * s, 10 * s);
    rect(380 * s, 30 * s, 10 * s, 50 * s);
    rect(390 * s, 10 * s, 30 * s, 10 * s);
    rect(390 * s, 20 * s, 10 * s, 20 * s);
    rect(390 * s, 70 * s, 10 * s, 20 * s);
    rect(400 * s, 80 * s, 10 * s, 20 * s);
    rect(410 * s, 20 * s, 10 * s, 10 * s);
    rect(410 * s, 70 * s, 10 * s, 30 * s);
    rect(420 * s, 20 * s, 10 * s, 60 * s);

    //light parts
    fill(logColor.lightBrown);
    rect(20 * s, 10 * s, 370 * s, 10 * s);
    rect(10 * s, 40 * s, 100 * s, 10 * s);
    rect(110 * s, 20 * s, 20 * s, 10 * s);
    rect(120 * s, 30 * s, 10 * s);
    rect(130 * s, 40 * s, 20 * s, 10 * s);
    rect(140 * s, 20 * s, 10 * s, 20 * s);
    rect(190 * s, 40 * s, 60 * s, 10 * s);
    rect(250 * s, 50 * s, 30 * s, 10 * s);
    rect(280 * s, 40 * s, 100 * s, 10 * s);

    //darker parts
    fill(logColor.darkBrown1);
    rect(10 * s, 90 * s, 130 * s, 10 * s);
    rect(150 * s, 80 * s, 100 * s, 10 * s);
    rect(260 * s, 80 * s, 130 * s, 10 * s);

    fill(logColor.darkBrown2);
    rect(10 * s, 50 * s, 240 * s, 10 * s);
    rect(280 * s, 50 * s, 100 * s, 10 * s);
    rect(110 * s, 40 * s, 20 * s, 10 * s);
    rect(150 * s, 40 * s, 10 * s);
    rect(250 * s, 40 * s, 20 * s, 10 * s);
    rect(260 * s, 30 * s, 20 * s, 10 * s);

    //the hole of the log
    fill(logColor.hole);
    rect(400 * s, 30 * s, 20 * s, 40 * s);
    rect(400 * s, 20 * s, 10 * s, 60 * s);
    rect(390 * s, 40 * s, 10 * s, 30 * s);
    pop();
  }

  update() {
    this.x = this.x + this.speed;

    if (this.speed > 0 && this.x > canvasWidth + grid) {
      this.x = -this.width - grid;
    } else if (this.speed < 0 && this.x < -this.width - grid) {
      this.x = canvasWidth + grid;
    }
  }
}
