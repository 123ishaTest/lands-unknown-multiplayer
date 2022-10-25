import {RecipeAction} from "common/features/actionlist/instances/RecipeAction";
import {ActionId} from "common/features/actionlist/ActionId";
import {ItemAmount} from "common/features/items/ItemAmount";
import {ItemId} from "common/features/items/ItemId";
import {Experience} from "common/features/skills/Experience";
import {SkillId} from "common/features/skills/SkillId";

export class SmithBronzePlateBodyAction extends RecipeAction {
    id: ActionId = ActionId.SmithBronzePlateBodyAction;

    constructor() {
        super("Bronze Platebody", 5, [
            new ItemAmount(ItemId.BronzeBar, 5),
        ], [
            new ItemAmount(ItemId.BronzePlateBody)
        ], [
            new Experience(25, SkillId.Smithing)
        ]);
    }
}
