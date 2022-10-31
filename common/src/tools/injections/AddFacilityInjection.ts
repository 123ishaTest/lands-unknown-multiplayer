import {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import {AbstractInjection} from "common/tools/injections/AbstractInjection";
import {IgtFeatures} from "common/features/IgtFeatures";
import {FacilityType} from "common/features/facilities/FacilityType";

/**
 * Adds a facility to a location
 */
export class AddFacilityInjection extends AbstractInjection {
    location: WorldLocationIdentifier
    facilityType: FacilityType;

    constructor(location: WorldLocationIdentifier, facilityType: FacilityType) {
        super();
        this.location = location;
        this.facilityType = facilityType;
    }

    inject(features: IgtFeatures): void {
        const location = features.worldMap.getLocation(this.location);
        if (!location) {
            console.warn(`Could not inject facility into location with id ${this.location}`);
            return;
        }
        location._facilities.push(this.facilityType);
    }

    eject(features: IgtFeatures): void {
        const location = features.worldMap.getLocation(this.location);
        location._facilities = location._facilities.filter(type => {
            return type !== this.facilityType
        });
    }

}
