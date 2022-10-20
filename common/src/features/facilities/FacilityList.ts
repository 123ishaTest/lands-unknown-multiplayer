import {IgtFeature} from "common/features/IgtFeature";
import {IgtFeatures} from "common/features/IgtFeatures";
import {FacilityType} from "common/features/facilities/FacilityType";
import {Facility} from "common/features/facilities/Facility";
import {SaveData} from "common/tools/saving/SaveData";
import {Furnace} from "common/features/facilities/instances/Furnace";
import {CookingRange} from "common/features/facilities/instances/CookingRange";
import {BankFacility} from "common/features/facilities/instances/BankFacility";
import {Anvil} from "common/features/facilities/instances/Anvil";

/**
 * A giant repository of all possible facilities
 */
export class FacilityList extends IgtFeature {
    _features!: IgtFeatures

    constructor() {
        super("facilities");
    }

    facilities!: Record<FacilityType, () => Facility>;


    initialize(features: IgtFeatures) {
        this._features = features;
        this.facilities = {
            [FacilityType.Furnace]: () => new Furnace(),
            [FacilityType.CookingRange]: () => new CookingRange(),
            [FacilityType.Bank]: () => new BankFacility(),
            [FacilityType.Anvil]: () => new Anvil(),
        }
    }

    public getFacility(type: FacilityType): Facility {
        if (type == undefined) {
            console.trace("Cannot get facility of undefined type")
        }
        const facility = this.facilities[type]();

        facility.initialize(this._features);
        return facility;
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }

}
