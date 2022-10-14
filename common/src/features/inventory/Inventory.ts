import {IgtFeature} from "common/features/IgtFeature";
import {InventorySlot} from "common/features/inventory/InventorySlot";
import type {ItemList} from "common/features/items/ItemList";
import {EventDispatcher} from "strongly-typed-events";
import type {AbstractItem} from "common/features/items/AbstractItem";
import {EmptyItem} from "common/features/items/EmptyItem";
import type {IgtFeatures} from "common/features/IgtFeatures";
import {Consumable} from "common/features/items/instances/Consumable";
import {ItemId} from "common/features/items/ItemId";
import type {ItemAmount} from "common/features/items/ItemAmount";
import type {InventorySaveData} from "common/features/inventory/InventorySaveData";
import type {InventorySlotSaveData} from "common/features/inventory/InventorySlotSaveData";

export class Inventory extends IgtFeature {
    slotCount: number;
    slots: InventorySlot[];

    // Overridden in initialize;
    _itemList!: ItemList;

    private _onItemGain = new EventDispatcher<AbstractItem, number>();


    constructor(slots: number = 5) {
        super('inventory');
        this.slotCount = slots;

        this.slots = [];
        for (let i = 0; i < slots; i++) {
            this.slots.push(new InventorySlot(new EmptyItem(), 0));
        }
    }


    initialize(features: IgtFeatures) {
        super.initialize(features);
        this._itemList = features.itemList;
    }

    interactIndices(indexFrom: number, indexTo: number) {
        if (indexFrom === indexTo) {
            return;
        }

        const itemFrom = this.slots[indexFrom];

        if (itemFrom.isEmpty()) {
            console.warn("Cannot interact with empty item");
            return;
        }
        const itemTo = this.slots[indexTo];

        if (itemFrom.item.id === itemTo.item.id) {
            this.mergeItems(itemFrom, itemTo);
            return;
        }

        this.swapItems(indexFrom, indexTo);
        return;
    }

    mergeItems(itemFrom: InventorySlot, itemTo: InventorySlot) {
        if (itemFrom.item.id !== itemTo.item.id) {
            throw new Error(`Cannot merge items of types ${itemFrom.item.id} and ${itemTo.item.id}`);
        }

        const amount = Math.min(itemFrom.amount, itemTo.spaceLeft());
        itemFrom.loseItems(amount);
        itemTo.gainItems(amount);
    }

    swapItems(indexFrom: number, indexTo: number) {
        const temp = this.slots[indexFrom];
        this.slots.splice(indexFrom, 1, this.slots[indexTo]);
        this.slots.splice(indexTo, 1, temp);
    }

    consumeItem(index: number, amount: number = 1): boolean {
        const inventoryItem = this.slots[index];
        const item = inventoryItem.item;

        if (!(item instanceof Consumable)) {
            console.warn(`Item ${item} is not a consumable`);
            return false;
        }
        if (inventoryItem.amount < amount) {
            console.warn(`Amount of ${inventoryItem} is not greater than ${amount}`);
            return false;
        }
        if (!item.canConsume()) {
            console.warn("Cannot consume item, check its restrictions for the reason");
            return false;
        }

        if (amount === 1) {
            item.consume();
        } else {
            item.consumeMultiple(amount);
        }
        this.loseItemAtIndex(index, amount);
        return true;
    }

    /**
     * Remove items from this inventory, prefer an empty stack
     * Recursively calls itself if stacks are emptying
     * Returns the number of items that still need to be removed
     * @param id
     * @param amount
     */
    loseItemAmount(id: ItemId, amount: number = 1): number {
        // While we still need to remove and have items left
        while (amount > 0 && this.getTotalAmount(id) > 0) {
            const nonFullStackIndex = this.getIndexOfNonFullStack(id)
            const indexToUse = nonFullStackIndex !== -1 ? nonFullStackIndex : this.getIndexOfItem(id);
            if (indexToUse === -1) {
                throw Error(`Index of item ${id} to lose is -1. This suggests an error in inventory management`);
            }
            const amountToRemove = Math.min(amount, this.slots[indexToUse].amount);
            amount -= amountToRemove;
            this.loseItemAtIndex(indexToUse, amountToRemove);
        }

        return amount;
    }

    public gainItemById(id: ItemId, amount: number = 1): void {
        const item = this._itemList.getItem(id);
        this.gainItem(item, amount);
    }

    public gainItemByAmount(itemAmount: ItemAmount) {
        this.gainItemById(itemAmount.id, itemAmount.amount);
    }

    /**
     * Add items to this inventory, prefer an existing stack
     */
    public gainItem(item: AbstractItem, amount: number = 1): void {
        // First find non-full stacks, add to those
        const nonFullStacks = this.getIndicesOfNonFullStacks(item.id);
        for (const index of nonFullStacks) {
            const amountToAdd = Math.min(amount, this.slots[index].spaceLeft())
            this.slots[index].gainItems(amountToAdd)
            amount -= amountToAdd;
            if (amount === 0) {
                return;
            }
        }
        // Then create empty stacks for the rest
        const emptySlots = this.getIndicesOfEmptySlots();
        for (const index of emptySlots) {
            const amountToAdd = Math.min(amount, item.maxStack)
            amount -= amountToAdd;
            this.slots.splice(index, 1, new InventorySlot(item, amountToAdd));

            if (amount === 0) {
                return;
            }
        }
        // TODO
        // this._onItemGain.dispatch(item, amount);
        console.warn("Still items left", amount);
    }

    /**
     * The amount of items that can be placed in non-full stacks
     */
    getStackSpaceForItem(id: ItemId): number {
        let total = 0;
        for (const inventoryItem of this.slots) {
            if (inventoryItem.item.id === id) {
                total += inventoryItem.spaceLeft();
            }
        }
        return total;
    }

    /**
     * Calculate how many stacks are needed to place each of the items, subtract amounts that can be placed on non-full stacks
     * True if the amount of stacks needed is leq than how many we have available.
     */
    canTakeItemAmounts(itemAmounts: ItemAmount[]) {
        let totalStacksNeeded = 0;
        for (const item of itemAmounts) {
            if (this._itemList.getItem(item.id).maxStack === Infinity) {
                const placedInNonFullStacks = this.getStackSpaceForItem(item.id);
                totalStacksNeeded += (placedInNonFullStacks === 0) ? 1 : 0;
                continue;
            }
            let amount = item.amount;
            const placedInNonFullStacks = this.getStackSpaceForItem(item.id);
            amount -= placedInNonFullStacks
            totalStacksNeeded += Math.ceil(amount / this._itemList.getItem(item.id).maxStack);
        }
        return totalStacksNeeded <= this.getEmptySlotCount();
    }

    spaceLeftForItem(itemId: ItemId): number {
        const placedInNonFullStacks = this.getStackSpaceForItem(itemId);
        return placedInNonFullStacks + this.getEmptySlotCount() * this._itemList.getItem(itemId).maxStack;
    }

    hasItemAmounts(amounts: ItemAmount[]) {
        for (const amount of amounts) {
            if (!this.hasItemAmount(amount)) {
                return false;
            }
        }
        return true;
    }

    hasItemAmount(amount: ItemAmount) {
        return this.getTotalAmount(amount.id) >= amount.amount;
    }

    getIndicesOfNonFullStacks(id: ItemId): number[] {
        const indices = [];
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i].item.id === id && !this.slots[i].isFull()) {
                indices.push(i)
            }
        }
        return indices;
    }

    getIndexOfNonFullStack(id: ItemId) {
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i].item.id === id && !this.slots[i].isFull()) {
                return i;
            }
        }
        return -1;
    }

    getIndexOfItem(id: ItemId) {
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i].item.id === id) {
                return i;
            }
        }
        return -1;
    }

    getIndicesOfEmptySlots(): number[] {
        const indices = [];
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i].isEmpty()) {
                indices.push(i);
            }
        }
        return indices;
    }

    getIndexOfFirstEmptySlot(): number {
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i].isEmpty()) {
                return i;
            }
        }
        return -1;
    }

    hasEmptySlot(): boolean {
        return this.getIndexOfFirstEmptySlot() !== -1;
    }

    hasNonFullStack(id: ItemId): boolean {
        return this.getIndexOfNonFullStack(id) !== -1;
    }

    loseItemAtIndex(index: number, amount: number = 1) {
        this.slots[index].loseItems(amount);
        if (this.slots[index].amount <= 0) {
            this.slots.splice(index, 1, new InventorySlot(new EmptyItem(), 0));
        }
    }

    dropStack(index: number) {
        this.loseItemAtIndex(index, this.slots[index].amount);
    }

    getEmptySlotCount(): number {
        return this.getIndicesOfEmptySlots().length;
    }

    getTotalAmount(id: ItemId): number {
        let total = 0;
        for (const inventoryItem of this.slots) {
            if (inventoryItem.item.id === id) {
                total += inventoryItem.amount;
            }
        }
        return total;
    }

    getAmount(index: number): number {
        return this.slots[index].amount;
    }

    isEmpty(): boolean {
        for (const item of this.slots) {
            if (item.amount != 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * Emitted whenever this inventory gains items (even if it can't take them).
     */
    public get onItemGain() {
        return this._onItemGain.asEvent();
    }

    load(data: InventorySaveData): void {
        if (!data.slots) {
            return;
        }
        for (let i = 0; i < data.slots.length; i++) {
            const slotData: InventorySlotSaveData = data.slots[i];
            if (slotData.id === ItemId.Empty) {
                this.slots[i] = new InventorySlot(new EmptyItem(), 0);
                continue;
            }

            try {
                const item = this._itemList.getItem(slotData.id);
                item.load(slotData.data);
                this.slots[i] = new InventorySlot(item, slotData.amount);
            } catch (e) {
                console.error(`Could not load Item ${slotData.id}. Make sure it has an implementation in the ItemList`);
            }

        }
    }

    save(): InventorySaveData {
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
