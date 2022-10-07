import type {SaveData} from "common/tools/saving/SaveData";
import type {ActionGeneratorSaveData} from "common/tools/actions/ActionGeneratorSaveData";
import type {ActionSaveData} from "common/tools/actions/ActionSaveData";

export interface ActionQueueSaveData extends SaveData {
    currentAction?: ActionSaveData;
    generators: ActionGeneratorSaveData[]
}
