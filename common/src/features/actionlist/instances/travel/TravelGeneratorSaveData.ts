import {LinearActionGeneratorSaveData} from "common/tools/actions/LinearActionGeneratorSaveData";
import {TravelActionSaveData} from "common/features/worldmap/TravelActionSaveData";

export interface TravelGeneratorSaveData extends LinearActionGeneratorSaveData {
    actions: TravelActionSaveData[];
}
