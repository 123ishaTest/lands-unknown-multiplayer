import type {ItemId} from "common/features/items/ItemId";

export interface InventorySlotSaveData {
    id: ItemId;
    amount: number;
    data: any;
}
