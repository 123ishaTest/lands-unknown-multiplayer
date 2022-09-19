import {IgtFeature} from "common/features/IgtFeature";
import {CurrencyType} from "common/features/wallet/CurrencyType";
import {Currency} from "common/features/wallet/Currency";
import {WalletSaveData} from "common/features/wallet/WalletSaveData";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";

export class IgtWallet extends IgtFeature {
    protected currencies: Record<CurrencyType, number> = {} as Record<CurrencyType, number>
    protected _multipliers: Record<CurrencyType, number> = {} as Record<CurrencyType, number>

    protected _onCurrencyGain = new SimpleEventDispatcher<Currency>();

    protected readonly _supportedCurrencies: CurrencyType[];

    constructor() {
        super("wallet");

        this._supportedCurrencies = Object.values(CurrencyType);

        // Initialize currencies and multipliers
        for (const type of this._supportedCurrencies) {
            this.currencies[type] = 0;
            this._multipliers[type] = 1;
        }
    }

    public get money(): number {
        return this.getAmount(CurrencyType.money);
    }

    public set money(amount: number) {
        this.currencies[CurrencyType.money] = amount;
    }

    /**
     * Returns how much of this type we have
     */
    public getAmount(type: CurrencyType): number {
        if (!this.supportsCurrencyType(type)) {
            return 0;
        }
        return this.currencies[type];
    }

    /**
     * Gain the specified currency and apply the global multiplier
     */
    public gainCurrency(currency: Currency): void {
        currency.amount *= this.getCurrencyMultiplier(currency.type);

        if (!currency.isValid() || !this.supportsCurrencyType(currency.type)) {
            console.warn(`Could not add currency ${currency.toString()}`);
            return;
        }

        this._onCurrencyGain.dispatch(currency);
        this.currencies[currency.type] += currency.amount;
    }

    /**
     * Return true if all currencies are valid and the player has the specified amount.
     */
    hasCurrencies(costs: Currency[]): boolean {
        for (const cost of costs) {
            if (!this.hasCurrency(cost)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Return true if the currency is valid and the player has the specified amount.
     */
    public hasCurrency(currency: Currency): boolean {
        if (!this.supportsCurrencyType(currency.type)) {
            return false;
        }
        return this.currencies[currency.type] >= currency.amount;
    }

    /**
     * Remove the currency amount from the specified currency.
     * IMPORTANT: This method does not care if amounts go negative
     * @param currency
     */
    public loseCurrency(currency: Currency): void {
        if (!currency.isValid() || !this.supportsCurrencyType(currency.type)) {
            console.warn(`Could not lose currency ${currency.toString()}`);
            return;
        }
        this.currencies[currency.type] -= currency.amount;
    }

    /**
     * Remove the currencies amounts from the specified currency.
     * IMPORTANT: This method does not care if amounts go negative
     */
    public loseMultipleCurrencies(currencies: Currency[]): void {
        for (const currency of currencies) {
            this.loseCurrency(currency);
        }
    }

    /**
     * Subtracts the specified currencies and returns true if the wallet has enough.
     * Otherwise, return false and don't subtract anything
     */
    public payMultipleIfPossible(currencies: Currency[]): boolean {
        if (this.hasCurrencies(currencies)) {
            this.loseMultipleCurrencies(currencies);
            return true;
        }
        return false;
    }

    /**
     * Subtracts the specified currency and returns true if the wallet has enough.
     * Otherwise, return false and don't subtract anything
     * @param currency
     * @constructor
     */
    public payIfPossible(currency: Currency): boolean {
        if (this.hasCurrency(currency)) {
            this.loseCurrency(currency);
            return true;
        }
        return false;
    }

    /**
     * Return 1 if the multiplier is not set
     */
    public getCurrencyMultiplier(type: CurrencyType): number {
        return this._multipliers[type] ?? 1;
    }

    public setCurrencyMultiplier(multiplier: number, type: CurrencyType): void {
        if (multiplier <= 0 || isNaN(multiplier) || !this.supportsCurrencyType(type)) {
            return;
        }
        this._multipliers[type] = multiplier;
    }

    public supportsCurrencyType(type: CurrencyType): boolean {
        return this._supportedCurrencies.includes(type);
    }

    public canAccess(): boolean {
        return true;
    }

    public save(): WalletSaveData {
        return {
            money: this.money
        }
    }

    public load(data: WalletSaveData): void {
        this.money = data.money;
    }

    /**
     * Emitted whenever a currency is gained
     */
    public get onCurrencyGain(): ISimpleEvent<Currency> {
        return this._onCurrencyGain.asEvent();
    }
}
