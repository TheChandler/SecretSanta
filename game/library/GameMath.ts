import { IShape, VectorLike } from "./IShape.js";

export class Vector2 implements IShape {
    constructor(ctx: CanvasRenderingContext2D|null, x: number, y: number) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    }
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D | null;
    add(otherVec: Vector2) {
        this.x += otherVec.x;
        this.y += otherVec.y;
        return this;
    }
    difference(otherVec: Vector2) {
        return new Vector2(this.ctx, this.x - otherVec.x, this.y - otherVec.y);
    }
    distanceTo(otherVec: Vector2) {
        return Math.sqrt(Math.pow(this.x - otherVec.x, 2) + Math.pow(this.y - otherVec.y, 2))
    }
    squaredDistanceTo(otherVec: Vector2) {
        return Math.pow(this.x - otherVec.x, 2) + Math.pow(this.y - otherVec.y, 2)
    }

    draw(color) {
        if (this.ctx){
            this.ctx.fillStyle = color ?? 'red';
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


export class Line implements IShape {
    constructor(ctx: CanvasRenderingContext2D, a: Vector2, b: Vector2) {
        try {
            this.a = a;
            this.b = b;
            this.ctx = ctx;
        } catch (e) {
            console.error(e)
            throw new Error("Cannot create Line from " + a + " " + b);
        }
        this.length = this.a.distanceTo(this.b)
    }
    a: Vector2;
    b: Vector2;
    length: number;
    ctx: CanvasRenderingContext2D;
    collides(shape) {
        if (shape instanceof Vector2) {
            return shape.distanceTo(this.a) + shape.distanceTo(this.b) - this.length == 0;
        } else if (shape instanceof Circle) {
            if (shape.collides(this.a) || shape.collides(this.b)) {
                return true;
            }
            let dot = (((shape.position.x - this.a.x) * (this.b.x - this.a.x)) + ((shape.position.y - this.a.y) * (this.b.y - this.a.y))) / this.a.squaredDistanceTo(this.b);
            if (dot < 0 || dot > 1) {
                return false;
            }
            let collide = shape.collides(new Vector2(this.ctx, this.a.x + dot * (this.b.x - this.a.x), this.a.y + dot * (this.b.y - this.a.y)))
            if (collide) {
                console.log("Here is the collision")
                console.log(this.a.x + dot * (this.b.x - this.a.x), this.a.y + dot * (this.b.y - this.a.y))
                console.log(shape.position)
                return true
            }

        } else {
            throw new Error("Unhandled collsions type for Line and ", shape.constructor.name)
        }
    }
    distanceTo(point: Vector2) {
        let dot = (((point.x - this.a.x) * (this.b.x - this.a.x)) + ((point.y - this.a.y) * (this.b.y - this.a.y))) / this.a.squaredDistanceTo(this.b);
        if (dot < 0 || dot > 1) {
            return Math.min(point.distanceTo(this.a), point.distanceTo(this.b));
        }
        return point.distanceTo(new Vector2(this.ctx, this.a.x + dot * (this.b.x - this.a.x), this.a.y + dot * (this.b.y - this.a.y)))

    }
    draw(color) {
        // ctx.fillStyle = color ?? 'green'; //Lines don't fill
        this.ctx.beginPath()
        this.ctx.moveTo(this.a.x, this.a.y)
        this.ctx.lineTo(this.b.x, this.b.y)
        this.ctx.stroke();
    }
    toString() {
        return this.a + " " + this.b;
    }
}


export class Circle implements IShape {
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
        this.position = new Vector2(ctx, x, y);
        this.radius = r;
        this.ctx = ctx;
    }
    position: Vector2;
    radius: number;
    ctx: CanvasRenderingContext2D;
    collides(shape) {
        if (shape instanceof Vector2) {
            if (shape.distanceTo(this.position) < this.radius)
                console.log(shape.distanceTo(this.position), this.radius)
            return shape.distanceTo(this.position) < this.radius;
        } else if (shape instanceof Circle) {
            return shape.position.distanceTo(this.position) < this.radius + shape.radius;
        } else {
            throw new Error("Unhandled collsions type for Line and ", shape.constructor.name)
        }
    }
    draw(color, offset?) {
        this.ctx.fillStyle = color ?? 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.position.x + (offset?.x ?? 0), this.position.y + (offset?.y ?? 0), this.radius, 0, 2 * Math.PI);
        this.ctx.fill()
    }
    drawOutline(color,lineWidth?, offset?) {
        this.ctx.strokeStyle = color ?? 'red';
        this.ctx.lineWidth = lineWidth ?? 2
        this.ctx.beginPath();
        this.ctx.arc(this.position.x + (offset?.x ?? 0), this.position.y + (offset?.y ?? 0), this.radius, 0, 2 * Math.PI);
        this.ctx.stroke()
    }
}


export class Polygon implements IShape {
    constructor(ctx: CanvasRenderingContext2D, points: number[][]) {
        this.baseArray = points;
        this.points = points.map(p => new Vector2(ctx, p[0], p[1]))
        this.lines = <Line[]>this.points.map((p, i, a) => {
            if (i < a.length - 1) {
                return new Line(ctx, p, a[i + 1])
            }
            if (i == a.length - 1) {
                return new Line(ctx, p, a[0]);
            }
        })
        this.collided = false;
        let randomNum = ((Math.random() * .5 + .4) * 0xff) << 16
        randomNum += ((Math.random() * .2 +.1) * 0xff) << 8
        randomNum += ((Math.random() * .2 +.3) * 0xff)
        this.color = "#" + Math.floor(randomNum).toString(16).padStart(6, '0') //+ 'C0';
        this.ctx = ctx;
    }
    baseArray: number[][];
    points: Vector2[];
    lines: Line[];
    collided: boolean;
    color: string;
    ctx: CanvasRenderingContext2D;

    collides(shape: IShape, debug?: boolean) {
        // if (debug) {
        //     console.log("Collides shape: ", shape)
        //     console.log(this.points)
        // }
        if (shape instanceof Circle || shape instanceof Vector2) {
            for (let line of this.lines) {
                if (line.collides(shape)) {
                    if (debug) {
                        console.log("collided with Line")
                        console.log("line: ", line, "shape: ", shape)
                    }
                    return true;
                }
            }
            let px
            let py

            let collision = false;
            try {
                px = (<Vector2>shape).x ?? (<Circle>shape).position.x;
                py = (<Vector2>shape).y ?? (<Circle>shape).position.y;
            } catch (e) {
                console.error("Polygon error colliding with: ", shape)
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
            return collision
        } else {
            throw new Error("Unhandled collision type for Polygon and " + shape.constructor.name);
        }
    }
    draw(color?:string, offset?: VectorLike) {
        let xOffset = 0;
        let yOffset = 0;
        if (offset) {
            xOffset = offset.x;
            yOffset = offset.y;
        }
        this.ctx.fillStyle = (this.collided ? 'red' : this.color);
        this.ctx.beginPath();
        this.ctx.moveTo(this.points[0].x + xOffset, this.points[0].y + yOffset)
        for (let point of this.points) {
            this.ctx.lineTo(point.x + xOffset, point.y + yOffset);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
    //todo: Fix this. Create type for new object made by createCamera. Check if object is of that type then don't run this if it isn't
    drawStatic(offset) {
        (<{ baseObj: any }><unknown>this.ctx).baseObj.beginPath();
        (<{ baseObj: any }><unknown>this.ctx).baseObj.moveTo(this.points[0].x + (offset?.x ?? 0), this.points[0].y + (offset?.y))
        for (let point of this.points) {
            (<{ baseObj: any }><unknown>this.ctx).baseObj.lineTo(point.x + (offset?.x ?? 0), point.y + (offset?.y ?? 0));
        }
        (<{ baseObj: any }><unknown>this.ctx).baseObj.closePath();
        (<{ baseObj: any }><unknown>this.ctx).baseObj.fill();
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
    constructor(ctx, image: CanvasImageSource, x: number, y: number, width: number, height: number) {
        this.image = image;

        // this.image = new Image()
        // this.image.src = './images/playButton.png'
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.polygon = new Polygon(ctx, [
            [x, y], [x + width, y], [x + width, y + height], [x, y + height]
        ])
        this.ctx = ctx;
    }
    image: CanvasImageSource;
    x: number;
    y: number;
    width: number;
    height: number;
    polygon: Polygon;
    ctx: CanvasRenderingContext2D;

    collides(shape, debug=false) {
        return this.polygon.collides(shape, debug);
    }
    draw(offset?) {
        try{
            this.ctx.drawImage(this.image, this.x + (offset?.x ?? 0), this.y + (offset?.y ?? 0), this.width, this.height);
        }catch(e){
            console.error("Couldn't draw image", this.image)
        }
    }
}