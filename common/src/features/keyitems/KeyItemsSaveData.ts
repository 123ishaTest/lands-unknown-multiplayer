import {KeyItemId} from "common/features/keyitems/KeyItemId";
import {SaveData} from "common/tools/saving/SaveData";

export interface KeyItemSaveData extends SaveData {
    list: KeyItemId[];
}
