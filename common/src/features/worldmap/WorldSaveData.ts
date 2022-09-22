import {SaveData} from "common/tools/saving/SaveData";
import {WorldLocationIdentifierSaveData} from "common/features/worldmap/WorldLocationIdentifierSaveData";


export interface WorldSaveData extends SaveData {
    location: WorldLocationIdentifierSaveData
}
