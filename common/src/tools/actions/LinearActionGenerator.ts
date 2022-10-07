import {ActionGenerator} from "common/tools/actions/ActionGenerator";
import type {Action} from "common/tools/actions/Action";
import type {LinearActionGeneratorSaveData} from "common/tools/actions/LinearActionGeneratorSaveData";
import type {IgtFeatures} from "common/features/IgtFeatures";
import {GeneratorId} from "common/features/actionlist/GeneratorId";

/**
 * Linearly feeds a list of actions
 */
export class LinearActionGenerator extends ActionGenerator {
    id: GeneratorId;
    actions: Action[];
    private _index: number = 0;
    private _isFinished: boolean = false;

    constructor(id: GeneratorId, description: string, actions: Action[]) {
        super(id, description);
        this.id = id;
        this.actions = actions;
    }

    // TODO check if needed here or in queue
    initialize(features: IgtFeatures): void {
        this.actions.forEach(action => {
            action.initialize(features);
        })
    }


    isFinished(): boolean {
        return this._isFinished && super.isFinished();
    }

    next(): Action {
        this._isFinished = false;
        if (this._index === 0) {
            this.repeats--;
        }
        const newAction = this.actions[this._index];
        this._index++;
        if (this._index === this.actions.length) {
            this._isFinished = true;
            this.reset();
        }
        return newAction;
    }

    private reset(): void {
        this._index = 0;
        this.actions.forEach(action => {
            action.resetAction();
        })
    }

    isStarted(): boolean {
        return false;
    }

    load(data: LinearActionGeneratorSaveData): void {
        this._index = data.index;
        this.repeats = data.repeats;
    }

    save(): LinearActionGeneratorSaveData {
        return {
            id: this.id,
            repeats: this.repeats,
            index: this._index,
        }
    }
}
