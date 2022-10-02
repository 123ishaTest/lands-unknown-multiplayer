import type {ActionSaveData} from "common/tools/actions/ActionSaveData";
import type {WorldLocationId} from "common/features/worldmap/WorldLocationId";

export interface TravelActionSaveData extends ActionSaveData {
    road: WorldLocationId
    isReverse: boolean;
}
