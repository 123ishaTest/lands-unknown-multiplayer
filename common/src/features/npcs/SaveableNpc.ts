import {Npc} from "common/features/npcs/AbstractNpc";
import {Saveable} from "common/tools/saving/Saveable";
import {NpcId} from "common/features/npcs/NpcId";
import {NpcSaveData} from "common/features/npcs/NpcSaveData";

/**
 * In case your Npc needs to save some data
 */
export abstract class SaveableNpc extends Npc implements Saveable {
    saveKey: string;

    protected constructor(id: NpcId, name: string) {
        super(id, name);
        this.saveKey = id;
    }

    abstract save(): NpcSaveData;

    abstract load(data: NpcSaveData): void;
}
