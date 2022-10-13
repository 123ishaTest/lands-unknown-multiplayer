import {WorldLocation} from "common/features/worldmap/WorldLocation";
import {RoiLocationIdentifier} from "common/features/worldmap/roi/RoiLocationIdentifier";
import type {WorldPosition} from "common/tiled/types/WorldPosition";
import type {ActionId} from "common/features/actionlist/ActionId";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";
import {FacilityType} from "common/features/facilities/FacilityType";

export class RegionOfInterest extends WorldLocation {

    constructor(id: WorldLocationId, displayName: string, worldPosition: WorldPosition, possibleActions: ActionId[] = [], facilities: FacilityType[] = []) {
        super(new RoiLocationIdentifier(id), displayName, worldPosition, possibleActions, facilities);
    }
}
