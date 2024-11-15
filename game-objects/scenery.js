//variable imports
import { canvasWidth } from "./game.js";
import { grid } from "./game.js";

export default class Scenery {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.grassBlades = [];
    this.grassBladeSettings = {
      amount: 3000,
      maxSize: 3,
    };
    this.waterBubbles = [];
    this.waterBubbleSettings = {
      amount: 200,
      maxSize: 5,
    };
  }

  createGrass() {
    if (this.grassBlades.length < this.grassBladeSettings.amount) {
      for (let i = 0; i < this.grassBladeSettings.amount; i++) {
        const grassBlade = {
          x: Math.floor(Math.random() * canvasWidth),
          y: Math.floor(Math.random() * canvasWidth),
          size: Math.floor(Math.random() * this.grassBladeSettings.maxSize),
        };
        this.grassBlades.push(grassBlade);
      }
    }
  }

  createBubbles() {
    if (this.waterBubbles.length < this.waterBubbleSettings.amount) {
      for (let i = 0; i < this.waterBubbleSettings.amount; i++) {
        const waterBubble = {
          x: Math.floor(Math.random() * canvasWidth),
          y: 5 + grid * 2 + Math.floor(Math.random() * (grid * 3 - 5)),
          size: Math.floor(Math.random() * this.waterBubbleSettings.maxSize),
          speed: 2,
        };
        this.waterBubbles.push(waterBubble);
      }
    }
  }

  draw() {
    this.createGrass();
    const backgroundColor = {
      grass: "#9ab771",
      grassBlade: "#5F8575",
      water: "#89CFF0",
      waterBubble: "#6495ED",
      road: "#50514e",
    };
    push();
    noStroke();

    //GRASS
    fill(backgroundColor.grass);
    rect(0, grid * 9, canvasWidth, grid);
    rect(0, grid * 5, canvasWidth, grid);
    rect(0, 0, canvasWidth, grid * 2);

    this.grassBlades;
    for (let grassBlade of this.grassBlades) {
      fill(backgroundColor.grassBlade);
      rect(grassBlade.x, grassBlade.y, grassBlade.size);
    }

    //ROAD
    push();
    let strokeW = 1;
    stroke("#FFF");
    strokeWeight(strokeW);
    fill(backgroundColor.road);
    rect(-strokeW, grid * 6, canvasWidth + strokeW * 2, grid);
    rect(-strokeW, grid * 7, canvasWidth + strokeW * 2, grid);
    rect(-strokeW, grid * 8, canvasWidth + strokeW * 2, grid);
    //rect(-strokeWeight, 220, 500, 70);
    pop();
    //texture the road

    //WATER
    fill(backgroundColor.water);
    rect(0, grid * 2, canvasWidth, grid * 3);

    //waterBubbles
    this.createBubbles();
    for (let waterBubble of this.waterBubbles) {
      fill(backgroundColor.waterBubble);
      rect(waterBubble.x, waterBubble.y, waterBubble.size);

      waterBubble.x = waterBubble.x + waterBubble.speed;

      if (waterBubble.x > canvasWidth) {
        waterBubble.x = 0;
      }
    }

    pop();
  }
}
