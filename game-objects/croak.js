import Hitbox from "./hitbox.js";
import { grid, canvasHeight, canvasWidth } from "@/lib/constants";

export default class Croak extends Hitbox {
    constructor(x, y, width, s, gameWon, p5) {
        super(x, y, width, width);
        this.attached = null;
        this.size = s;
        this.gameWon = gameWon;
        this.p5 = p5;
        this.frogImage = p5.loadImage('/croak-face.png'); // Update this path to your image file
    }

    attach(log) {
        this.attached = log;
    }

    update() {
        if (this.attached !== null) {
            this.x = this.x + this.attached.speed;
        }
    }

    // Draws the frog using an image
    draw() {
        this.p5.push();
        this.p5.translate(this.x, this.y);
        this.p5.image(this.frogImage, 0, 0, this.frogImage.width, this.frogImage.height);
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
