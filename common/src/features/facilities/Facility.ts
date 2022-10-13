import {FacilityType} from "common/features/facilities/FacilityType";
import {ActionId} from "common/features/actionlist/ActionId";
import {IgtFeatures} from "common/features/IgtFeatures";
import {NoRequirement} from "common/tools/requirements/NoRequirement";


/**
 * Facilities are places that offer a predetermined set of actions.
 */
export abstract class Facility {
    abstract type: FacilityType;
    abstract description: string;
    abstract actions: ActionId[];

    requirement = new NoRequirement();

    public canUse() {
        return this.requirement.isCompleted;
    }

    /**
     * When this Facility is shown in the UI
     */
    public isVisible() {
        return this.canUse();
    }

    public initialize(features: IgtFeatures) {
        // Empty
    }
}
