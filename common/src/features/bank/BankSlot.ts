import type {AbstractItem} from "common/features/items/AbstractItem";

export class BankSlot {
    item: AbstractItem;
    amount: number;

    constructor(item: AbstractItem, amount: number) {
        this.item = item;
        this.amount = amount;
    }

    gainItems(amount: number) {
        this.amount += amount;
    }

    loseItems(amount: number) {
        this.amount -= amount;
        if (this.amount < 0) {
            console.error(`Tried to have less than 0 of ${this.item.id} in one stack`);
            this.amount = 0;
        }
    }
}
