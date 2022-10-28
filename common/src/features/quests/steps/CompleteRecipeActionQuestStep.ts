/**
 * Subscribes to the adventurers actionQueue and counts how often the actionId is completed
 */
import {InjectionQuestStep} from "common/features/quests/steps/InjectionQuestStep";
import {Saveable} from "common/tools/saving/Saveable";
import {ActionQueue} from "common/features/actionqueue/ActionQueue";
import {ActionId} from "common/features/actionlist/ActionId";
import {AbstractInjection} from "common/tools/injections/AbstractInjection";
import {Progress} from "common/tools/requirements/Progress";
import {IgtFeatures} from "common/features/IgtFeatures";

export class CompleteRecipeActionQuestStep extends InjectionQuestStep implements Saveable {
    _actionQueue: ActionQueue;
    actionId: ActionId;
    target: number;

    actual: number = 0;

    unsubscribe: () => void;

    saveKey: string;

    constructor(id: number, actionId: ActionId, target: number, injections: AbstractInjection[], actionQueue: ActionQueue) {
        super(id, injections);
        this.saveKey = `actionId-${id}`;
        this.actionId = actionId;
        this.target = target;
        this._actionQueue = actionQueue;
    }

    getProgress() {
        return new Progress(this.actual, this.target);
    }

    before(features: IgtFeatures) {
        this.unsubscribe = this._actionQueue.onActionCompletion.subscribe(action => {
            if (action.id === this.actionId) {
                this.actual++;
                if (this.actual >= this.target) {
                    this._onStepCompleted.dispatch(this);
                }
            }
        })
        super.before(features);
    }

    after(features: IgtFeatures) {
        this.unsubscribe();
        super.after(features);
    }

    save() {
        return {
            actual: this.actual
        }
    }

    load(data: any) {
        this.actual = data.actual
    }
}
