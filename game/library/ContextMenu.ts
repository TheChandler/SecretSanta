import { MenuItem } from "../library/menu/MenuItem.js";

export class ContextMenu {
    x: number;
    y: number;
    options
    constructor(position: number[], options?) {
        this.x = position[0];
        this.y = position[1];
        if (options){
            this.options = options;
        }else{
            this.options = [];
        }
    }
    addOption(title: string, callback: (x?,y?)=>void){
        this.options.push(new MenuItem(this.x, this.y + (this.options.length * 20), title, callback))
    }
}