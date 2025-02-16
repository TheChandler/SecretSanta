import { Circle, Line, Polygon, Sprite, Vector2 } from "./GameMath.js";
export class ShapeFactory {
    constructor(ctx) {
        this.ctx = ctx;
    }
    createVector2(x, y) {
        return new Vector2(this.ctx, x, y);
    }
    createLine(a, b) {
        return new Line(this.ctx, a, b);
    }
    createCircle(x, y, r) {
        return new Circle(this.ctx, x, y, r);
    }
    createPolygon(points) {
        return new Polygon(this.ctx, points);
    }
    createSprite(image, x, y, width, height) {
        return new Sprite(this.ctx, image, x, y, width, height);
    }
}
