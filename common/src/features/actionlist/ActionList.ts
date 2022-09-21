import {IgtFeature} from "common/features/IgtFeature";
import {IgtFeatures} from "common/features/IgtFeatures";
import {SaveData} from "common/tools/saving/SaveData";
import {GainMoneyAction} from "common/features/actionqueue/GainMoneyAction";
import {ActionId} from "common/features/actionlist/ActionId";
import {Action} from "common/tools/actions/Action";
import {ActionGenerator} from "common/tools/actions/ActionGenerator";
import {SingleActionGenerator} from "common/tools/actions/SingleActionGenerator";
import {LinearActionGenerator} from "common/tools/actions/LinearActionGenerator";

type ActionFunction = () => Action | ActionGenerator;

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
            // Internals
            [ActionId.SingleActionGenerator]: () => {
                throw new Error("Do not query for this generator directly")
            },
            [ActionId.LinearActionGenerator]: () => {
                throw new Error("Do not query for this generator directly")
            },

            [ActionId.GainMoney]: () => new GainMoneyAction("Gain money", 4),
            [ActionId.DoesNotExist]: () => new GainMoneyAction("Gain money", 4),
            [ActionId.MoneyTutorial]: () => new LinearActionGenerator(ActionId.MoneyTutorial, [
                new GainMoneyAction("First we gain 1 money", 1),
                new GainMoneyAction("Then we get 2", 2),
                new GainMoneyAction("Then 100", 100),
                new GainMoneyAction("And then we're done...", 0),
            ]),
        }
    }

    public getActionGenerator(id: ActionId): ActionGenerator {
        if (id == undefined) {
            console.trace("Cannot get action of undefined ID")
        }
        const actionFunction = this.actions[id];
        const actionOrGenerator = actionFunction();
        const generator = actionOrGenerator instanceof Action ? new SingleActionGenerator(actionOrGenerator) : actionOrGenerator;
        generator.initialize(this._features);
        return generator;
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }

}
