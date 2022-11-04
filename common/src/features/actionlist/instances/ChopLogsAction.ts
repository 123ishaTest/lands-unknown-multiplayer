import {ActionId} from "common/features/actionlist/ActionId";
import {RecipeAction} from "common/features/actionlist/instances/RecipeAction";
import {ItemAmount} from "common/features/items/ItemAmount";
import {ItemId} from "common/features/items/ItemId";
import {Experience} from "common/features/skills/Experience";
import {SkillId} from "common/features/skills/SkillId";

export class ChopLogsAction extends RecipeAction {
    id: ActionId = ActionId.ChopLogs;

    constructor() {
        super("Chop Logs", 5, [], [
            new ItemAmount(ItemId.NormalLogs)
        ], [new Experience(10, SkillId.Woodcutting)]);
    }
}
