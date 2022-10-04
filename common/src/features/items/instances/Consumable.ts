import {AbstractItem} from "common/features/items/AbstractItem";
import {ItemType} from "common/features/items/ItemType";
import {ItemConfig} from "common/features/items/ItemConfig";

export abstract class Consumable extends AbstractItem {

    /**
     * What will be shown on the consume button
     */
    abstract consumeLabel: string;

    protected constructor(config: ItemConfig) {
        config.type = ItemType.Consumable
        super(config);
    }

    /**
     * What to do when this item is consumed.
     */
    abstract consume(): void;

    /**
     * NOTE: your consumables can probably do something more clever here.
     * Make sure to override this method as needed.
     */
    consumeMultiple(amount: number): void {
        for (let i = 0; i < amount; i++) {
            this.consume()
        }
    }

    /**
     * Whether this item can be consumed.
     */
    abstract canConsume(): boolean;
}
