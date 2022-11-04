import {NpcId} from "common/features/npcs/NpcId";
import {IgtFeatures} from "common/features/IgtFeatures";
import {IgtFeature} from "common/features/IgtFeature";
import {TutorialSurvivor} from "common/features/npcs/tutorial/TutorialSurvivor";
import {Npc} from "common/features/npcs/AbstractNpc";
import {NpcListSaveData} from "common/features/npcs/NpcListSaveData";
import {SaveableNpc} from "common/features/npcs/SaveableNpc";
import {NpcSaveData} from "common/features/npcs/NpcSaveData";
import {EmptyNpc} from "common/features/npcs/EmptyNpc";

export class NpcList extends IgtFeature {
    _features!: IgtFeatures
    npcs!: Record<NpcId, Npc>;

    constructor() {
        super('npcs');
    }

    initialize(features: IgtFeatures) {
        this._features = features;
        this.npcs = {
            [NpcId.UnKnown]: new EmptyNpc(NpcId.Player, "Unknown"),
            [NpcId.Player]: new EmptyNpc(NpcId.Player, "Player", "player"),

            [NpcId.TutorialSurvivor]: new TutorialSurvivor(this._features.keyItems)
        }
    }

    public getNpc(id: NpcId): Npc {
        if (id == undefined) {
            console.trace(`Cannot get NPC with of ID ${id}`)
            return this.npcs[NpcId.UnKnown];
        }
        return this.npcs[id]
    }

    load(data: NpcListSaveData): void {
        for (const id in data.npcs) {
            const npc = this.getNpc(id as NpcId);
            if (npc instanceof SaveableNpc) {
                npc.load(data.npcs[id]);
            }
        }
    }

    save(): NpcListSaveData {
        const npcs = {} as Record<NpcId, NpcSaveData | null>;
        for (const id in this.npcs) {
            const npc = this.npcs[id]
            if (!npc) {
                continue
            }
            if (npc instanceof SaveableNpc) {
                npcs[id] = npc.save();
            }
        }
        return {
            npcs: npcs
        }
    }

}
