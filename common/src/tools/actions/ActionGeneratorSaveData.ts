import type {SaveData} from "common/tools/saving/SaveData";
import type {GeneratorId} from "common/features/actionlist/GeneratorId";

export interface ActionGeneratorSaveData extends SaveData {
    id: GeneratorId;
    repeats: number;
}
