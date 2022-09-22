import {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";
import {WorldLocationType} from "common/features/worldmap/WorldLocationType";

export class RoiLocationIdentifier extends WorldLocationIdentifier {

    public constructor(id: WorldLocationId) {
        super(WorldLocationType.RegionOfInterest, id)
    }
}
