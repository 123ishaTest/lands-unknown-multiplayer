import {IgtFeature} from "common/features/IgtFeature";
import {Inventory} from "common/features/inventory/Inventory";
import {IgtFeatures} from "common/features/IgtFeatures";
import {ItemList} from "common/features/items/ItemList";
import {ItemSaveData} from "common/features/items/ItemSaveData";
import {ToolType} from "common/features/toolbelt/ToolType";
import {Tool} from "common/features/toolbelt/Tool";
import {ToolBeltSaveData} from "common/features/toolbelt/ToolBeltSaveData";

export class ToolBelt extends IgtFeature {
    _inventory!: Inventory;
    _itemList!: ItemList;

    tools: Record<ToolType, Tool | null> = {
        axe: null,
        pickaxe: null,
        fishingNet: null,
    };

    constructor() {
        super("tool-bet");
    }

    initialize(features: IgtFeatures) {
        super.initialize(features);
        this._inventory = features.inventory;
        this._itemList = features.itemList;
    }

    getToolForType(type: ToolType): Tool | null {
        return this.tools[type];
    }

    unEquip(type: ToolType, indexToPlaceInInventory = -1) {
        const tool = this.tools[type];
        if (tool == null || tool.id == null) {
            return;
        }

        if (!this._inventory.canTakeItem(tool)) {
            return;
        }

        this.tools[type] = null;
        this._inventory.gainItem(tool);
    }

    equip(tool: Tool): boolean {
        if (this.tools[tool.toolType] != null) {
            console.error(`Cannot equip ${tool.name} as ${tool.toolType} is not null`);
            return false;
        }
        this.tools[tool.toolType] = tool;
        return true;
    }


    load(data: ToolBeltSaveData): void {
        if (!data?.tools) {
            return;
        }
        for (const type in this.tools) {
            const itemData = data.tools[type];
            if (!itemData) {
                continue;
            }
            this.tools[type] = this._itemList.getItem(itemData.id, itemData.data);
        }

    }

    save(): ToolBeltSaveData {
        const tools: Record<ToolType, ItemSaveData | null> = {} as Record<ToolType, ItemSaveData | null>;

        for (const type in this.tools) {
            const item = this.tools[type as ToolType] as Tool;
            if (item == null) {
                continue;
            }
            tools[type] = item.save();
        }
        return {
            tools: tools,
        }
    }

}
