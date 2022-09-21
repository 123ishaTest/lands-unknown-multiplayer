import {SaveData} from "common/tools/saving/SaveData";
import {ActionId} from "common/features/actionlist/ActionId";
import {ActionSaveData} from "common/tools/actions/ActionSaveData";

export interface ActionGeneratorSaveData extends SaveData {
    id: ActionId;
    currentAction: ActionSaveData
}
