import type {SaveData} from "common/tools/saving/SaveData";
import type {WorldLocationIdentifierSaveData} from "common/features/worldmap/WorldLocationIdentifierSaveData";


export interface WorldSaveData extends SaveData {
    location: WorldLocationIdentifierSaveData
}
