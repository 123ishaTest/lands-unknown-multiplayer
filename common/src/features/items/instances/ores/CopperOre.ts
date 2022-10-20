import {AbstractItem} from "common/features/items/AbstractItem";
import {ItemId} from "common/features/items/ItemId";

export class CopperOre extends AbstractItem {

    constructor() {
        super({
            id: ItemId.CopperOre,
            name: 'Copper Ore',
            description: 'Can be combined with Tin Ore',
            image: "ore-copper",
            maxStack: 5,
        });
    }
}
