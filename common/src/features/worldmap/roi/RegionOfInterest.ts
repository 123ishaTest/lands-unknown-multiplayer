import {WorldLocation} from "common/features/worldmap/WorldLocation";
import type {RoiLocationIdentifier} from "common/features/worldmap/roi/RoiLocationIdentifier";
import type {WorldPosition} from "common/tiled/types/WorldPosition";
import type {ActionId} from "common/features/actionlist/ActionId";

export abstract class RegionOfInterest extends WorldLocation {

    protected constructor(identifier: RoiLocationIdentifier, displayName: string, worldPosition: WorldPosition, possibleActions: ActionId[] = []) {
        // TODO pass facilities
        super(identifier, displayName, worldPosition, possibleActions, []);
    }
}
