import {SaveData} from "common/tools/saving/SaveData";
import {ItemId} from "common/features/items/ItemId";

export interface ItemSaveData extends SaveData {
    id: ItemId;
    data?: any;
}
