import {WorldLocationType} from "common/features/worldmap/WorldLocationType";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";

export interface WorldLocationIdentifierSaveData {
    id: WorldLocationId,
    type: WorldLocationType
}
