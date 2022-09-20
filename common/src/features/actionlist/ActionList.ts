import {IgtFeature} from "common/features/IgtFeature";
import {IgtFeatures} from "common/features/IgtFeatures";
import {SaveData} from "common/tools/saving/SaveData";
import {GainMoneyAction} from "common/features/actionqueue/GainMoneyAction";
import {ActionId} from "common/features/actionlist/ActionId";
import {Action} from "common/tools/actions/Action";

type ActionFunction = () => Action;

/**
 * A giant repository of all possible actions
 */
export class ActionList extends IgtFeature {
    _features: IgtFeatures

    constructor() {
        super("actionList");
    }

    actions: Record<ActionId, ActionFunction>;


    initialize(features: IgtFeatures) {
        this._features = features;
        this.actions = {
            [ActionId.GainMoney]: () => new GainMoneyAction("Gain money", 4),
            [ActionId.DoesNotExist]: () => new GainMoneyAction("Gain money", 4),
        }
    }

    public getAction<T extends Action>(id: ActionId): T {
        const action = this.actions[id]() as T;
        action.initialize(this._features);
        return action;
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }

}
