import {ActionGenerator} from "common/tools/actions/ActionGenerator";
import type {Action} from "common/tools/actions/Action";
import type {IgtFeatures} from "common/features/IgtFeatures";
import {ActionGeneratorSaveData} from "common/tools/actions/ActionGeneratorSaveData";
import {OutcomeFunction, WeightedDistribution} from "common/tools/random/distributions/WeightedDistribution";
import {GeneratorId} from "common/features/actionlist/GeneratorId";

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
        return this.actions.draw()();
    }

    initialize(features: IgtFeatures) {
        this._features = features;
    }

    isFinished(): boolean {
        return this._isFinished;
    }

    isStarted(): boolean {
        return false;
    }

    load(data: ActionGeneratorSaveData): void {
        // Empty
    }

    save(): ActionGeneratorSaveData {
        return {
            id: this.id,
        }
    }

}