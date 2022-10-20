import {RecipeAction} from "common/features/actionlist/instances/RecipeAction";
import {ActionId} from "common/features/actionlist/ActionId";
import {ItemAmount} from "common/features/items/ItemAmount";
import {ItemId} from "common/features/items/ItemId";
import {Experience} from "common/features/skills/Experience";
import {SkillId} from "common/features/skills/SkillId";

export class SmithBronzeHelmetAction extends RecipeAction {
    id: ActionId = ActionId.SmithBronzeHelmetAction;

    constructor() {
        super("Smith Bronze Helmet", 5, [
            new ItemAmount(ItemId.BronzeBar, 3),
        ], [
            new ItemAmount(ItemId.BronzeHelmet)
        ], [
            new Experience(15, SkillId.Smithing)
        ]);
    }
}
