import { Circle, Line, Polygon, Sprite, Vector2 } from "./GameMath.js";


export class ShapeFactory {
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }
    ctx: CanvasRenderingContext2D;


    createVector2(x: number, y: number) {
        return new Vector2(this.ctx, x, y)
    }

    createLine(a: Vector2, b: Vector2) {
        return new Line(this.ctx, a, b)
    }

    createCircle(x: number, y: number, r: number) {
        return new Circle(this.ctx, x, y, r)
    }

    createPolygon(points: number[][]) {
        return new Polygon(this.ctx, points);
    }

    createSprite(image, x, y, width, height){
        return new Sprite(this.ctx, image, x, y, width, height)
    }
}