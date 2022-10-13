import {IgtFeature} from "common/features/IgtFeature";
import type {IgtFeatures} from "common/features/IgtFeatures";
import type {SaveData} from "common/tools/saving/SaveData";
import {MineAction} from "common/features/actionqueue/MineAction";
import {ActionId} from "common/features/actionlist/ActionId";
import type {Action} from "common/tools/actions/Action";
import {TravelAction} from "common/features/worldmap/TravelAction";
import {FishShrimp} from "common/features/actionlist/instances/fishing/FishShrimp";
import type {ActionSaveData} from "common/tools/actions/ActionSaveData";
import {CookShrimp} from "common/features/actionlist/instances/cooking/CookShrimp";

type ActionFunction = (...args: any[]) => Action;

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
            [ActionId.TravelAction]: (road, isReversed) => {
                return new TravelAction(road, isReversed)
            },
            [ActionId.MineAction]: () => new MineAction("Lets go mining", 4),
            [ActionId.FishShrimpAction]: () => new FishShrimp(),
            [ActionId.CookShrimpAction]: () => new CookShrimp(),
        }
    }

    public getAction(id: ActionId, saveData: ActionSaveData | null = null, ...args: any[]): Action {
        if (id == undefined) {
            console.trace("Cannot get action of undefined ID")
        }
        const action = this.actions[id](...args);

        if (saveData) {
            action.load(saveData);
        }
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
