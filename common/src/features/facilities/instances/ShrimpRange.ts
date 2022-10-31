import {Facility} from "common/features/facilities/Facility";
import {ActionId} from "common/features/actionlist/ActionId";
import {FacilityType} from "common/features/facilities/FacilityType";

/**
 * A range where we can only cook shrimp
 */
export class ShrimpRange extends Facility {
    type = FacilityType.ShrimpRange;
    description: string = "Range";
    icon: string = 'skills/cooking'
    actions: ActionId[] = [
        ActionId.CookShrimpAction,
    ];
}
