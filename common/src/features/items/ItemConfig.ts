import type {ItemType} from "common/features/items/ItemType";
import type {ItemId} from "common/features/items/ItemId";

export interface ItemConfig {
    id: ItemId,
    name: string,
    description: string,
    image: string,

    maxStack?: number,
    type?: ItemType,
}
