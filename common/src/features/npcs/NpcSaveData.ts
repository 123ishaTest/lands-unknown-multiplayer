import {SaveData} from "common/tools/saving/SaveData";
import {NpcId} from "common/features/npcs/NpcId";

export interface NpcSaveData extends SaveData {
    id: NpcId;
    data: any;
}
