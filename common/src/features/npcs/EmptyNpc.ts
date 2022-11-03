import {Npc} from "common/features/npcs/AbstractNpc";
import {DialogTree} from "common/tools/dialog/DialogTree";
import {NpcId} from "common/features/npcs/NpcId";

export class EmptyNpc extends Npc {
    dialog: DialogTree<any> = new DialogTree<any>(null, [], [], []);

    constructor(id: NpcId, name: string, image: string = "") {
        super(id, name, image);
    }
}
