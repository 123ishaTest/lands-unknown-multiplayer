import {KeyItemId} from "common/features/keyitems/KeyItemId";
import {KeyItem} from "common/features/keyitems/KeyItem";
import {IgtFeature} from "common/features/IgtFeature";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {KeyItemSaveData} from "common/features/keyitems/KeyItemsSaveData";

export class KeyItems extends IgtFeature {
    items: Record<KeyItemId, KeyItem>

    private _onKeyItemGain = new SimpleEventDispatcher<KeyItem>();

    constructor() {
        super('key-items');
        this.items = {} as Record<KeyItemId, KeyItem>;
    }


    initialize() {
        this.items = {
            [KeyItemId.LeatherBag]: new KeyItem(KeyItemId.LeatherBag, "leather-bag", "Leather Bag", "Allows you to carry stuff around", "Gained during the tutorial")
        };
    }


    hasKeyItem(id: KeyItemId): boolean {
        return this.getKeyItem(id)?.isUnlocked;
    }

    getKeyItem(id: KeyItemId): KeyItem {
        return this.items[id];
    }

    gainKeyItem(id: KeyItemId) {
        const item = this.getKeyItem(id);
        if (!item) {
            console.warn(`Key Item with id ${id} could not be found`);
            return;
        }
        const didUnlock = item.unlock();
        if (didUnlock) {
            this._onKeyItemGain.dispatch(item);
        }
    }

    /**
     * Emitted whenever a currency is gained
     * @private
     */
    public get onKeyItemGain(): ISimpleEvent<KeyItem> {
        return this._onKeyItemGain.asEvent();
    }

    load(data: KeyItemSaveData): void {
        data.list?.forEach(id => {
            const item = this.getKeyItem(id);
            if (item) {
                item.isUnlocked = true;
            }
        })
    }

    save(): KeyItemSaveData {
        const list = [];
        for (const key in this.items) {
            if (this.items[key as KeyItemId].isUnlocked) {
                list.push(key as KeyItemId)
            }
        }
        return {
            list: list,
        };
    }
}
