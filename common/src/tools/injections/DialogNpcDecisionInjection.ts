import {AbstractInjection} from "common/tools/injections/AbstractInjection";
import {NpcId} from "common/features/npcs/NpcId";
import {NpcDecision} from "common/tools/dialog/decisions/NpcDecision";
import {IgtFeatures} from "common/features/IgtFeatures";

export class DialogNpcDecisionInjection<T> extends AbstractInjection {
    npcId: NpcId;
    npcDecision: NpcDecision<T>

    constructor(npcId: NpcId, npcDecision: NpcDecision<T>) {
        super();
        this.npcId = npcId;
        this.npcDecision = npcDecision;
    }

    inject(features: IgtFeatures) {
        const npc = features.npcList.getNpc(this.npcId);
        npc.dialog.npcDecisions.push(this.npcDecision);
    }

    eject(features: IgtFeatures): void {
        const npc = features.npcList.getNpc(this.npcId);

        npc.dialog.npcDecisions = npc.dialog.npcDecisions.filter(decision => {
            return decision.id !== this.npcDecision.id;
        })
    }
}
