import {SaveData} from "common/tools/saving/SaveData";
import {ActionId} from "common/features/actionlist/ActionId";

export interface ActionSaveData extends SaveData {
    id: ActionId;
    currentProgress: number;
    duration: number;
    repeat: number;
}
