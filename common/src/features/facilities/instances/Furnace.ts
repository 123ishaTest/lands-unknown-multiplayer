import {Facility} from "common/features/facilities/Facility";
import {ActionId} from "common/features/actionlist/ActionId";
import {FacilityType} from "common/features/facilities/FacilityType";

export class Furnace extends Facility {
    type = FacilityType.Furnace;
    description: string = "Furnace";
    icon: string = 'furnace'
    actions: ActionId[] = [
        ActionId.SmeltBronzeBarAction,
    ];
}
