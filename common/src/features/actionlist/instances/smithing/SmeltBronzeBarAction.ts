import {RecipeAction} from "common/features/actionlist/instances/RecipeAction";
import {ActionId} from "common/features/actionlist/ActionId";
import {ItemAmount} from "common/features/items/ItemAmount";
import {ItemId} from "common/features/items/ItemId";
import {Experience} from "common/features/skills/Experience";
import {SkillId} from "common/features/skills/SkillId";

export class SmeltBronzeBarAction extends RecipeAction {
    id: ActionId = ActionId.SmeltBronzeBarAction;

    constructor() {
        super("Smelt Bronze bar", 5, [
            new ItemAmount(ItemId.CopperOre),
            new ItemAmount(ItemId.TinOre),
        ], [
            new ItemAmount(ItemId.BronzeBar)
        ], [
            new Experience(5, SkillId.Smithing)
        ]);
    }
}
