import {AbstractInjection} from "common/tools/injections/AbstractInjection";
import {NpcId} from "common/features/npcs/NpcId";
import {IgtFeatures} from "common/features/IgtFeatures";
import {DialogSequence} from "common/tools/dialog/DialogSequence";

export class DialogSequenceInjection<T> extends AbstractInjection {
    npcId: NpcId;

    dialog: DialogSequence<T>


    constructor(npcId: NpcId, dialog: DialogSequence<T>) {
        super();
        this.npcId = npcId;
        this.dialog = dialog;
    }

    inject(features: IgtFeatures) {
        const npc = features.npcList.getNpc(this.npcId);
        npc.dialog.sequences.push(this.dialog);
    }

    eject(features: IgtFeatures): void {
        const npc = features.npcList.getNpc(this.npcId);

        const index = npc.dialog.sequences.indexOf(this.dialog);
        npc.dialog.sequences.splice(index, 1);
    }
}
