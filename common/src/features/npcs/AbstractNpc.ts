import {NpcId} from "common/features/npcs/NpcId";
import {DialogTree} from "common/tools/dialog/DialogTree";

export abstract class Npc {
    id: NpcId;
    name: string;
    image: string;

    // Override in initialize
    abstract dialog: DialogTree<any>;

    protected constructor(id: NpcId, name: string, image: string) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
}
