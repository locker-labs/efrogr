import Hitbox from "./hitbox.js";

//variable imports
import { grid } from "./game.js";
import { canvasHeight } from "./game.js";
import { canvasWidth } from "./game.js";
import { gameWon } from "./game.js";

export default class Frog extends Hitbox {
  constructor(x, y, width, s) {
    super(x, y, width, width);
    this.attached = null;
    this.size = s;
  }

  attach(log) {
    this.attached = log;
  }

  update() {
    if (this.attached !== null) {
      this.x = this.x + this.attached.speed;
    }
  }

  //draws the frog
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
    push();
    noStroke();
    translate(this.x, this.y);
    fill(frogColor.outline);
    rect(0 * s, 20 * s, 10 * s);
    rect(10 * s, 10 * s, 10 * s);
    rect(10 * s, 30 * s, 10 * s);
    rect(20 * s, 10 * s, 10 * s);
    rect(20 * s, 20 * s, 10 * s);
    rect(20 * s, 40 * s, 10 * s);
    rect(20 * s, 190 * s, 10 * s);
    rect(20 * s, 210 * s, 10 * s);
    rect(20 * s, 230 * s, 10 * s);
    rect(30 * s, 0 * s, 10 * s);
    rect(30 * s, 50 * s, 10 * s, 40 * s);
    rect(30 * s, 130 * s, 10 * s, 30 * s);
    rect(30 * s, 180 * s, 10 * s);
    rect(30 * s, 200 * s, 10 * s);
    rect(30 * s, 220 * s, 10 * s);
    rect(30 * s, 240 * s, 40 * s, 10 * s);
    rect(40 * s, 10 * s, 10 * s, 20 * s);
    rect(40 * s, 90 * s, 10 * s, 20 * s);
    rect(40 * s, 120 * s, 10 * s);
    rect(40 * s, 160 * s, 10 * s, 30 * s);
    rect(50 * s, 0 * s, 10 * s, 10 * s);
    rect(50 * s, 110 * s, 30 * s, 10 * s);
    rect(50 * s, 180 * s, 10 * s, 20 * s);
    rect(60 * s, 10 * s, 10 * s, 20 * s);
    rect(60 * s, 40 * s, 10 * s, 20 * s);
    rect(60 * s, 150 * s, 10 * s);
    rect(60 * s, 200 * s, 10 * s);
    rect(70 * s, 10 * s, 10 * s);
    rect(70 * s, 30 * s, 10 * s);
    rect(70 * s, 60 * s, 20 * s);
    rect(70 * s, 160 * s, 10 * s);
    rect(70 * s, 230 * s, 20 * s, 10 * s);
    rect(80 * s, 20 * s, 10 * s);
    rect(80 * s, 50 * s, 10 * s, 50 * s);
    rect(80 * s, 120 * s, 10 * s);
    rect(80 * s, 170 * s, 10 * s);
    rect(90 * s, 40 * s, 10 * s);
    rect(90 * s, 100 * s, 10 * s);
    rect(90 * s, 130 * s, 10 * s);
    rect(90 * s, 180 * s, 10 * s);
    rect(90 * s, 220 * s, 10 * s);
    rect(100 * s, 30 * s, 10 * s);
    rect(100 * s, 140 * s, 10 * s);
    rect(100 * s, 190 * s, 10 * s, 30 * s);
    rect(110 * s, 20 * s, 30 * s, 10 * s);
    rect(110 * s, 150 * s, 10 * s);
    rect(110 * s, 200 * s, 10 * s);
    rect(120 * s, 210 * s, 60 * s, 10 * s);
    rect(140 * s, 30 * s, 20 * s, 10 * s);
    rect(160 * s, 20 * s, 30 * s, 10 * s);
    rect(180 * s, 200 * s, 10 * s);
    rect(180 * s, 150 * s, 10 * s);
    rect(190 * s, 30 * s, 10 * s);
    rect(190 * s, 140 * s, 10 * s);
    rect(190 * s, 190 * s, 10 * s, 30 * s);
    rect(200 * s, 40 * s, 10 * s);
    rect(200 * s, 100 * s, 10 * s);
    rect(200 * s, 130 * s, 10 * s);
    rect(200 * s, 180 * s, 10 * s);
    rect(200 * s, 220 * s, 10 * s);
    rect(210 * s, 20 * s, 10 * s);
    rect(210 * s, 50 * s, 10 * s, 50 * s);
    rect(210 * s, 120 * s, 10 * s);
    rect(210 * s, 170 * s, 10 * s);
    rect(210 * s, 230 * s, 20 * s, 10 * s);
    rect(220 * s, 10 * s, 20 * s, 10 * s);
    rect(220 * s, 30 * s, 10 * s);
    rect(220 * s, 60 * s, 10 * s, 20 * s);
    rect(220 * s, 110 * s, 30 * s, 10 * s);
    rect(220 * s, 160 * s, 10 * s);
    rect(230 * s, 20 * s, 10 * s);
    rect(230 * s, 40 * s, 10 * s, 20 * s);
    rect(230 * s, 150 * s, 10 * s);
    rect(230 * s, 200 * s, 10 * s);
    rect(230 * s, 240 * s, 40 * s, 10 * s);
    rect(240 * s, 0 * s, 10 * s);
    rect(240 * s, 180 * s, 10 * s, 20 * s);
    rect(250 * s, 10 * s, 10 * s, 20 * s);
    rect(250 * s, 90 * s, 10 * s, 20 * s);
    rect(250 * s, 120 * s, 10 * s);
    rect(250 * s, 160 * s, 10 * s, 30 * s);
    rect(260 * s, 0 * s, 10 * s);
    rect(260 * s, 50 * s, 10 * s, 40 * s);
    rect(260 * s, 130 * s, 10 * s, 30 * s);
    rect(260 * s, 180 * s, 10 * s);
    rect(260 * s, 200 * s, 10 * s);
    rect(260 * s, 220 * s, 10 * s);
    rect(270 * s, 10 * s, 10 * s, 20 * s);
    rect(270 * s, 40 * s, 10 * s);
    rect(270 * s, 190 * s, 10 * s);
    rect(270 * s, 210 * s, 10 * s);
    rect(270 * s, 230 * s, 10 * s);
    rect(280 * s, 10 * s, 10 * s);
    rect(280 * s, 30 * s, 10 * s);
    rect(290 * s, 20 * s, 10 * s);

    //Dark green parts
    fill(frogColor.darkGreen);

    rect(10 * s, 20 * s, 10 * s);
    rect(20 * s, 30 * s, 50 * s, 10 * s);
    rect(30 * s, 10 * s, 10 * s, 30 * s);
    rect(30 * s, 190 * s, 10 * s);
    rect(30 * s, 210 * s, 20 * s, 10 * s);
    rect(30 * s, 230 * s, 40 * s, 10 * s);
    rect(40 * s, 220 * s, 10 * s);
    rect(50 * s, 10 * s, 10 * s, 60 * s);
    rect(50 * s, 100 * s, 40 * s, 10 * s);
    rect(50 * s, 220 * s, 40 * s, 10 * s);
    rect(60 * s, 60 * s, 10 * s, 40 * s);
    rect(70 * s, 20 * s, 10 * s);
    rect(70 * s, 80 * s, 10 * s, 20 * s);
    rect(80 * s, 210 * s, 10 * s, 20 * s);
    rect(80 * s, 180 * s, 10 * s);
    rect(80 * s, 110 * s, 20 * s, 10 * s);
    rect(90 * s, 190 * s, 10 * s, 30 * s);
    rect(90 * s, 120 * s, 20 * s, 10 * s);
    rect(90 * s, 50 * s, 10 * s);
    rect(90 * s, 90 * s, 10 * s);
    rect(100 * s, 130 * s, 10 * s);
    rect(190 * s, 120 * s, 10 * s, 20 * s);
    rect(200 * s, 50 * s, 10 * s);
    rect(200 * s, 90 * s, 10 * s);
    rect(200 * s, 110 * s, 10 * s, 20 * s);
    rect(200 * s, 190 * s, 10 * s, 30 * s);
    rect(210 * s, 100 * s, 10 * s, 20 * s);
    rect(210 * s, 180 * s, 10 * s);
    rect(210 * s, 210 * s, 10 * s, 20 * s);
    rect(220 * s, 20 * s, 10 * s);
    rect(220 * s, 80 * s, 10 * s, 30 * s);
    rect(220 * s, 220 * s, 40 * s, 10 * s);
    rect(230 * s, 30 * s, 10 * s);
    rect(230 * s, 60 * s, 10 * s, 50 * s);
    rect(230 * s, 230 * s, 40 * s, 10 * s);
    rect(240 * s, 10 * s, 10 * s, 60 * s);
    rect(240 * s, 100 * s, 10 * s);
    rect(250 * s, 30 * s, 30 * s, 10 * s);
    rect(250 * s, 210 * s, 20 * s, 10 * s);
    rect(260 * s, 10 * s, 10 * s, 20 * s);
    rect(260 * s, 190 * s, 10 * s);
    rect(280 * s, 20 * s, 10 * s);

    fill(frogColor.green);
    //left arm
    rect(30 * s, 40 * s, 20 * s, 10 * s);
    rect(40 * s, 50 * s, 10 * s, 40 * s);
    rect(50 * s, 70 * s, 10 * s, 30 * s);

    //right arm
    rect(240 * s, 70 * s, 10 * s, 30 * s);
    rect(250 * s, 40 * s, 10 * s, 50 * s);
    rect(260 * s, 40 * s, 10 * s);

    //back + head
    rect(90 * s, 170 * s, 120 * s, 10 * s);
    rect(100 * s, 180 * s, 100 * s, 10 * s);
    rect(100 * s, 90 * s, 10 * s, 30 * s);
    rect(110 * s, 100 * s, 10 * s, 50 * s);
    rect(110 * s, 160 * s, 10 * s, 40 * s);
    rect(120 * s, 110 * s, 60 * s, 100 * s);
    rect(180 * s, 160 * s, 10 * s, 40 * s);
    rect(180 * s, 100 * s, 10 * s, 50 * s);
    rect(190 * s, 90 * s, 10 * s, 30 * s);
    rect(90 * s, 60 * s, 10 * s, 30 * s);
    rect(200 * s, 60 * s, 10 * s, 30 * s);

    //left leg
    rect(100 * s, 150 * s, 10 * s);
    rect(90 * s, 140 * s, 10 * s);
    rect(80 * s, 130 * s, 10 * s);
    rect(70 * s, 120 * s, 10 * s);
    rect(80 * s, 160 * s, 10 * s);
    rect(70 * s, 170 * s, 10 * s);
    rect(60 * s, 160 * s, 10 * s);
    rect(40 * s, 190 * s, 10 * s, 20 * s);
    rect(50 * s, 200 * s, 10 * s, 20 * s);
    rect(60 * s, 210 * s, 20 * s, 10 * s);
    rect(70 * s, 200 * s, 20 * s, 10 * s);
    rect(80 * s, 190 * s, 10 * s);

    //right leg
    //here chatgpt helped me just mirror it
    rect((150 + (150 - 100) - 10) * s, 150 * s, 10 * s);
    rect((150 + (150 - 90) - 10) * s, 140 * s, 10 * s);
    rect((150 + (150 - 80) - 10) * s, 130 * s, 10 * s);
    rect((150 + (150 - 70) - 10) * s, 120 * s, 10 * s);
    rect((150 + (150 - 80) - 10) * s, 160 * s, 10 * s);
    rect((150 + (150 - 70) - 10) * s, 170 * s, 10 * s);
    rect((150 + (150 - 60) - 10) * s, 160 * s, 10 * s);
    rect((150 + (150 - 40) - 10) * s, 190 * s, 10 * s, 20 * s);
    rect((150 + (150 - 50) - 10) * s, 200 * s, 10 * s, 20 * s);
    rect((150 + (150 - 60) - 20) * s, 210 * s, 20 * s, 10 * s);
    rect((150 + (150 - 70) - 20) * s, 200 * s, 20 * s, 10 * s);
    rect((150 + (150 - 80) - 10) * s, 190 * s, 10 * s);

    fill(frogColor.lightGreen);
    //left leg
    rect(40 * s, 130 * s, 40 * s, 20 * s);
    rect(40 * s, 150 * s, 20 * s, 10 * s);
    rect(50 * s, 120 * s, 20 * s, 10 * s);
    rect(50 * s, 160 * s, 10 * s, 20 * s);
    rect(60 * s, 170 * s, 10 * s, 30 * s);
    rect(70 * s, 180 * s, 10 * s, 30 * s);
    rect(70 * s, 150 * s, 10 * s);
    rect(80 * s, 140 * s, 10 * s, 20 * s);
    rect(90 * s, 150 * s, 10 * s, 20 * s);
    rect(100 * s, 160 * s, 10 * s);

    //head
    rect(100 * s, 60 * s, 100 * s, 30 * s);
    rect(110 * s, 90 * s, 80 * s, 10 * s);
    rect(120 * s, 100 * s, 60 * s, 10 * s);
    rect(140 * s, 40 * s, 20 * s);
    rect(130 * s, 50 * s, 40 * s, 10 * s);
    rect(130 * s, 30 * s, 10 * s);
    rect(160 * s, 30 * s, 10 * s);

    //right leg
    rect(190 * s, 160 * s, 20 * s, 10 * s);
    rect(200 * s, 150 * s, 30 * s, 10 * s);
    rect(210 * s, 140 * s, 10 * s);
    rect(220 * s, 130 * s, 40 * s, 20 * s);
    rect(220 * s, 180 * s, 10 * s, 20 * s);
    rect(230 * s, 120 * s, 20 * s, 10 * s);
    rect(230 * s, 170 * s, 10 * s, 30 * s);
    rect(240 * s, 150 * s, 10 * s, 30 * s);
    rect(250 * s, 150 * s, 10 * s);

    fill(frogColor.lightestGreen);
    rect(100 * s, 50 * s, 30 * s, 10 * s);
    rect(110 * s, 40 * s, 20 * s, 10 * s);
    rect(170 * s, 50 * s, 30 * s, 10 * s);
    rect(170 * s, 40 * s, 20 * s, 10 * s);

    fill(frogColor.superLightGreen);
    rect(100 * s, 40 * s, 10 * s);
    rect(110 * s, 30 * s, 20 * s, 10 * s);
    rect(130 * s, 40 * s, 10 * s);
    rect(160 * s, 40 * s, 10 * s);
    rect(170 * s, 30 * s, 20 * s, 10 * s);
    rect(190 * s, 40 * s, 10 * s);
    pop();
  }
  //move with controls that prevents from leaving canvas (with some help from ChatGPT)
  move(xDirection, yDirection) {
    // calculate the new x and y positions
    let newX = this.x + xDirection * grid;
    let newY = this.y + yDirection * grid;

    // check if the new position is within the canvas boundaries
    if (
      newX - this.size / 2 >= 0 &&
      newX + this.size / 2 <= canvasWidth &&
      newY - this.size / 2 >= 0 &&
      newY + this.size / 2 <= canvasHeight
    ) {
      // update the frog's position
      this.x = newX;
      this.y = newY;
    }
  }

  checkForWin(winAreaX, winAreaY) {
    if (this.y < 50) {
      console.log("you won");
      gameWon();
    }
  }
}
