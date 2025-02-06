class Event {
    constructor(func: () => void, time: number, id: number) {
        this.func = func;
        this.time = time;
        this.id = id;
    }
    func: () => void;
    time: number;
    id: number;
}
export class Events {
    events: Event[] = [];
    currentId: number = 0;

    update() {
        for (let e of this.events) {
            e.time--
            if (e.time === 0) {
                e.func();
                this.events = this.events.filter((element) => element.id !== e.id)
            }
        }
    }
    add(func: () => void, time: number) {
        console.log("adding event")
        this.events.push(new Event(func, time, this.currentId++))
    }
}