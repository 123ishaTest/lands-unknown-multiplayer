import {ItemType} from "common/features/items/ItemType";
import {ItemId} from "common/features/items/ItemId";

export interface ItemConfig {
    id: ItemId,
    name: string,
    description: string,
    maxStack?: number,
    type?: ItemType,
}
