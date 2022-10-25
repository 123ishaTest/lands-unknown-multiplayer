export class NpcDecision<T> {
    id: T;

    private readonly _decider: () => T;

    constructor(id: T, decider: () => T) {
        this.id = id;
        this._decider = decider;
    }

    decide(): T {
        return this._decider();
    }
}
