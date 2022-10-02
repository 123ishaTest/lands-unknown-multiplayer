import {WorldLocation} from "common/features/worldmap/WorldLocation";
import type {RoiLocationIdentifier} from "common/features/worldmap/roi/RoiLocationIdentifier";
import type {WorldPosition} from "common/tiled/types/WorldPosition";

/**
 * A region that is not so interesting
 */
export class EmptyRoi extends WorldLocation {

    constructor(identifier: RoiLocationIdentifier, displayName: string, worldPosition: WorldPosition) {
        super(identifier, displayName, worldPosition, [], []);
    }
}
