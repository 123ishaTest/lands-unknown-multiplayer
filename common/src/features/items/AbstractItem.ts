import {Saveable} from "common/tools/saving/Saveable";
import {ItemId} from "common/features/items/ItemId";
import {ItemType} from "common/features/items/ItemType";
import {SaveData} from "common/tools/saving/SaveData";
import {ItemConfig} from "common/features/items/ItemConfig";

export abstract class AbstractItem implements Saveable {
    id: ItemId;
    name: string;
    description: string;
    type: ItemType;
    maxStack: number

    protected constructor(config: ItemConfig) {
        this.id = config.id;
        this.name = config.name;
        this.description = config.description;
        this.type = config.type;
        this.maxStack = config.maxStack;

        this.saveKey = this.id;
    }

    // Save and load. Only needed if this item stores additional data
    saveKey: string;

    load(data: object): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }
}
