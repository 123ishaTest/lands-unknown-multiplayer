import {SaveData} from "common/src/tools/saving/SaveData";

export interface Saveable {
    saveKey: string;

    save(): SaveData;

    load(data: SaveData): void;
}
