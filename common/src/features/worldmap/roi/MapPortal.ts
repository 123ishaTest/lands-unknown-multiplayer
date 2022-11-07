import type {WorldPosition} from "common/tiled/types/WorldPosition";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";
import {RegionOfInterest} from "common/features/worldmap/roi/RegionOfInterest";

export class MapPortal extends RegionOfInterest {

    constructor(id: WorldLocationId, displayName: string, worldPosition: WorldPosition) {
        super(id, displayName, worldPosition, [], [], []);
    }
}
