import { arrayShuffle } from "../library/AssortedFuctions.js";
import { Vector2 } from "../library/GameMath.js";
import { ctx } from "./game.js";
import { numPlayers } from "./Main.js";

class PresentKnowledge{
    id: string;
    want: number;
    constructor(id,want){
        this.id = id;
        this.want = want;
    }
}

export class Player{

    position: Vector2;
    presentKnowledge: PresentKnowledge[]  = [];
    wants:number[] = []

    forbiddenPresents: string[] = [];

    currentPresent: string|null = null;

    constructor(pos: Vector2){
        this.position = pos 
        for (let i = 0; i< numPlayers; i++){
            this.wants.push(i)
        }
        arrayShuffle(this.wants)
    }

    choosePresent(){
        if (this.currentPresent != null){
            throw new Error("I have  a present");
        }

        let wantedPresent = "new";

        for (let pk of this.presentKnowledge){
            if (pk.want > (.9*numPlayers) && !this.forbiddenPresents.includes(pk.id)){
                if (pk.want > (this.presentKnowledge.find(x => x.id == wantedPresent)?.want ?? 0)){
                    wantedPresent = pk.id
                }
            }
        }
        return wantedPresent
    }

    seePresent(id:string){
        this.presentKnowledge.push(new PresentKnowledge(id,this.wants.pop()))
    }
    setPresent(id){
        this.forbiddenPresents.push(id)
        this.currentPresent = id;
    }
    removePresent(){
        this.currentPresent = null;
    }

    draw(){
        ctx.fillStyle = 'orange'
        ctx.fillRect(this.position.x, this.position.y, 15, 15)
        ctx.strokeRect(this.position.x, this.position.y, 15, 15)
    }

}