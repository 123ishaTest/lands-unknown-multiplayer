import type {SyncEvent} from "common/connection/SyncEvent";

export interface SessionTokenSync extends SyncEvent {
    data: string;
}
