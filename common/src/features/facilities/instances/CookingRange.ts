import {Facility} from "common/features/facilities/Facility";
import {ActionId} from "common/features/actionlist/ActionId";
import {FacilityType} from "common/features/facilities/FacilityType";

export class CookingRange extends Facility {
    type = FacilityType.CookingRange;
    description: string = "Range";
    actions: ActionId[] = [
        ActionId.CookShrimpAction,
    ];
}
