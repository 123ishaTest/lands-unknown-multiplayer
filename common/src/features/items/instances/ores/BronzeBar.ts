import {AbstractItem} from "common/features/items/AbstractItem";
import {ItemId} from "common/features/items/ItemId";

export class BronzeBar extends AbstractItem {

    constructor() {
        super({
            id: ItemId.BronzeBar,
            name: 'Bronze Bar',
            description: 'Can be crafted into Bronze equipment',
            image: "bar-bronze",
            maxStack: 50,
        });
    }
}
