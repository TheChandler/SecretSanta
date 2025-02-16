export class Vector2 {
    constructor(ctx, x, y) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    }
    add(otherVec) {
        this.x += otherVec.x;
        this.y += otherVec.y;
        return this;
    }
    difference(otherVec) {
        return new Vector2(this.ctx, this.x - otherVec.x, this.y - otherVec.y);
    }
    distanceTo(otherVec) {
        return Math.sqrt(Math.pow(this.x - otherVec.x, 2) + Math.pow(this.y - otherVec.y, 2));
    }
    squaredDistanceTo(otherVec) {
        return Math.pow(this.x - otherVec.x, 2) + Math.pow(this.y - otherVec.y, 2);
    }
    draw(color) {
        if (this.ctx) {
            this.ctx.fillStyle = color !== null && color !== void 0 ? color : 'red';
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }
    toString() {
        return `[${this.x}, ${this.y}]`;
    }
}
// function convertToVector2(a, b?) {
//     if (a instanceof Vector2) {
//         return a;
//     } else if (Array.isArray(a) && a.length == 2) {
//         return new Vector2(a[0], a[1]);
//     } else if (Object.hasOwn(a, 'x') && Object.hasOwn(a, 'y')) {
//         return new Vector2(a.x, a.y);
//     } else if (typeof a === 'number' && typeof b === 'number') {
//         return new Vector2(a, b);
//     } else {
//         throw new Error("Not a Vector2 or vector2 compatible")
//     }
// }
export class Line {
    constructor(ctx, a, b) {
        try {
            this.a = a;
            this.b = b;
            this.ctx = ctx;
        }
        catch (e) {
            console.error(e);
            throw new Error("Cannot create Line from " + a + " " + b);
        }
        this.length = this.a.distanceTo(this.b);
    }
    collides(shape) {
        if (shape instanceof Vector2) {
            return shape.distanceTo(this.a) + shape.distanceTo(this.b) - this.length == 0;
        }
        else if (shape instanceof Circle) {
            if (shape.collides(this.a) || shape.collides(this.b)) {
                return true;
            }
            let dot = (((shape.position.x - this.a.x) * (this.b.x - this.a.x)) + ((shape.position.y - this.a.y) * (this.b.y - this.a.y))) / this.a.squaredDistanceTo(this.b);
            if (dot < 0 || dot > 1) {
                return false;
            }
            let collide = shape.collides(new Vector2(this.ctx, this.a.x + dot * (this.b.x - this.a.x), this.a.y + dot * (this.b.y - this.a.y)));
            if (collide) {
                console.log("Here is the collision");
                console.log(this.a.x + dot * (this.b.x - this.a.x), this.a.y + dot * (this.b.y - this.a.y));
                console.log(shape.position);
                return true;
            }
        }
        else {
            throw new Error("Unhandled collsions type for Line and ", shape.constructor.name);
        }
    }
    distanceTo(point) {
        let dot = (((point.x - this.a.x) * (this.b.x - this.a.x)) + ((point.y - this.a.y) * (this.b.y - this.a.y))) / this.a.squaredDistanceTo(this.b);
        if (dot < 0 || dot > 1) {
            return Math.min(point.distanceTo(this.a), point.distanceTo(this.b));
        }
        return point.distanceTo(new Vector2(this.ctx, this.a.x + dot * (this.b.x - this.a.x), this.a.y + dot * (this.b.y - this.a.y)));
    }
    draw(color) {
        // ctx.fillStyle = color ?? 'green'; //Lines don't fill
        this.ctx.beginPath();
        this.ctx.moveTo(this.a.x, this.a.y);
        this.ctx.lineTo(this.b.x, this.b.y);
        this.ctx.stroke();
    }
    toString() {
        return this.a + " " + this.b;
    }
}
export class Circle {
    constructor(ctx, x, y, r) {
        this.position = new Vector2(ctx, x, y);
        this.radius = r;
        this.ctx = ctx;
    }
    collides(shape) {
        if (shape instanceof Vector2) {
            if (shape.distanceTo(this.position) < this.radius)
                console.log(shape.distanceTo(this.position), this.radius);
            return shape.distanceTo(this.position) < this.radius;
        }
        else if (shape instanceof Circle) {
            return shape.position.distanceTo(this.position) < this.radius + shape.radius;
        }
        else {
            throw new Error("Unhandled collsions type for Line and ", shape.constructor.name);
        }
    }
    draw(color, offset) {
        var _a, _b;
        this.ctx.fillStyle = color !== null && color !== void 0 ? color : 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.position.x + ((_a = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _a !== void 0 ? _a : 0), this.position.y + ((_b = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _b !== void 0 ? _b : 0), this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    drawOutline(color, lineWidth, offset) {
        var _a, _b;
        this.ctx.strokeStyle = color !== null && color !== void 0 ? color : 'red';
        this.ctx.lineWidth = lineWidth !== null && lineWidth !== void 0 ? lineWidth : 2;
        this.ctx.beginPath();
        this.ctx.arc(this.position.x + ((_a = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _a !== void 0 ? _a : 0), this.position.y + ((_b = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _b !== void 0 ? _b : 0), this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
}
export class Polygon {
    constructor(ctx, points) {
        this.baseArray = points;
        this.points = points.map(p => new Vector2(ctx, p[0], p[1]));
        this.lines = this.points.map((p, i, a) => {
            if (i < a.length - 1) {
                return new Line(ctx, p, a[i + 1]);
            }
            if (i == a.length - 1) {
                return new Line(ctx, p, a[0]);
            }
        });
        this.collided = false;
        let randomNum = ((Math.random() * .5 + .4) * 0xff) << 16;
        randomNum += ((Math.random() * .2 + .1) * 0xff) << 8;
        randomNum += ((Math.random() * .2 + .3) * 0xff);
        this.color = "#" + Math.floor(randomNum).toString(16).padStart(6, '0'); //+ 'C0';
        this.ctx = ctx;
    }
    collides(shape, debug) {
        var _a, _b;
        // if (debug) {
        //     console.log("Collides shape: ", shape)
        //     console.log(this.points)
        // }
        if (shape instanceof Circle || shape instanceof Vector2) {
            for (let line of this.lines) {
                if (line.collides(shape)) {
                    if (debug) {
                        console.log("collided with Line");
                        console.log("line: ", line, "shape: ", shape);
                    }
                    return true;
                }
            }
            let px;
            let py;
            let collision = false;
            try {
                px = (_a = shape.x) !== null && _a !== void 0 ? _a : shape.position.x;
                py = (_b = shape.y) !== null && _b !== void 0 ? _b : shape.position.y;
            }
            catch (e) {
                console.error("Polygon error colliding with: ", shape);
            }
            if (debug) {
                // console.log("px py: ", px, py)
            }
            this.points.forEach((vc, i) => {
                let vn = i < this.points.length - 1 ? this.points[i + 1] : this.points[0];
                if (((vc.y > py) != (vn.y > py)) && (px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x)) {
                    collision = !collision;
                }
            });
            return collision;
        }
        else {
            throw new Error("Unhandled collision type for Polygon and " + shape.constructor.name);
        }
    }
    draw(color, offset) {
        let xOffset = 0;
        let yOffset = 0;
        if (offset) {
            xOffset = offset.x;
            yOffset = offset.y;
        }
        this.ctx.fillStyle = (this.collided ? 'red' : this.color);
        this.ctx.beginPath();
        this.ctx.moveTo(this.points[0].x + xOffset, this.points[0].y + yOffset);
        for (let point of this.points) {
            this.ctx.lineTo(point.x + xOffset, point.y + yOffset);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
    //todo: Fix this. Create type for new object made by createCamera. Check if object is of that type then don't run this if it isn't
    drawStatic(offset) {
        var _a, _b, _c;
        this.ctx.baseObj.beginPath();
        this.ctx.baseObj.moveTo(this.points[0].x + ((_a = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _a !== void 0 ? _a : 0), this.points[0].y + (offset === null || offset === void 0 ? void 0 : offset.y));
        for (let point of this.points) {
            this.ctx.baseObj.lineTo(point.x + ((_b = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _b !== void 0 ? _b : 0), point.y + ((_c = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _c !== void 0 ? _c : 0));
        }
        this.ctx.baseObj.closePath();
        this.ctx.baseObj.fill();
    }
    printLines() {
        // for (let line of this.lines) {
        //     console.log(line.toString());
        // }
        //@ts-ignore -- TS struggles with reduce I guess. read this when less tired: https://ayubbegimkulov.com/reduce-typescript/
        return "[" + this.points.reduce((val, val2) => val + ", " + val2) + "]";
    }
}
export class Sprite {
    constructor(ctx, image, x, y, width, height) {
        this.image = image;
        // this.image = new Image()
        // this.image.src = './images/playButton.png'
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.polygon = new Polygon(ctx, [
            [x, y], [x + width, y], [x + width, y + height], [x, y + height]
        ]);
        this.ctx = ctx;
    }
    collides(shape, debug = false) {
        return this.polygon.collides(shape, debug);
    }
    draw(offset) {
        var _a, _b;
        try {
            this.ctx.drawImage(this.image, this.x + ((_a = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _a !== void 0 ? _a : 0), this.y + ((_b = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _b !== void 0 ? _b : 0), this.width, this.height);
        }
        catch (e) {
            console.error("Couldn't draw image", this.image);
        }
    }
}
