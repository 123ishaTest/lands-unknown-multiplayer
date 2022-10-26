import {NpcId} from "common/features/npcs/NpcId";
import {IgtFeatures} from "common/features/IgtFeatures";
import {DialogTree} from "common/tools/dialog/DialogTree";

export abstract class Npc {
    name: string;
    id: NpcId;

    // Override in initialize
    abstract dialog: DialogTree<any>;

    protected constructor(id: NpcId, name: string) {
        this.id = id;
        this.name = name;
    }

    initialize(features: IgtFeatures) {
        // Empty
    }
}