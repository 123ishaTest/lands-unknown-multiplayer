import {ItemId} from "common/features/items/ItemId";
import {Consumable} from "common/features/items/instances/Consumable";


export class CookedShrimp extends Consumable {
    constructor() {
        super({
            id: ItemId.CookedShrimp,
            name: 'Cooked Shrimp',
            description: 'Delicious'
        });
    }

    consumeLabel: string = "Eat";

    canConsume(): boolean {
        return true;
    }

    consume(): void {
        // TODO add food eating benefits here
        // Empty
    }
}
