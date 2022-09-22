import {ActionSaveData} from "common/tools/actions/ActionSaveData";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";

export interface TravelActionSaveData extends ActionSaveData {
    road: WorldLocationId
    isReverse: boolean;
}
