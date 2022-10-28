import {RecipeAction} from "common/features/actionlist/instances/RecipeAction";
import {ActionId} from "common/features/actionlist/ActionId";
import {ItemAmount} from "common/features/items/ItemAmount";
import {ItemId} from "common/features/items/ItemId";
import {Experience} from "common/features/skills/Experience";
import {SkillId} from "common/features/skills/SkillId";

export class SmithBronzePickaxeAction extends RecipeAction {
    id: ActionId = ActionId.SmithBronzePickaxe;

    constructor() {
        super("Bronze Pickaxe", 5, [
            new ItemAmount(ItemId.BronzeBar, 2),
        ], [
            new ItemAmount(ItemId.BronzePickaxe)
        ], [
            new Experience(10, SkillId.Smithing)
        ]);
    }
}
