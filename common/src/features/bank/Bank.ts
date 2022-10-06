import {IgtFeature} from "common/features/IgtFeature";
import {ItemList} from "common/features/items/ItemList";
import {IgtFeatures} from "common/features/IgtFeatures";
import {Inventory} from "common/features/inventory/Inventory";
import {ItemAmount} from "common/features/items/ItemAmount";
import {InventorySlotSaveData} from "common/features/inventory/InventorySlotSaveData";
import {BankSaveData} from "common/features/bank/BankSaveData";
import {ItemId} from "common/features/items/ItemId";
import {BankSlot} from "common/features/bank/BankSlot";

/**
 * The bank is a feature where players can permanently store items.
 * Withdrawing and Depositing in the bank can be scheduled from any location containing a bank facility
 */
export class Bank extends IgtFeature {
    slots: BankSlot[];
    maxSlots: number;

    // Overridden in initialize;
    _itemList!: ItemList;
    _inventory!: Inventory;

    constructor(maxSlots: number = 20) {
        super('bank');
        this.maxSlots = maxSlots;
        this.slots = [];
    }

    initialize(features: IgtFeatures) {
        super.initialize(features);
        this._itemList = features.itemList;
        this._inventory = features.inventory;
    }

    swapItems(indexFrom: number, indexTo: number) {
        const temp = this.slots[indexFrom];
        this.slots.splice(indexFrom, 1, this.slots[indexTo]);
        this.slots.splice(indexTo, 1, temp);
    }

    /**
     * Withdraw a number of items and place them in the inventory
     */
    withdrawItem(index: number, amount: number): void {
        const slots = this.slots[index];
        const actualAmount = Math.min(slots.amount, amount);

        const toGain = new ItemAmount(slots.item.id, actualAmount);
        if (this._inventory.canTakeItemAmounts([toGain])) {
            this._inventory.gainItemByAmount(toGain);
            this.loseItemAtIndex(index, actualAmount);
        }
    }

    getIndexOfId(itemId: ItemId) {
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i].item.id === itemId) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Deposit an amount of items by id
     */
    depositByItemId(itemId: ItemId, amount: number): void {
        const actualAmount = Math.min(this._inventory.getTotalAmount(itemId), amount);
        const toLose = new ItemAmount(itemId, actualAmount);

        // TODO check if we have the space
        if (this._inventory.hasItemAmounts([toLose])) {
            this._inventory.loseItemAmount(itemId, actualAmount);
            this.gainItemsById(itemId, actualAmount);
        }
    }

    /**
     * Withdraw an amount of items by id
     */
    withdrawItemById(itemId: ItemId, amount: number) {
        // The minimum of what is requested, how much we actually have, and how much the inventory can take
        const actualAmount = Math.min(this.getTotalAmount(itemId), this._inventory.spaceLeftForItem(itemId), amount);
        const toGain = new ItemAmount(itemId, actualAmount);
        if (this._inventory.canTakeItemAmounts([toGain])) {
            this.loseItemAmount(itemId, actualAmount);
            this._inventory.gainItemById(itemId, actualAmount);
        } else {
            console.error("Logic error, there should always be enough space left", amount, actualAmount, this._inventory)
        }
    }


    public loseItemAmount(itemId: ItemId, amount: number) {
        this.getSlotForItemId(itemId).loseItems(amount);
    }


    public getTotalAmount(itemId: ItemId): number {
        return this.getSlotForItemId(itemId).amount;
    }

    /**
     * Create new items in the bank of the given id
     */
    public gainItemsById(itemId: ItemId, amount: number) {
        console.log("gaining", itemId, amount)
        const slot = this.getSlotForItemId(itemId);
        const item = this._itemList.getItem(itemId);
        if (!slot) {
            this.slots.push(new BankSlot(item, amount))
        } else {
            slot.gainItems(amount);
        }
    }

    public getSlotForItemId(itemId: ItemId): BankSlot | null {
        for (const slot of this.slots) {
            if (slot.item.id === itemId) {
                return slot;
            }
        }
        return null;
    }

    /**
     * Remove items at an index
     */
    loseItemAtIndex(index: number, amount: number = 1) {
        this.slots[index].loseItems(amount);
        if (this.slots[index].amount <= 0) {
            this.slots.splice(index, 1);
        }
    }

    load(data: BankSaveData): void {
        if (!data.slots) {
            return;
        }
        this.slots = data.slots.map((slotData: InventorySlotSaveData) => {
            const item = this._itemList.getItem(slotData.id);
            item.load(slotData.data);
            return new BankSlot(item, slotData.amount);
        });
    }

    save(): BankSaveData {
        const slots = this.slots.map(slot => {
            return {
                id: slot.item.id,
                amount: slot.amount,
                data: slot.item.save()
            };
        });
        return {
            slots: slots
        }
    }
}
