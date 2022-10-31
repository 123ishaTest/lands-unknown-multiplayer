import {ItemId} from "common/features/items/ItemId";
import {Tool} from "common/features/toolbelt/Tool";
import {ToolType} from "common/features/toolbelt/ToolType";

export class FishingNet extends Tool {

    constructor() {
        super({
                name: "Fishing Net",
                description: "Used catch small fish",
                id: ItemId.FishingNet,
                image: 'fishing-net'
            },
            ToolType.FishingNet,
        );
    }
}
