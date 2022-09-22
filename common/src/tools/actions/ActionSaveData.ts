import type {SaveData} from "common/tools/saving/SaveData";
import type {ActionId} from "common/features/actionlist/ActionId";

export interface ActionSaveData extends SaveData {
    id: ActionId;
    currentProgress: number;
    duration: number;
}
