import { State } from "../library/State.js";
import { shapeFactory } from "./game.js";
import { Player } from "./player.js";
import { Present } from "./Present.js";
export const numPlayers = 70;
export class MainMenu extends State {
    constructor() {
        super();
        this.players = [];
        this.presents = [];
        this.nextPlayersTurn = 0;
        this.nextPresentToTake = 0;
        this.makePoints();
        this.makePresents();
        this.takeTurn();
    }
    makePoints() {
        this.players = [];
        let points = getCirclePoints(500, numPlayers);
        for (let point of points) {
            this.players.push(new Player(shapeFactory.createVector2(point[0], point[1])));
        }
        // setTimeout(() => {
        //     this.makePoints()
        //     let randPlayer = this.getRandomPlayer()
        //     if (randPlayer){
        //         this.presents.forEach(p => p.setDestination(this.getRandomPlayer().position, 1500))
        //     }
        // }, 1500);
    }
    getRandomPlayer() {
        return this.players[Math.floor(this.players.length * Math.random())];
    }
    makePresents() {
        let points = getCirclePoints(100, numPlayers);
        for (let point of points) {
            this.presents.push(new Present(shapeFactory.createVector2(point[0], point[1])));
        }
    }
    update() {
        this.presents.forEach(p => p.update());
        this.draw();
    }
    takeTurn() {
        var _a;
        let choosingPlayer = null;
        for (let i = 0; i < this.nextPlayersTurn; i++) {
            if (this.players[i].currentPresent == null) {
                choosingPlayer = this.players[i];
            }
        }
        if (choosingPlayer == null) {
            choosingPlayer = this.players[this.nextPlayersTurn];
            this.nextPlayersTurn++;
        }
        let wanted = choosingPlayer.choosePresent();
        let activePresent = this.presents.find(p => p.id == wanted);
        if (activePresent == null) { // No one had this present. Take a new one
            activePresent = this.presents[this.nextPresentToTake];
            //@ts-ignore
            this.players.forEach(p => p.seePresent(activePresent.id));
            this.nextPresentToTake++;
        }
        else {
            //@ts-ignore
            (_a = this.players.find(p => p.currentPresent == activePresent.id)) === null || _a === void 0 ? void 0 : _a.removePresent();
        }
        activePresent.setDestination(choosingPlayer.position, 100);
        choosingPlayer.setPresent(activePresent.id);
        setTimeout(() => {
            this.takeTurn();
        }, 50);
    }
    click(event) {
    }
    mousemove(event) {
    }
    draw() {
        this.players.forEach(p => p.draw());
        this.presents.forEach(p => p.draw());
    }
}
function getCirclePoints(radius, n) {
    // n = 2
    let points = [];
    let offset = Math.random() * 2 * Math.PI;
    // offset = performance.now()/ 40000
    for (let i = 0; i < n; i++) {
        let angle = ((2 * Math.PI) / n) * i;
        angle += offset;
        let x = Math.sin(angle) * radius;
        console.log("x", angle, Math.PI);
        let y = Math.cos(angle) * radius;
        points.push([x, y]);
    }
    return points;
}
