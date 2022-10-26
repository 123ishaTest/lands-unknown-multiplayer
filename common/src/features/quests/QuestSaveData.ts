import {SaveData} from "common/tools/saving/SaveData";
import {QuestId} from "common/features/quests/QuestId";

export interface QuestSaveData extends SaveData {
    id: QuestId;
    steps: {
        step: number;
        data: any;
    }[];
    currentIndex: number;
}
