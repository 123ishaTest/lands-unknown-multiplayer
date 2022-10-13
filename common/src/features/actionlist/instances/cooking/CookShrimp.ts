import {RecipeAction} from "common/features/actionlist/instances/RecipeAction";
import {ActionId} from "common/features/actionlist/ActionId";
import {ItemAmount} from "common/features/items/ItemAmount";
import {ItemId} from "common/features/items/ItemId";

export class CookShrimp extends RecipeAction {
    id: ActionId = ActionId.CookShrimpAction;

    constructor() {
        super("Cook shrimp", 5, [
            new ItemAmount(ItemId.RawShrimp)
        ], [
            new ItemAmount(ItemId.CookedShrimp)
        ]);
    }
}
