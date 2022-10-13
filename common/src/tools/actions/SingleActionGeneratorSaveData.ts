import type {ActionGeneratorSaveData} from "common/tools/actions/ActionGeneratorSaveData";
import {ActionSaveData} from "common/tools/actions/ActionSaveData";

export interface SingleActionGeneratorSaveData extends ActionGeneratorSaveData {
    action: ActionSaveData;
}
