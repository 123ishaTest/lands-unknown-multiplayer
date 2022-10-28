import {AbstractItem} from "common/features/items/AbstractItem";
import {ItemConfig} from "common/features/items/ItemConfig";
import {ItemType} from "common/features/items/ItemType";
import {ToolType} from "common/features/toolbelt/ToolType";

export class Tool extends AbstractItem {
    toolType: ToolType;

    constructor(config: ItemConfig, toolType: ToolType) {
        config.maxStack = 1;
        config.type = ItemType.Tool;
        super(config);
        this.toolType = toolType;
    }
}
