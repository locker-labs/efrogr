//the idea of having a Hitbox class where you inherit the overlap checking
//for other classes came from: https://www.youtube.com/watch?v=giXV6xErw0Y&t=817s

export default class Hitbox {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  overlaps(otherHitbox) {
    //here i set the edges of the hitbox
    let left = this.x;
    let right = this.x + this.width;
    let top = this.y;
    let bottom = this.y + this.height;

    //here i get the position of another hitbox
    let otherLeft = otherHitbox.x;
    let otherRight = otherHitbox.x + otherHitbox.width;
    let otherTop = otherHitbox.y;
    let otherBottom = otherHitbox.y + otherHitbox.height;

    //here we check if they overlap (and is therefore colliding or not)
    return !(
      left >= otherRight ||
      right <= otherLeft ||
      top >= otherBottom ||
      bottom <= otherTop
    );
  }
}
