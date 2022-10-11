import {IgtFeature} from "common/features/IgtFeature";
import type {IgtFeatures} from "common/features/IgtFeatures";
import {ItemId} from "common/features/items/ItemId";
import type {AbstractItem} from "common/features/items/AbstractItem";
import type {SaveData} from "common/tools/saving/SaveData";
import {EmptyItem} from "common/features/items/EmptyItem";
import {CookedShrimp} from "common/features/items/instances/fish/CookedShrimp";
import {RawShrimp} from "common/features/items/instances/fish/RawShrimp";

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
            }
        }
    }

    public getItem(id: ItemId): AbstractItem {
        if (id == undefined) {
            console.trace("Cannot get item of undefined ID")
        }
        const itemFunction = this.items[id];
        const item = itemFunction();

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
