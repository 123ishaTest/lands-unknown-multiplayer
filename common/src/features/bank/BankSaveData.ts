import type {InventorySlotSaveData} from "common/features/inventory/InventorySlotSaveData";
import type {SaveData} from "common/tools/saving/SaveData";

export interface BankSaveData extends SaveData {
    slots: InventorySlotSaveData[];
}
