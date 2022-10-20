import {AbstractItem} from "common/features/items/AbstractItem";
import {ItemId} from "common/features/items/ItemId";

export class TinOre extends AbstractItem {

    constructor() {
        super({
            id: ItemId.TinOre,
            name: 'Tin Ore',
            description: 'Can be combined with Copper Ore',
            image: "ore-tin",
            maxStack: 5,
        });
    }
}
