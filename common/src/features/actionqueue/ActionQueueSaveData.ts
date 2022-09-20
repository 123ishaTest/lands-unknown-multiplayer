import {SaveData} from "common/tools/saving/SaveData";
import {ActionSaveData} from "common/tools/actions/ActionSaveData";

export interface ActionQueueSaveData extends SaveData {
    actions: ActionSaveData[]
}
