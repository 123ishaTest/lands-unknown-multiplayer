import type {SyncEvent} from "common/connection/SyncEvent";
import {WorldPosition} from "common/tiled/types/WorldPosition";

export interface PlayerPosition {
    displayName: string,
    position: WorldPosition,
}

export interface PlayerPositionsSync extends SyncEvent {
    data: PlayerPosition[];
}
