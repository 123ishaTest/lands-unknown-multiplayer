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

    next(): Action {
        return this.actions[this._index++];
    }

    isFinished(): boolean {
        return this._index === this.actions.length - 1;
    }

    isStarted(): boolean {
        return false;
    }

    load(data: LinearActionGeneratorSaveData): void {
        this._index = data.index;
    }

    save(): LinearActionGeneratorSaveData {
        return {
            id: this.id,
            index: this._index,
        }
    }
}
