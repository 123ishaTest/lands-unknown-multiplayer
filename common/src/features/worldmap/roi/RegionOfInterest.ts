import {WorldLocation} from "common/features/worldmap/WorldLocation";
import {RoiLocationIdentifier} from "common/features/worldmap/roi/RoiLocationIdentifier";
import type {WorldPosition} from "common/tiled/types/WorldPosition";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";
import {FacilityType} from "common/features/facilities/FacilityType";
import {GeneratorId} from "common/features/actionlist/GeneratorId";

export class RegionOfInterest extends WorldLocation {
    constructor(id: WorldLocationId, displayName: string, worldPosition: WorldPosition, generators: GeneratorId[] = [], facilities: FacilityType[] = []) {
        super(new RoiLocationIdentifier(id), displayName, worldPosition, generators, facilities);
    }
}
