import {RecipeAction} from "common/features/actionlist/instances/RecipeAction";
import {ActionId} from "common/features/actionlist/ActionId";
import {ItemAmount} from "common/features/items/ItemAmount";
import {ItemId} from "common/features/items/ItemId";
import {Experience} from "common/features/skills/Experience";
import {SkillId} from "common/features/skills/SkillId";

export class CookShrimpAction extends RecipeAction {
    id: ActionId = ActionId.CookShrimpAction;

    constructor() {
        super("Cook shrimp", 1, [
            new ItemAmount(ItemId.NormalLogs),
            new ItemAmount(ItemId.RawShrimp),
        ], [
            new ItemAmount(ItemId.CookedShrimp)
        ], [
            new Experience(10, SkillId.Cooking)
        ]);
    }
}
