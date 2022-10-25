import {SaveData} from "common/tools/saving/SaveData";
import {NpcId} from "common/features/npcs/NpcId";
import {NpcSaveData} from "common/features/npcs/NpcSaveData";

export interface NpcListSaveData extends SaveData {
    npcs: Record<NpcId, NpcSaveData | null>
}
