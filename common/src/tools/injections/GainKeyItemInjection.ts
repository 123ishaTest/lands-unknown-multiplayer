import {AbstractInjection} from "common/tools/injections/AbstractInjection";
import {KeyItemId} from "common/features/keyitems/KeyItemId";
import {IgtFeatures} from "common/features/IgtFeatures";

/**
 * Permanently gains a key item
 */
export class GainKeyItemInjection extends AbstractInjection {
    id: KeyItemId;

    constructor(id: KeyItemId) {
        super();
        this.id = id;
    }

    inject(features: IgtFeatures): void {
        features.keyItems.gainKeyItem(this.id);
    }

    eject(features: IgtFeatures): void {
        // Empty
    }

}
