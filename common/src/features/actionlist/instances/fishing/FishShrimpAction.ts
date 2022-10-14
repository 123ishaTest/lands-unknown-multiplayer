import {RecipeAction} from "common/features/actionlist/instances/RecipeAction";
import {ActionId} from "common/features/actionlist/ActionId";
import {ItemAmount} from "common/features/items/ItemAmount";
import {ItemId} from "common/features/items/ItemId";
import {Experience} from "common/features/skills/Experience";
import {SkillId} from "common/features/skills/SkillId";

export class FishShrimpAction extends RecipeAction {
    id: ActionId = ActionId.FishShrimpAction;

    constructor() {
        super("Fish shrimp", 1, [], [
            new ItemAmount(ItemId.RawShrimp)
        ], [new Experience(10, SkillId.Fishing)]);
    }
}
