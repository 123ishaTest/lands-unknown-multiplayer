import {AbstractItem} from "common/features/items/AbstractItem";
import {ItemId} from "common/features/items/ItemId";


export class RawShrimp extends AbstractItem {
    constructor() {
        super({
            id: ItemId.RawShrimp,
            name: 'Raw Shrimp',
            description: 'Maybe you can cook it?',
            image: "shrimp-raw",
            maxStack: 10,
        });
    }
}
