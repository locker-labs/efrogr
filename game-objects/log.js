import Hitbox from "./hitbox.js";

//variable imports
import { canvasWidth } from "@/lib/constants";
import { grid } from "@/lib/constants";

export default class Log extends Hitbox {
  constructor(x, y, width, height, speed, size, p5) {
    super(x, y, width, height);
    this.speed = speed;
    this.size = size;
    this.p5 = p5;
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
    this.p5.push();
    this.p5.noStroke();
    this.p5.translate(this.x, this.y);

    //mid brown parts
    this.p5.fill(logColor.brown);
    this.p5.rect(20 * s, 13 * s, 350 * s, 100 * s);
    this.p5.rect(10 * s, 30 * s, 10 * s, 60 * s);
    this.p5.rect(370 * s, 20 * s, 30 * s, 80 * s);

    //outline
    this.p5.fill(logColor.outline);
    this.p5.rect(0 * s, 30 * s, 10 * s, 70 * s);
    this.p5.rect(10 * s, 10 * s, 10 * s, 20 * s);
    this.p5.rect(10 * s, 100 * s, 10 * s);
    this.p5.rect(20 * s, 0 * s, 390 * s, 10 * s);
    this.p5.rect(20 * s, 110 * s, 350 * s, 10 * s);
    this.p5.rect(370 * s, 100 * s, 40 * s, 10 * s);
    this.p5.rect(380 * s, 30 * s, 10 * s, 50 * s);
    this.p5.rect(390 * s, 10 * s, 30 * s, 10 * s);
    this.p5.rect(390 * s, 20 * s, 10 * s, 20 * s);
    this.p5.rect(390 * s, 70 * s, 10 * s, 20 * s);
    this.p5.rect(400 * s, 80 * s, 10 * s, 20 * s);
    this.p5.rect(410 * s, 20 * s, 10 * s, 10 * s);
    this.p5.rect(410 * s, 70 * s, 10 * s, 30 * s);
    this.p5.rect(420 * s, 20 * s, 10 * s, 60 * s);

    //light parts
    this.p5.fill(logColor.lightBrown);
    this.p5.rect(20 * s, 10 * s, 370 * s, 10 * s);
    this.p5.rect(10 * s, 40 * s, 100 * s, 10 * s);
    this.p5.rect(110 * s, 20 * s, 20 * s, 10 * s);
    this.p5.rect(120 * s, 30 * s, 10 * s);
    this.p5.rect(130 * s, 40 * s, 20 * s, 10 * s);
    this.p5.rect(140 * s, 20 * s, 10 * s, 20 * s);
    this.p5.rect(190 * s, 40 * s, 60 * s, 10 * s);
    this.p5.rect(250 * s, 50 * s, 30 * s, 10 * s);
    this.p5.rect(280 * s, 40 * s, 100 * s, 10 * s);

    //darker parts
    this.p5.fill(logColor.darkBrown1);
    this.p5.rect(10 * s, 90 * s, 130 * s, 10 * s);
    this.p5.rect(150 * s, 80 * s, 100 * s, 10 * s);
    this.p5.rect(260 * s, 80 * s, 130 * s, 10 * s);

    this.p5.fill(logColor.darkBrown2);
    this.p5.rect(10 * s, 50 * s, 240 * s, 10 * s);
    this.p5.rect(280 * s, 50 * s, 100 * s, 10 * s);
    this.p5.rect(110 * s, 40 * s, 20 * s, 10 * s);
    this.p5.rect(150 * s, 40 * s, 10 * s);
    this.p5.rect(250 * s, 40 * s, 20 * s, 10 * s);
    this.p5.rect(260 * s, 30 * s, 20 * s, 10 * s);

    //the hole of the log
    this.p5.fill(logColor.hole);
    this.p5.rect(400 * s, 30 * s, 20 * s, 40 * s);
    this.p5.rect(400 * s, 20 * s, 10 * s, 60 * s);
    this.p5.rect(390 * s, 40 * s, 10 * s, 30 * s);
    this.p5.pop();
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
