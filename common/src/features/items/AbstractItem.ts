import type {Saveable} from "common/tools/saving/Saveable";
import type {ItemId} from "common/features/items/ItemId";
import {ItemType} from "common/features/items/ItemType";
import type {SaveData} from "common/tools/saving/SaveData";
import type {ItemConfig} from "common/features/items/ItemConfig";

export abstract class AbstractItem implements Saveable {
    id: ItemId;
    name: string;
    description: string;
    image: string;
    type: ItemType;
    maxStack: number

    protected constructor(config: ItemConfig) {
        this.id = config.id;
        this.name = config.name;
        this.description = config.description;
        this.image = config.image;

        this.type = config.type ?? ItemType.Default;
        this.maxStack = config.maxStack ?? Infinity;

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
