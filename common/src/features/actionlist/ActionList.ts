import {IgtFeature} from "common/features/IgtFeature";
import type {IgtFeatures} from "common/features/IgtFeatures";
import type {SaveData} from "common/tools/saving/SaveData";
import {MineAction} from "common/features/actionqueue/MineAction";
import {ActionId} from "common/features/actionlist/ActionId";
import {Action} from "common/tools/actions/Action";
import type {ActionGenerator} from "common/tools/actions/ActionGenerator";
import {SingleActionGenerator} from "common/tools/actions/SingleActionGenerator";
import {LinearActionGenerator} from "common/tools/actions/LinearActionGenerator";
import {GainMoneyAction} from "common/features/actionqueue/GainMoneyAction";

type ActionFunction = () => Action | ActionGenerator;

/**
 * A giant repository of all possible actions
 */
export class ActionList extends IgtFeature {
    _features!: IgtFeatures

    constructor() {
        super("actionList");
    }

    actions!: Record<ActionId, ActionFunction>;


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
            [ActionId.MineAction]: () => new MineAction("Lets go mining", 4),
            [ActionId.MiningTutorial]: () => new LinearActionGenerator(ActionId.MiningTutorial, [
                new MineAction("Chop a rock", 1),
                new MineAction("Chop more rock", 2),
                new MineAction("Chop a big rock", 100),
                new MineAction("Be proud of yourself", 1),
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
