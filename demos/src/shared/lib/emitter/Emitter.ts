export class Emitter extends EventTarget {
    constructor(public eventName: string) {
        super();
    }

    public emitEvent<T>(payload: T) {
        this.dispatchEvent(
            new CustomEvent<T>(this.eventName, { detail: payload }),
        );
    }
}
