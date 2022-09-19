import type {SyncType} from "common/connection/SyncType";

export interface SyncEvent {
    type: SyncType
    data: any
}
