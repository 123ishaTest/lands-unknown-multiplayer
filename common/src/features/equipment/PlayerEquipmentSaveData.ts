import {SaveData} from "common/tools/saving/SaveData";
import {ItemSaveData} from "common/features/items/ItemSaveData";
import {EquipmentType} from "common/features/equipment/EquipmentType";

export interface PlayerEquipmentSaveData extends SaveData {
    equipment: Record<EquipmentType, ItemSaveData | null>
}
