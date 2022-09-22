import type {SaveData} from "common/tools/saving/SaveData";
import type {ActionGeneratorSaveData} from "common/tools/actions/ActionGeneratorSaveData";

export interface ActionQueueSaveData extends SaveData {
    generators: ActionGeneratorSaveData[]
}
