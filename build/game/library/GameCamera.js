import { ShapeFactory } from "./ShapeFactory.js";
const SPEED = 170;
//This is pretty dumb but it basically turns ctx into a camera object
export class CameraConstructor {
    static MakeGameCamera(ctx, canvas, x, y) {
        var _a;
        const shapeFactory = new ShapeFactory(ctx);
        let baseObj = Object.create(Object.getPrototypeOf(ctx));
        // Bind every function from baseObj to ctx. Allows calling base form of overridden functions
        for (let key in baseObj) {
            // If key is not a setter (checked against prototype), overwrite function with bound version
            if (((_a = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(baseObj), key)) === null || _a === void 0 ? void 0 : _a.get) == undefined) {
                baseObj[key] = baseObj[key].bind(ctx);
            }
        }
        return Object.assign(ctx, {
            position: shapeFactory.createVector2(x, y),
            destination: shapeFactory.createVector2(x, y),
            size: shapeFactory.createVector2(canvas.width, canvas.height),
            offset: [],
            baseObj,
            update: function (x, y) {
                this.destination = shapeFactory.createVector2(x, y);
                if (this.position.distanceTo(this.destination) < SPEED) {
                    this.position.x = this.destination.x;
                    this.position.y = this.destination.y;
                    // console.log("OPTION ONE")
                }
                else {
                    let velocity = this.destination.difference(this.position);
                    let scale = SPEED / velocity.distanceTo(shapeFactory.createVector2(0, 0));
                    this.position.x += velocity.x * scale;
                    this.position.y += velocity.y * scale;
                }
                let o = this.offset.length ? this.offset.shift() : { x: 0, y: 0 };
                if (o && (o.y || o.x)) {
                    this.position.x = this.position.x + o.x;
                    this.position.y = this.position.y + o.y;
                }
            },
            smallShake: function (startingIntensity, time, endingIntensity = startingIntensity) {
                let intensity = startingIntensity;
                this.offset = [];
                for (let i = 0; i <= time; i++) {
                    let angle = Math.random() * 2 * Math.PI;
                    this.offset.push(shapeFactory.createVector2(Math.sin(angle) * intensity, Math.cos(angle) * intensity));
                    intensity = startingIntensity + ((endingIntensity - startingIntensity) * i / (time - 1));
                }
            },
            arc: function (x, y, r, a, c) {
                baseObj.arc.apply(ctx, [x - this.position.x + this.size.x / 2, y - this.position.y + this.size.y / 2, r, a, c]);
            },
            moveTo(x, y) {
                baseObj.moveTo.apply(ctx, [x - this.position.x + this.size.x / 2, y - this.position.y + this.size.y / 2]);
            },
            lineTo(x, y) {
                baseObj.lineTo.apply(ctx, [x - this.position.x + this.size.x / 2, y - this.position.y + this.size.y / 2]);
            },
            fillText(string, x, y) {
                baseObj.fillText.apply(ctx, [string, x - this.position.x + this.size.x / 2, y - this.position.y + this.size.y / 2]);
            },
            fillRect(x, y, width, height) {
                baseObj.fillRect.apply(ctx, [x - this.position.x + this.size.x / 2, y - this.position.y + this.size.y / 2, width, height]);
            },
            strokeRect(x, y, width, height) {
                baseObj.strokeRect.apply(ctx, [x - this.position.x + this.size.x / 2, y - this.position.y + this.size.y / 2, width, height]);
            },
            drawImage(image, x, y, dx, dy) {
                try {
                    if (dx && dy) {
                        baseObj.drawImage.apply(ctx, [image, x - this.position.x + this.size.x / 2, y - this.position.y + this.size.y / 2, dx, dy]);
                    }
                    else {
                        baseObj.drawImage.apply(ctx, [image, x - this.position.x + this.size.x / 2, y - this.position.y + this.size.y / 2]);
                    }
                }
                catch (e) {
                    ctx.fillStyle = Math.random() > .5 ? 'red' : 'black';
                    // console.log(image)
                    if (dx && dy) {
                        baseObj.fillRect.apply(ctx, [x - this.position.x + this.size.x / 2, y - this.position.y + this.size.y / 2, dx, dy]);
                    }
                    else {
                        baseObj.fillRect.apply(ctx, [x - this.position.x + this.size.x / 2, y - this.position.y + this.size.y / 2, 100, 100]);
                    }
                }
            },
            drawShapes(shapes) {
                for (let shape of shapes) {
                    shape.draw();
                }
            },
            convertScreenCordsToScreenCords(x, y) {
                return [
                    ((x / canvas.clientWidth) * this.size.x),
                    ((y / canvas.clientHeight) * this.size.y)
                ];
            },
            convertScreenCordsToWorldCords(x, y) {
                return [
                    ((x / canvas.clientWidth) * this.size.x) + this.position.x - (this.size.x / 2),
                    ((y / canvas.clientHeight) * this.size.y) + this.position.y - (this.size.y / 2)
                ];
            },
            getScreenCordsFromEvent(event) {
                return this.convertScreenCordsToWorldCords(event.clientX, event.clientY);
            }
        });
    }
}
