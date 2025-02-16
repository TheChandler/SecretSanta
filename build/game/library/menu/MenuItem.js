import { shapeFactory } from "../../code/game.js";
export class MenuItem {
    constructor(x, y, text, func) {
        this.position = shapeFactory.createVector2(x, y);
        this.box = shapeFactory.createPolygon([
            [x, y],
            [x + 180, y],
            [x + 180, y + 20],
            [x, y + 20],
        ]);
        this.box.color = '#AAFFBB';
        this.text = text;
        this.func = func;
    }
    collides([x, y], debug) {
        if (debug) {
            console.log([x, y]);
        }
        return this.box.collides(shapeFactory.createVector2(x, y), debug);
    }
    click(x, y) {
        this.func(x, y);
    }
    draw(ctx) {
        this.box.draw();
        ctx.fillStyle = "#000000";
        ctx.font = "20px monospace";
        ctx.fillText(this.text, this.position.x + 5, this.position.y + 15);
    }
}
