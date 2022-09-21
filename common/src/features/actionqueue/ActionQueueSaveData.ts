import {SaveData} from "common/tools/saving/SaveData";
import {ActionGeneratorSaveData} from "common/tools/actions/ActionGeneratorSaveData";

export interface ActionQueueSaveData extends SaveData {
    generators: ActionGeneratorSaveData[]
}
