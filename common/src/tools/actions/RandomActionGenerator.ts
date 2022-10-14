import {ActionGenerator} from "common/tools/actions/ActionGenerator";
import type {Action} from "common/tools/actions/Action";
import type {IgtFeatures} from "common/features/IgtFeatures";
import type {ActionGeneratorSaveData} from "common/tools/actions/ActionGeneratorSaveData";
import type {OutcomeFunction, WeightedDistribution} from "common/tools/random/distributions/WeightedDistribution";
import type {GeneratorId} from "common/features/actionlist/GeneratorId";

/**
 * Randomly selects an action from a given list
 */
export class RandomActionGenerator extends ActionGenerator {
    id: GeneratorId;
    actions: WeightedDistribution<OutcomeFunction<Action>>;
    private _isFinished: boolean = false;
    private _features!: IgtFeatures;

    constructor(id: GeneratorId, description: string, actions: WeightedDistribution<OutcomeFunction<Action>>) {
        super(id, description);
        this.id = id;
        this.actions = actions;
    }

    next(): Action {
        this.repeats--;
        const action = this.actions.draw()();
        action.initialize(this._features);
        return action;
    }

    initialize(features: IgtFeatures) {
        this._features = features;
    }

    isFinished(): boolean {
        return this._isFinished || super.isFinished();
    }

    isStarted(): boolean {
        return false;
    }

    load(data: ActionGeneratorSaveData): void {
        this.repeats = data.repeats;
    }

    save(): ActionGeneratorSaveData {
        return {
            id: this.id,
            repeats: this.repeats,
        }
    }

}
