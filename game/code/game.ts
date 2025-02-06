import { Vector2 } from "../library/GameMath.js";
import { CameraConstructor } from "../library/GameCamera.js";
import { MainMenu } from "./Main.js";
import { State } from "../library/State.js";
import { ShapeFactory } from "../library/ShapeFactory.js";


export const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canv");
// canvas.height = canvas.clientHeight;
// canvas.width = canvas.clientWidth;
canvas.height = 1300;
canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
// console.log("Canvas Size:")
// console.log(canvas.width, canvas.height)
export const c = <CanvasRenderingContext2D>canvas.getContext("2d")
export const ctx = CameraConstructor.MakeGameCamera(c, canvas, 0, 0);
export const staticCtx = ctx.baseObj;
export const shapeFactory = new ShapeFactory(ctx)
export const staticShapeFactory = new ShapeFactory(staticCtx)
interface StateContainer {
    state: State
}
let stateContainer: StateContainer = {
    state: new MainMenu()
}
stateContainer.state.name = 'main menu'

canvas.addEventListener('click', (event) => stateContainer.state.click(event))
canvas.addEventListener("mousemove", (event) => stateContainer.state.mousemove(event))
canvas.addEventListener('contextmenu', (event) => stateContainer.state.contextmenu(event))

export const FRAMERATE =  120; 

let tickLength = 1000 / FRAMERATE;
let nextTickTime = 0;
function update() {
    while (performance.now() > nextTickTime) {
        if ((performance.now() - nextTickTime) > (tickLength * 10)) {
            nextTickTime = performance.now() + tickLength
        } else {
            nextTickTime += tickLength
        }
        ctx.fillStyle = "#2b2c2c"
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(ctx.position.x - (ctx.size.x / 2), ctx.position.y - (ctx.size.y / 2), canvas.width, canvas.height)
        if (stateContainer.state) {
            stateContainer.state.update();
        }
    }
    requestAnimationFrame(update)
}

export function switchState(state: State) {
    stateContainer.state = state;
}

update();

