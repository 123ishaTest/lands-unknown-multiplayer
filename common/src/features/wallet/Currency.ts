import {CurrencyType} from "./CurrencyType";

/**
 * A data class to store currency amounts
 */
export class Currency {
    amount: number;
    type: CurrencyType;

    constructor(amount: number, type: CurrencyType) {
        this.amount = amount;
        this.type = type;
    }

    /**
     * Whether this currency is valid.
     */
    public isValid(): boolean {
        if (isNaN(this.amount)) {
            return false;
        }
        return this.amount > 0;
    }

    public toString(): string {
        return `${this.type}(${this.amount})`;
    }

}
