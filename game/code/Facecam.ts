import { Vector2 } from "../library/GameMath.js";
import { FacecamData } from "./FacecamData.js";
import { canvas, staticCtx as ctx } from "./game.js";

const TALKING_RATE = 10;

export class Facecam {
    constructor(faceImages: FacecamData) {
        this.ctx = ctx;
        this.faceImages = faceImages;
        this.pos = new Vector2(ctx, canvas.width - 400, canvas.height - 250);
    }
    ctx;
    count = 0;
    isTalking = false;
    mouthOpen = false;
    pos: Vector2;
    faceImages: FacecamData;
    
    update() {
        if (this.isTalking) {
            if (this.count++ > TALKING_RATE) {
                console.timeEnd("mouthTimer")
                console.time("mouthTimer")
                this.count = 0;
                this.mouthOpen = !this.mouthOpen;
            }else{
                // console.log(this.count)
            }
        } else if (this.mouthOpen) {
            this.mouthOpen = false;
        }
    }
    
    startTalking() {
        console.log("start talking")
        this.isTalking = true;
    }
    stopTalking() {
        console.log("stop talking")
        this.isTalking = false;
    }

    setPosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    draw() {
        ctx.drawImage(this.mouthOpen ? this.faceImages.open : this.faceImages.closed, this.pos.x, this.pos.y, 316, 200)
    }
}