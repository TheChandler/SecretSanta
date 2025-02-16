import { ctx, shapeFactory } from "../../code/game.js";
export class Menu {
    constructor(pages) {
        var _a;
        this.pages = pages;
        this.currentPage = Object.keys(pages)[0];
        this.hovered = '';
        this.boundShapes = [];
        this.boundShapeNames = [];
        this.isVisible = (_a = !this.pages[this.currentPage].hide) !== null && _a !== void 0 ? _a : true;
    }
    click(event) {
        let cords = ctx.convertScreenCordsToScreenCords(event.clientX, event.clientY);
        let buttonClicked = this.testActivePageButtons(cords);
        let item;
        if (buttonClicked && (item = this.findItem(buttonClicked))) {
            this.triggerItem(item);
        }
    }
    triggerItemByName(name) {
        let item;
        if (item = this.findItem(name)) {
            this.triggerItem(item);
        }
    }
    bindToButton(name, button) {
        this.boundShapes.push(button);
        this.boundShapeNames.push(name);
    }
    findItem(buttonName) {
        return this.activePage.items.find(({ name }) => (name === buttonName));
    }
    triggerItem(item) {
        if (item.func) {
            item.func();
        }
        else if (item.menu) {
            this.currentPage = item.menu;
        }
    }
    mousemove(event) {
        let cords = ctx.convertScreenCordsToScreenCords(event.clientX, event.clientY);
        let button = this.testActivePageButtons(cords);
        this._hovered = button;
    }
    set _hovered(state) {
        if (this.hovered === state) {
            return;
        }
        if (this.hovered) {
            let button = this.boundShapes[this.boundShapeNames.indexOf(this.hovered)];
            if (button) {
                button.hover = false;
            }
        }
        if (state) {
            let button = this.boundShapes[this.boundShapeNames.indexOf(state)];
            if (button) {
                button.hover = true;
            }
        }
        this.hovered = state;
    }
    testActivePageButtons(cords) {
        let point = shapeFactory.createVector2(cords[0], cords[1]);
        let i = 0;
        // console.log("point", point)
        for (let { name } of this.activePage.items) {
            //If bound shapes array does not contain shape for menu name, create rectangle
            let button = this.boundShapes[this.boundShapeNames.indexOf(name)];
            let collisionShape = shapeFactory.createPolygon([[50, i * 100], [50, (i * 100) + 90], [450, (i * 100) + 90], [450, i * 100]]);
            if ((button && button.sprite.collides(point)) || (!this.activePage.hide && collisionShape && collisionShape.collides(point))) {
                return name;
            }
            i++;
        }
        return '';
    }
    get activePage() {
        return this.pages[this.currentPage];
    }
    render() {
        var _a;
        let i = 0;
        ctx.font = "50px serif";
        if (this.isVisible) {
            for (let option of Object.values(this.activePage.items)) {
                ctx.fillStyle = (this.hovered == option.name) ? ('#0a0') : ((_a = option.color) !== null && _a !== void 0 ? _a : '#fff');
                ctx.baseObj.fillRect(50, i * 100, 400, 90);
                ctx.fillStyle = '#f00';
                ctx.baseObj.fillText(option.name, 50, (i * 100) + 80);
                i++;
            }
        }
        for (let shape of this.boundShapes) {
            shape.draw();
        }
    }
}
