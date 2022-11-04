import {AbstractItem} from "common/features/items/AbstractItem";
import {ItemId} from "common/features/items/ItemId";

export class NormalLogs extends AbstractItem {

    constructor() {
        super({
            id: ItemId.NormalLogs,
            name: 'Logs',
            description: 'Logs',
            image: "logs-normal",
            maxStack: 5,
        });
    }
}
