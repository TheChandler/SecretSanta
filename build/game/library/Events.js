class Event {
    constructor(func, time, id) {
        this.func = func;
        this.time = time;
        this.id = id;
    }
}
export class Events {
    constructor() {
        this.events = [];
        this.currentId = 0;
    }
    update() {
        for (let e of this.events) {
            e.time--;
            if (e.time === 0) {
                e.func();
                this.events = this.events.filter((element) => element.id !== e.id);
            }
        }
    }
    add(func, time) {
        console.log("adding event");
        this.events.push(new Event(func, time, this.currentId++));
    }
}
