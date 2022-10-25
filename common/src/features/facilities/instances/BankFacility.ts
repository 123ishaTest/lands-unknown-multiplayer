import {Facility} from "common/features/facilities/Facility";
import {ActionId} from "common/features/actionlist/ActionId";
import {FacilityType} from "common/features/facilities/FacilityType";

export class BankFacility extends Facility {
    type = FacilityType.Bank;
    description: string = "Bank";
    icon: string = 'bank'
    actions: ActionId[] = [];
}
