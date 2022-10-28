import {ItemId} from "common/features/items/ItemId";
import {Tool} from "common/features/toolbelt/Tool";
import {ToolType} from "common/features/toolbelt/ToolType";

export class BronzePickaxe extends Tool {

    constructor() {
        super({
                name: "Bronze Pickaxe",
                description: "Used to mine rocks",
                id: ItemId.BronzePickaxe,
                image: 'pickaxe-bronze'
            },
            ToolType.Pickaxe,
        );
    }
}
