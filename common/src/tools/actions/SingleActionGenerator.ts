import {ActionGenerator} from "common/tools/actions/ActionGenerator";
import type {Action} from "common/tools/actions/Action";
import type {IgtFeatures} from "common/features/IgtFeatures";
import type {SingleActionGeneratorSaveData} from "common/tools/actions/SingleActionGeneratorSaveData";
import {GeneratorId} from "common/features/actionlist/GeneratorId";

export class SingleActionGenerator extends ActionGenerator {
    id = GeneratorId.SingleActionGenerator;
    action: Action;

    private _isStarted: boolean = false;

    constructor(action: Action, repeats: number = 1) {
        super(GeneratorId.SingleActionGenerator, action.description);
        this.action = action;
        this.setRequirement(action.requirement)
        this.setRepeats(repeats)
    }

    next(): Action {
        this.repeats--;
        this.action.resetAction();
        return this.action
    }

    canPerform(): boolean {
        return super.canPerform();
    }

    initialize(features: IgtFeatures) {
        this.action.initialize(features);
    }

    isStarted(): boolean {
        return this._isStarted;
    }

    save(): SingleActionGeneratorSaveData {
        return {
            id: this.id,
            repeats: this.repeats,
            action: this.action.save(),
        };
    }

    load(data: SingleActionGeneratorSaveData) {
        this.repeats = data.repeats;
    }
}
