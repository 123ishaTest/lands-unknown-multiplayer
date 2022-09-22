import {WorldLocation} from "common/features/worldmap/WorldLocation";
import {RoiLocationIdentifier} from "common/features/worldmap/roi/RoiLocationIdentifier";
import {WorldPosition} from "common/tiled/WorldPosition";
import {ActionId} from "common/features/actionlist/ActionId";

export abstract class RegionOfInterest extends WorldLocation {

    protected constructor(identifier: RoiLocationIdentifier, displayName: string, worldPosition: WorldPosition, possibleActions: ActionId[] = []) {
        // TODO pass facilities
        super(identifier, displayName, worldPosition, possibleActions, []);
    }
}
