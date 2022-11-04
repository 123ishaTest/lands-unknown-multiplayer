import {SaveData} from "common/tools/saving/SaveData";
import {QuestSaveData} from "common/features/quests/QuestSaveData";

export interface QuestsSaveData extends SaveData {
    list: QuestSaveData[];
}
