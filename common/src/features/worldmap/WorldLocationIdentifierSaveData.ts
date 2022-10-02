import type {WorldLocationType} from "common/features/worldmap/WorldLocationType";
import type {WorldLocationId} from "common/features/worldmap/WorldLocationId";

export interface WorldLocationIdentifierSaveData {
    id: WorldLocationId,
    type: WorldLocationType
}
