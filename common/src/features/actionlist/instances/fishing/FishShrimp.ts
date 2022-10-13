import {RecipeAction} from "common/features/actionlist/instances/RecipeAction";
import {ActionId} from "common/features/actionlist/ActionId";
import {ItemAmount} from "common/features/items/ItemAmount";
import {ItemId} from "common/features/items/ItemId";

export class FishShrimp extends RecipeAction {
    id: ActionId = ActionId.FishShrimpAction;

    constructor() {
        super("Fish shrimp", 1, [], [
            new ItemAmount(ItemId.RawShrimp)
        ]);
    }
}
