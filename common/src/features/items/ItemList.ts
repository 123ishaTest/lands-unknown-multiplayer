import {IgtFeature} from "common/features/IgtFeature";
import type {IgtFeatures} from "common/features/IgtFeatures";
import {ItemId} from "common/features/items/ItemId";
import type {AbstractItem} from "common/features/items/AbstractItem";
import type {SaveData} from "common/tools/saving/SaveData";
import {EmptyItem} from "common/features/items/EmptyItem";
import {CookedShrimp} from "common/features/items/instances/fish/CookedShrimp";
import {RawShrimp} from "common/features/items/instances/fish/RawShrimp";
import {BronzeHelmet} from "common/features/items/instances/equipment/bronze/BronzeHelmet";
import {BronzePlateBody} from "common/features/items/instances/equipment/bronze/BronzePlateBody";
import {BronzePlateLegs} from "common/features/items/instances/equipment/bronze/BronzePlateLegs";
import {BronzeBoots} from "common/features/items/instances/equipment/bronze/BronzeBoots";
import {TinOre} from "common/features/items/instances/ores/TinOre";
import {CopperOre} from "common/features/items/instances/ores/CopperOre";
import {BronzeBar} from "common/features/items/instances/ores/BronzeBar";
import {ItemSaveData} from "common/features/items/ItemSaveData";

/**
 * A giant repository of all possible items
 */
export class ItemList extends IgtFeature {
    _features!: IgtFeatures

    constructor() {
        super("item-list");
    }

    items!: Record<ItemId, () => AbstractItem>;


    initialize(features: IgtFeatures) {
        this._features = features;
        this.items = {
            [ItemId.Empty]: () => {
                return new EmptyItem();
            },
            [ItemId.RawShrimp]: () => {
                return new RawShrimp();
            },
            [ItemId.CookedShrimp]: () => {
                return new CookedShrimp();
            },
            [ItemId.BronzeHelmet]: () => new BronzeHelmet(),
            [ItemId.BronzePlateBody]: () => new BronzePlateBody(),
            [ItemId.BronzePlateLegs]: () => new BronzePlateLegs(),
            [ItemId.BronzeBoots]: () => new BronzeBoots(),
            // [ItemId.BronzeShield]: () => new BronzeShield(),
            // [ItemId.BronzeSword]: () => new BronzeSword(),

            // Ores and Bars
            [ItemId.CopperOre]: () => new CopperOre(),
            [ItemId.TinOre]: () => new TinOre(),
            [ItemId.BronzeBar]: () => new BronzeBar(),
        }
    }

    public getItem(id: ItemId, saveData: ItemSaveData | null = null): AbstractItem {
        if (id == undefined) {
            console.trace("Cannot get item of undefined ID")
        }
        const itemFunction = this.items[id];
        const item = itemFunction();

        if (saveData) {
            item.load(saveData);
        }

        // TODO initialize items?
        return item;
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }

}
