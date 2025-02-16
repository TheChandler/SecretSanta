import { lerp } from "../library/AssortedFuctions.js";
import { ctx, shapeFactory } from "./game.js";
export class Present {
    constructor(position) {
        this.targetPosition = null;
        this.startPosition = null;
        this.targetTime = null;
        this.startTime = null;
        this.color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
        this.position = position;
        this.id = Math.floor(Math.random() * 0xffffffff).toString(16);
    }
    setDestination(pos, time) {
        // if (this.color == "#ffffff"){
        //     this.color = "#000000"
        // }else{
        //     this.color = "#ffffff"
        // }
        this.startPosition = shapeFactory.createVector2(this.position.x, this.position.y);
        this.startTime = performance.now();
        this.targetTime = this.startTime + time;
        this.targetPosition = pos;
    }
    update() {
        if (!this.targetPosition || !this.targetTime || !this.startTime || !this.startPosition) {
            return;
        }
        if (performance.now() > this.targetTime) {
            console.log("Overdue");
            this.position.x = this.targetPosition.x;
            this.position.y = this.targetPosition.y;
            this.targetPosition = null;
            return;
        }
        let progress = (performance.now() - this.startTime) / (this.targetTime - this.startTime);
        // console.log(performance.now(), this.startTime, this.targetTime)
        // console.log("Progress", progress)
        // console.log(this.startPosition.x, lerp(this.startPosition.x, this.targetPosition.x, progress), this.targetPosition.x)
        this.position.x = lerp(this.startPosition.x, this.targetPosition.x, progress);
        this.position.y = lerp(this.startPosition.y, this.targetPosition.y, progress);
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, 10, 10);
    }
}
