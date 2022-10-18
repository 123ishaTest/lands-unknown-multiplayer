import {AbstractItem} from "common/features/items/AbstractItem";
import {ItemId} from "common/features/items/ItemId";
import {ItemType} from "common/features/items/ItemType";

export class EmptyItem extends AbstractItem {

    constructor() {
        super({
            id: ItemId.Empty,
            name: "Empty",
            description: "",
            image: "",
            type: ItemType.Empty,
            maxStack: 0,
        });
    }
}
