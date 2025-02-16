import { arrayShuffle } from "../library/AssortedFuctions.js";
import { ctx } from "./game.js";
import { numPlayers } from "./Main.js";
class PresentKnowledge {
    constructor(id, want) {
        this.id = id;
        this.want = want;
    }
}
export class Player {
    constructor(pos) {
        this.presentKnowledge = [];
        this.wants = [];
        this.forbiddenPresents = [];
        this.currentPresent = null;
        this.position = pos;
        for (let i = 0; i < numPlayers; i++) {
            this.wants.push(i);
        }
        arrayShuffle(this.wants);
    }
    choosePresent() {
        var _a, _b;
        if (this.currentPresent != null) {
            throw new Error("I have  a present");
        }
        let wantedPresent = "new";
        for (let pk of this.presentKnowledge) {
            if (pk.want > (.9 * numPlayers) && !this.forbiddenPresents.includes(pk.id)) {
                if (pk.want > ((_b = (_a = this.presentKnowledge.find(x => x.id == wantedPresent)) === null || _a === void 0 ? void 0 : _a.want) !== null && _b !== void 0 ? _b : 0)) {
                    wantedPresent = pk.id;
                }
            }
        }
        return wantedPresent;
    }
    seePresent(id) {
        this.presentKnowledge.push(new PresentKnowledge(id, this.wants.pop()));
    }
    setPresent(id) {
        this.forbiddenPresents.push(id);
        this.currentPresent = id;
    }
    removePresent() {
        this.currentPresent = null;
    }
    draw() {
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.position.x, this.position.y, 15, 15);
        ctx.strokeRect(this.position.x, this.position.y, 15, 15);
    }
}
