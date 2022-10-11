import type {LinearActionGeneratorSaveData} from "common/tools/actions/LinearActionGeneratorSaveData";
import type {TravelActionSaveData} from "common/features/worldmap/TravelActionSaveData";

export interface TravelGeneratorSaveData extends LinearActionGeneratorSaveData {
    actions: TravelActionSaveData[];
}
