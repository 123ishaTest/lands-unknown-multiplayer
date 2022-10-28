import type {SaveData} from "common/tools/saving/SaveData";

export interface Saveable {
    saveKey: string;

    save(): SaveData;

    load(data: SaveData): void;
}

export function isSaveable(object: any): object is Saveable {
    return 'saveKey' in object;
}
