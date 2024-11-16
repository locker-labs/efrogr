import Hitbox from "./hitbox.js";
import { grid } from "@/lib/constants";
import { canvasHeight, canvasWidth } from "@/lib/constants";

export default class Frog extends Hitbox {
  constructor(x, y, width, s, gameWon, p5) {
    super(x, y, width, width);
    this.attached = null;
    this.size = s;
    this.gameWon = gameWon;
    this.p5 = p5;
  }

  attach(log) {
    this.attached = log;
  }

  update() {
    if (this.attached !== null) {
      this.x = this.x + this.attached.speed;
    }
  }

  // Draws the frog
  draw() {
    //fill(0, 255, 0);
    //rect(this.x, this.y, this.width, this.width);
    const frogColor = {
      outline: "#21391f",
      darkGreen: "#476422",
      green: "#588425",
      lightGreen: "#69992c",
      lightestGreen: "#92c84e",
      superLightGreen: "#b5e671",
    };

    let s = this.size;
    //outline
    this.p5.push();
    this.p5.noStroke();
    this.p5.translate(this.x, this.y);
    this.p5.fill(frogColor.outline);
    this.p5.rect(0 * s, 20 * s, 10 * s);
    this.p5.rect(10 * s, 10 * s, 10 * s);
    this.p5.rect(10 * s, 30 * s, 10 * s);
    this.p5.rect(20 * s, 10 * s, 10 * s);
    this.p5.rect(20 * s, 20 * s, 10 * s);
    this.p5.rect(20 * s, 40 * s, 10 * s);
    this.p5.rect(20 * s, 190 * s, 10 * s);
    this.p5.rect(20 * s, 210 * s, 10 * s);
    this.p5.rect(20 * s, 230 * s, 10 * s);
    this.p5.rect(30 * s, 0 * s, 10 * s);
    this.p5.rect(30 * s, 50 * s, 10 * s, 40 * s);
    this.p5.rect(30 * s, 130 * s, 10 * s, 30 * s);
    this.p5.rect(30 * s, 180 * s, 10 * s);
    this.p5.rect(30 * s, 200 * s, 10 * s);
    this.p5.rect(30 * s, 220 * s, 10 * s);
    this.p5.rect(30 * s, 240 * s, 40 * s, 10 * s);
    this.p5.rect(40 * s, 10 * s, 10 * s, 20 * s);
    this.p5.rect(40 * s, 90 * s, 10 * s, 20 * s);
    this.p5.rect(40 * s, 120 * s, 10 * s);
    this.p5.rect(40 * s, 160 * s, 10 * s, 30 * s);
    this.p5.rect(50 * s, 0 * s, 10 * s, 10 * s);
    this.p5.rect(50 * s, 110 * s, 30 * s, 10 * s);
    this.p5.rect(50 * s, 180 * s, 10 * s, 20 * s);
    this.p5.rect(60 * s, 10 * s, 10 * s, 20 * s);
    this.p5.rect(60 * s, 40 * s, 10 * s, 20 * s);
    this.p5.rect(60 * s, 150 * s, 10 * s);
    this.p5.rect(60 * s, 200 * s, 10 * s);
    this.p5.rect(70 * s, 10 * s, 10 * s);
    this.p5.rect(70 * s, 30 * s, 10 * s);
    this.p5.rect(70 * s, 60 * s, 20 * s);
    this.p5.rect(70 * s, 160 * s, 10 * s);
    this.p5.rect(70 * s, 230 * s, 20 * s, 10 * s);
    this.p5.rect(80 * s, 20 * s, 10 * s);
    this.p5.rect(80 * s, 50 * s, 10 * s, 50 * s);
    this.p5.rect(80 * s, 120 * s, 10 * s);
    this.p5.rect(80 * s, 170 * s, 10 * s);
    this.p5.rect(90 * s, 40 * s, 10 * s);
    this.p5.rect(90 * s, 100 * s, 10 * s);
    this.p5.rect(90 * s, 130 * s, 10 * s);
    this.p5.rect(90 * s, 180 * s, 10 * s);
    this.p5.rect(90 * s, 220 * s, 10 * s);
    this.p5.rect(100 * s, 30 * s, 10 * s);
    this.p5.rect(100 * s, 140 * s, 10 * s);
    this.p5.rect(100 * s, 190 * s, 10 * s, 30 * s);
    this.p5.rect(110 * s, 20 * s, 30 * s, 10 * s);
    this.p5.rect(110 * s, 150 * s, 10 * s);
    this.p5.rect(110 * s, 200 * s, 10 * s);
    this.p5.rect(120 * s, 210 * s, 60 * s, 10 * s);
    this.p5.rect(140 * s, 30 * s, 20 * s, 10 * s);
    this.p5.rect(160 * s, 20 * s, 30 * s, 10 * s);
    this.p5.rect(180 * s, 200 * s, 10 * s);
    this.p5.rect(180 * s, 150 * s, 10 * s);
    this.p5.rect(190 * s, 30 * s, 10 * s);
    this.p5.rect(190 * s, 140 * s, 10 * s);
    this.p5.rect(190 * s, 190 * s, 10 * s, 30 * s);
    this.p5.rect(200 * s, 40 * s, 10 * s);
    this.p5.rect(200 * s, 100 * s, 10 * s);
    this.p5.rect(200 * s, 130 * s, 10 * s);
    this.p5.rect(200 * s, 180 * s, 10 * s);
    this.p5.rect(200 * s, 220 * s, 10 * s);
    this.p5.rect(210 * s, 20 * s, 10 * s);
    this.p5.rect(210 * s, 50 * s, 10 * s, 50 * s);
    this.p5.rect(210 * s, 120 * s, 10 * s);
    this.p5.rect(210 * s, 170 * s, 10 * s);
    this.p5.rect(210 * s, 230 * s, 20 * s, 10 * s);
    this.p5.rect(220 * s, 10 * s, 20 * s, 10 * s);
    this.p5.rect(220 * s, 30 * s, 10 * s);
    this.p5.rect(220 * s, 60 * s, 10 * s, 20 * s);
    this.p5.rect(220 * s, 110 * s, 30 * s, 10 * s);
    this.p5.rect(220 * s, 160 * s, 10 * s);
    this.p5.rect(230 * s, 20 * s, 10 * s);
    this.p5.rect(230 * s, 40 * s, 10 * s, 20 * s);
    this.p5.rect(230 * s, 150 * s, 10 * s);
    this.p5.rect(230 * s, 200 * s, 10 * s);
    this.p5.rect(230 * s, 240 * s, 40 * s, 10 * s);
    this.p5.rect(240 * s, 0 * s, 10 * s);
    this.p5.rect(240 * s, 180 * s, 10 * s, 20 * s);
    this.p5.rect(250 * s, 10 * s, 10 * s, 20 * s);
    this.p5.rect(250 * s, 90 * s, 10 * s, 20 * s);
    this.p5.rect(250 * s, 120 * s, 10 * s);
    this.p5.rect(250 * s, 160 * s, 10 * s, 30 * s);
    this.p5.rect(260 * s, 0 * s, 10 * s);
    this.p5.rect(260 * s, 50 * s, 10 * s, 40 * s);
    this.p5.rect(260 * s, 130 * s, 10 * s, 30 * s);
    this.p5.rect(260 * s, 180 * s, 10 * s);
    this.p5.rect(260 * s, 200 * s, 10 * s);
    this.p5.rect(260 * s, 220 * s, 10 * s);
    this.p5.rect(270 * s, 10 * s, 10 * s, 20 * s);
    this.p5.rect(270 * s, 40 * s, 10 * s);
    this.p5.rect(270 * s, 190 * s, 10 * s);
    this.p5.rect(270 * s, 210 * s, 10 * s);
    this.p5.rect(270 * s, 230 * s, 10 * s);
    this.p5.rect(280 * s, 10 * s, 10 * s);
    this.p5.rect(280 * s, 30 * s, 10 * s);
    this.p5.rect(290 * s, 20 * s, 10 * s);

    //Dark green parts
    this.p5.fill(frogColor.darkGreen);

    this.p5.rect(10 * s, 20 * s, 10 * s);
    this.p5.rect(20 * s, 30 * s, 50 * s, 10 * s);
    this.p5.rect(30 * s, 10 * s, 10 * s, 30 * s);
    this.p5.rect(30 * s, 190 * s, 10 * s);
    this.p5.rect(30 * s, 210 * s, 20 * s, 10 * s);
    this.p5.rect(30 * s, 230 * s, 40 * s, 10 * s);
    this.p5.rect(40 * s, 220 * s, 10 * s);
    this.p5.rect(50 * s, 10 * s, 10 * s, 60 * s);
    this.p5.rect(50 * s, 100 * s, 40 * s, 10 * s);
    this.p5.rect(50 * s, 220 * s, 40 * s, 10 * s);
    this.p5.rect(60 * s, 60 * s, 10 * s, 40 * s);
    this.p5.rect(70 * s, 20 * s, 10 * s);
    this.p5.rect(70 * s, 80 * s, 10 * s, 20 * s);
    this.p5.rect(80 * s, 210 * s, 10 * s, 20 * s);
    this.p5.rect(80 * s, 180 * s, 10 * s);
    this.p5.rect(80 * s, 110 * s, 20 * s, 10 * s);
    this.p5.rect(90 * s, 190 * s, 10 * s, 30 * s);
    this.p5.rect(90 * s, 120 * s, 20 * s, 10 * s);
    this.p5.rect(90 * s, 50 * s, 10 * s);
    this.p5.rect(90 * s, 90 * s, 10 * s);
    this.p5.rect(100 * s, 130 * s, 10 * s);
    this.p5.rect(190 * s, 120 * s, 10 * s, 20 * s);
    this.p5.rect(200 * s, 50 * s, 10 * s);
    this.p5.rect(200 * s, 90 * s, 10 * s);
    this.p5.rect(200 * s, 110 * s, 10 * s, 20 * s);
    this.p5.rect(200 * s, 190 * s, 10 * s, 30 * s);
    this.p5.rect(210 * s, 100 * s, 10 * s, 20 * s);
    this.p5.rect(210 * s, 180 * s, 10 * s);
    this.p5.rect(210 * s, 210 * s, 10 * s, 20 * s);
    this.p5.rect(220 * s, 20 * s, 10 * s);
    this.p5.rect(220 * s, 80 * s, 10 * s, 30 * s);
    this.p5.rect(220 * s, 220 * s, 40 * s, 10 * s);
    this.p5.rect(230 * s, 30 * s, 10 * s);
    this.p5.rect(230 * s, 60 * s, 10 * s, 50 * s);
    this.p5.rect(230 * s, 230 * s, 40 * s, 10 * s);
    this.p5.rect(240 * s, 10 * s, 10 * s, 60 * s);
    this.p5.rect(240 * s, 100 * s, 10 * s);
    this.p5.rect(250 * s, 30 * s, 30 * s, 10 * s);
    this.p5.rect(250 * s, 210 * s, 20 * s, 10 * s);
    this.p5.rect(260 * s, 10 * s, 10 * s, 20 * s);
    this.p5.rect(260 * s, 190 * s, 10 * s);
    this.p5.rect(280 * s, 20 * s, 10 * s);

    this.p5.fill(frogColor.green);
    //left arm
    this.p5.rect(30 * s, 40 * s, 20 * s, 10 * s);
    this.p5.rect(40 * s, 50 * s, 10 * s, 40 * s);
    this.p5.rect(50 * s, 70 * s, 10 * s, 30 * s);

    //right arm
    this.p5.rect(240 * s, 70 * s, 10 * s, 30 * s);
    this.p5.rect(250 * s, 40 * s, 10 * s, 50 * s);
    this.p5.rect(260 * s, 40 * s, 10 * s);

    //back + head
    this.p5.rect(90 * s, 170 * s, 120 * s, 10 * s);
    this.p5.rect(100 * s, 180 * s, 100 * s, 10 * s);
    this.p5.rect(100 * s, 90 * s, 10 * s, 30 * s);
    this.p5.rect(110 * s, 100 * s, 10 * s, 50 * s);
    this.p5.rect(110 * s, 160 * s, 10 * s, 40 * s);
    this.p5.rect(120 * s, 110 * s, 60 * s, 100 * s);
    this.p5.rect(180 * s, 160 * s, 10 * s, 40 * s);
    this.p5.rect(180 * s, 100 * s, 10 * s, 50 * s);
    this.p5.rect(190 * s, 90 * s, 10 * s, 30 * s);
    this.p5.rect(90 * s, 60 * s, 10 * s, 30 * s);
    this.p5.rect(200 * s, 60 * s, 10 * s, 30 * s);

    //left leg
    this.p5.rect(100 * s, 150 * s, 10 * s);
    this.p5.rect(90 * s, 140 * s, 10 * s);
    this.p5.rect(80 * s, 130 * s, 10 * s);
    this.p5.rect(70 * s, 120 * s, 10 * s);
    this.p5.rect(80 * s, 160 * s, 10 * s);
    this.p5.rect(70 * s, 170 * s, 10 * s);
    this.p5.rect(60 * s, 160 * s, 10 * s);
    this.p5.rect(40 * s, 190 * s, 10 * s, 20 * s);
    this.p5.rect(50 * s, 200 * s, 10 * s, 20 * s);
    this.p5.rect(60 * s, 210 * s, 20 * s, 10 * s);
    this.p5.rect(70 * s, 200 * s, 20 * s, 10 * s);
    this.p5.rect(80 * s, 190 * s, 10 * s);

    //right leg
    //here chatgpt helped me just mirror it
    this.p5.rect((150 + (150 - 100) - 10) * s, 150 * s, 10 * s);
    this.p5.rect((150 + (150 - 90) - 10) * s, 140 * s, 10 * s);
    this.p5.rect((150 + (150 - 80) - 10) * s, 130 * s, 10 * s);
    this.p5.rect((150 + (150 - 70) - 10) * s, 120 * s, 10 * s);
    this.p5.rect((150 + (150 - 80) - 10) * s, 160 * s, 10 * s);
    this.p5.rect((150 + (150 - 70) - 10) * s, 170 * s, 10 * s);
    this.p5.rect((150 + (150 - 60) - 10) * s, 160 * s, 10 * s);
    this.p5.rect((150 + (150 - 40) - 10) * s, 190 * s, 10 * s, 20 * s);
    this.p5.rect((150 + (150 - 50) - 10) * s, 200 * s, 10 * s, 20 * s);
    this.p5.rect((150 + (150 - 60) - 20) * s, 210 * s, 20 * s, 10 * s);
    this.p5.rect((150 + (150 - 70) - 20) * s, 200 * s, 20 * s, 10 * s);
    this.p5.rect((150 + (150 - 80) - 10) * s, 190 * s, 10 * s);

    this.p5.fill(frogColor.lightGreen);
    //left leg
    this.p5.rect(40 * s, 130 * s, 40 * s, 20 * s);
    this.p5.rect(40 * s, 150 * s, 20 * s, 10 * s);
    this.p5.rect(50 * s, 120 * s, 20 * s, 10 * s);
    this.p5.rect(50 * s, 160 * s, 10 * s, 20 * s);
    this.p5.rect(60 * s, 170 * s, 10 * s, 30 * s);
    this.p5.rect(70 * s, 180 * s, 10 * s, 30 * s);
    this.p5.rect(70 * s, 150 * s, 10 * s);
    this.p5.rect(80 * s, 140 * s, 10 * s, 20 * s);
    this.p5.rect(90 * s, 150 * s, 10 * s, 20 * s);
    this.p5.rect(100 * s, 160 * s, 10 * s);

    //head
    this.p5.rect(100 * s, 60 * s, 100 * s, 30 * s);
    this.p5.rect(110 * s, 90 * s, 80 * s, 10 * s);
    this.p5.rect(120 * s, 100 * s, 60 * s, 10 * s);
    this.p5.rect(140 * s, 40 * s, 20 * s);
    this.p5.rect(130 * s, 50 * s, 40 * s, 10 * s);
    this.p5.rect(130 * s, 30 * s, 10 * s);
    this.p5.rect(160 * s, 30 * s, 10 * s);

    //right leg
    this.p5.rect(190 * s, 160 * s, 20 * s, 10 * s);
    this.p5.rect(200 * s, 150 * s, 30 * s, 10 * s);
    this.p5.rect(210 * s, 140 * s, 10 * s);
    this.p5.rect(220 * s, 130 * s, 40 * s, 20 * s);
    this.p5.rect(220 * s, 180 * s, 10 * s, 20 * s);
    this.p5.rect(230 * s, 120 * s, 20 * s, 10 * s);
    this.p5.rect(230 * s, 170 * s, 10 * s, 30 * s);
    this.p5.rect(240 * s, 150 * s, 10 * s, 30 * s);
    this.p5.rect(250 * s, 150 * s, 10 * s);

    this.p5.fill(frogColor.lightestGreen);
    this.p5.rect(100 * s, 50 * s, 30 * s, 10 * s);
    this.p5.rect(110 * s, 40 * s, 20 * s, 10 * s);
    this.p5.rect(170 * s, 50 * s, 30 * s, 10 * s);
    this.p5.rect(170 * s, 40 * s, 20 * s, 10 * s);

    this.p5.fill(frogColor.superLightGreen);
    this.p5.rect(100 * s, 40 * s, 10 * s);
    this.p5.rect(110 * s, 30 * s, 20 * s, 10 * s);
    this.p5.rect(130 * s, 40 * s, 10 * s);
    this.p5.rect(160 * s, 40 * s, 10 * s);
    this.p5.rect(170 * s, 30 * s, 20 * s, 10 * s);
    this.p5.rect(190 * s, 40 * s, 10 * s);
    this.p5.pop();
  }

  // Move with controls, prevents leaving the canvas
  move(xDirection, yDirection) {
    let newX = this.x + xDirection * grid;
    let newY = this.y + yDirection * grid;

    if (
      newX - this.size / 2 >= 0 &&
      newX + this.size / 2 <= canvasWidth &&
      newY - this.size / 2 >= 0 &&
      newY + this.size / 2 <= canvasHeight
    ) {
      this.x = newX;
      this.y = newY;
    }
  }

  checkForWin(winAreaX, winAreaY) {
    if (this.y < 50) {
      console.log("You won!");
      this.gameWon(this.p5);
    }
  }
}
