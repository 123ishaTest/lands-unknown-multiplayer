import type {SaveData} from "common/tools/saving/SaveData";
import type {ActionId} from "common/features/actionlist/ActionId";
import type {ActionSaveData} from "common/tools/actions/ActionSaveData";

export interface ActionGeneratorSaveData extends SaveData {
    id: ActionId;
    currentAction: ActionSaveData
}
