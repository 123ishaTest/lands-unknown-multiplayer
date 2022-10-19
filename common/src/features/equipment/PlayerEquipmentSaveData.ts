import {SaveData} from "common/tools/saving/SaveData";
import {ItemSaveData} from "common/features/items/ItemSaveData";

export interface PlayerEquipmentSaveData extends SaveData {
    mainHand: ItemSaveData,
    offHand: ItemSaveData,
    body: ItemSaveData,
    cloak: ItemSaveData,
    feet: ItemSaveData,
    head: ItemSaveData,
    legs: ItemSaveData,
    neck: ItemSaveData,
    ring: ItemSaveData
}
