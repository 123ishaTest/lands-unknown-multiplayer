import type {InventorySlotSaveData} from "common/features/inventory/InventorySlotSaveData";
import type {SaveData} from "common/tools/saving/SaveData";

export interface InventorySaveData extends SaveData {
    slots: InventorySlotSaveData[];
}
