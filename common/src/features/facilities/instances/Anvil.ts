import {Facility} from "common/features/facilities/Facility";
import {ActionId} from "common/features/actionlist/ActionId";
import {FacilityType} from "common/features/facilities/FacilityType";

export class Anvil extends Facility {
    type = FacilityType.Anvil;
    description: string = "Anvil";
    actions: ActionId[] = [
        ActionId.SmithBronzeHelmetAction,
    ];
}
