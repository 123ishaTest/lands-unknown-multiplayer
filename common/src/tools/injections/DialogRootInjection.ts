import {DialogSequenceInjection} from "common/tools/injections/DialogInjection";
import {NpcId} from "common/features/npcs/NpcId";
import {DialogSequence} from "common/tools/dialog/DialogSequence";
import {IgtFeatures} from "common/features/IgtFeatures";
import {DialogOption} from "common/tools/dialog/DialogOption";

export class DialogRootInjection<T> extends DialogSequenceInjection<T> {
    rootLabel: string

    constructor(npcId: NpcId, rootLabel: string, sequence: DialogSequence<T>) {
        super(npcId, sequence);
        this.rootLabel = rootLabel;
    }

    inject(features: IgtFeatures) {
        const npc = features.npcList.getNpc(this.npcId);

        npc.dialog.root.options.unshift(new DialogOption<T>(this.rootLabel, this.dialog.id));
        super.inject(features);
    }

    eject(features: IgtFeatures): void {
        const npc = features.npcList.getNpc(this.npcId);

        npc.dialog.root.options = npc.dialog.root.options.filter(option => {
            return option.label !== this.rootLabel;
        })

        super.eject(features);
    }
}
