import {IgtFeature} from "common/features/IgtFeature";
import type {IgtFeatures} from "common/features/IgtFeatures";
import type {SaveData} from "common/tools/saving/SaveData";
import {ActionId} from "common/features/actionlist/ActionId";
import type {Action} from "common/tools/actions/Action";
import {TravelAction} from "common/features/worldmap/TravelAction";
import {FishShrimpAction} from "common/features/actionlist/instances/fishing/FishShrimpAction";
import type {ActionSaveData} from "common/tools/actions/ActionSaveData";
import {CookShrimpAction} from "common/features/actionlist/instances/cooking/CookShrimpAction";
import {WithdrawItemByIdAction} from "common/features/actionlist/instances/banking/WithdrawItemByIdAction";
import {DepositItemByIdAction} from "common/features/actionlist/instances/banking/DepositItemByIdAction";
import {ItemId} from "common/features/items/ItemId";
import {SmeltBronzeBarAction} from "common/features/actionlist/instances/smithing/SmeltBronzeBarAction";
import {SmithBronzeHelmetAction} from "common/features/actionlist/instances/smithing/SmithBronzeHelmetAction";
import {MineCopperAction} from "common/features/actionlist/instances/mining/MineCopperAction";
import {MineTinAction} from "common/features/actionlist/instances/mining/MineTinAction";
import {SmithBronzePlateBodyAction} from "common/features/actionlist/instances/smithing/SmithBronzePlateBodyAction";
import {SmithBronzePickaxeAction} from "common/features/actionlist/instances/smithing/SmithBronzePickaxeAction";
import {ChopLogsAction} from "common/features/actionlist/instances/ChopLogsAction";

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
            [ActionId.FishShrimpAction]: () => new FishShrimpAction(),
            [ActionId.CookShrimpAction]: () => new CookShrimpAction(),
            [ActionId.WithdrawItemByIdAction]: () => new WithdrawItemByIdAction(ItemId.Empty, 0),

            // Mining
            [ActionId.MineCopperAction]: () => new MineCopperAction(),
            [ActionId.MineTinAction]: () => new MineTinAction(),

            // Smithing
            [ActionId.DepositItemByIdAction]: () => new DepositItemByIdAction(ItemId.Empty, 0),
            [ActionId.SmeltBronzeBarAction]: () => new SmeltBronzeBarAction(),
            [ActionId.SmithBronzeHelmetAction]: () => new SmithBronzeHelmetAction(),
            [ActionId.SmithBronzePlateBodyAction]: () => new SmithBronzePlateBodyAction(),
            [ActionId.SmithBronzePickaxe]: () => new SmithBronzePickaxeAction(),

            // Woodcutting
            [ActionId.ChopLogs]: () => new ChopLogsAction(),
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
