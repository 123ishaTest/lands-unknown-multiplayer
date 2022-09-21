import {ActionGenerator} from "common/tools/actions/ActionGenerator";
import {Action} from "common/tools/actions/Action";
import {LinearActionGeneratorSaveData} from "common/tools/actions/LinearActionGeneratorSaveData";
import {IgtFeatures} from "common/features/IgtFeatures";
import {ActionId} from "common/features/actionlist/ActionId";

/**
 * Linearly feeds a list of actions
 */
export class LinearActionGenerator extends ActionGenerator {
    id: ActionId;
    actions: Action[];

    private _index: number = 0;
    private _isFinished: boolean = false;

    constructor(id: ActionId, actions: Action[]) {
        super(id);
        this.id = id;
        this.actions = actions;
    }

    public get description(): string {
        return this.currentAction.description
    }

    next(): void {
        this._index++;
        if (this._index === this.actions.length) {
            this._isFinished = true;
        }
    }

    public get currentAction() {
        return this.actions[this._index]
    }

    perform(delta: number): void {
        this.currentAction.perform(delta);
        this.checkCompletion();
    }

    initialize(features: IgtFeatures) {
        this.actions.forEach(action => {
            action.initialize(features);
        })
    }

    isFinished(): boolean {
        return this._isFinished;
    }

    isStarted(): boolean {
        return false;
    }

    load(data: LinearActionGeneratorSaveData): void {
        this._index = data.index;
        this.currentAction.load(data.currentAction);
    }

    save(): LinearActionGeneratorSaveData {
        return {
            id: this.id,
            index: this._index,
            currentAction: this.currentAction.save(),
        }
    }

    stop(): void {
    }

    start(): boolean {
        return true;
    }

}
