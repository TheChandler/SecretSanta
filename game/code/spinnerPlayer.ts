import { shapeFactory } from "./game.js";

export class SpinnerPlayer {
    constructor(speed: number) {
        this.speed = speed; // base movement speed constant, not the current speed
    }

    position = shapeFactory.createVector2(500, 500);
    radius = 150; //distance from center to balls center
    angle = 0;
    ball1 = shapeFactory.createCircle(0, 0, 15);
    ball2 = shapeFactory.createCircle(0, 0, 15);
    dead = false;
    speed: number;
    isFrozen = false;
    draw() {
        // this.position.draw(ctx);

        this.ball1.draw('#0000ff')
        this.ball1.drawOutline('black')
        this.ball2.draw('#0099ff')
        this.ball2.drawOutline('black')
    }
    rewindAngleByFrames(frames) {
        this.angle -= (this.speed * 2 * .00174 * frames);
    }
    set x(n: number) {
        this.position.x = n;
    }
    set y(n: number) {
        this.position.y = n;
    }

    update(input) {
        if (this.dead) {
            return;
        }
        let moveVector = [0,0]
        if (!this.isFrozen) {
         moveVector = this.createMovementVector(input)
        }

        if (moveVector[0] || moveVector[1]) {
            this.position.add(shapeFactory.createVector2(moveVector[0], moveVector[1]));
        }
        this.angle += this.speed * 2 * .00174;

        this.positionBalls()
        // if (this.dead && !CREATE_MODE) {
        //     this.reset();
        // }
    }

    positionBalls() {
        this.ball1.position =
            shapeFactory.createVector2(
                this.position.x + Math.cos(this.angle) * this.radius,
                this.position.y + Math.sin(this.angle) * this.radius
            );
        this.ball2.position =
            shapeFactory.createVector2(
                this.position.x + Math.cos(this.angle + Math.PI) * this.radius,
                this.position.y + Math.sin(this.angle + Math.PI) * this.radius,
            );
    }
    reset() {
        this.dead = false;
        this.position.x = 500;
        this.position.y = 500;
        this.angle = 0;
    }

    createMovementVector(input) {
        let moveVector = [0, 0]
        if (input.keys.ArrowLeft) {
            moveVector[0] += -this.speed;
        }
        if (input.keys.ArrowRight) {
            moveVector[0] += this.speed;
        }
        if (input.keys.ArrowDown) {
            moveVector[1] += this.speed;
        }
        if (input.keys.ArrowUp) {
            moveVector[1] += -this.speed;
        }
        if (moveVector[0] && moveVector[1]) {
            moveVector[0] *= .7071067811865475244008443621048490392848359376884740365883398689;
            moveVector[1] *= .7071067811865475244008443621048490392848359376884740365883398689;
        }
        return moveVector
    }
}