import {NpcId} from "common/features/npcs/NpcId";
import {IgtFeatures} from "common/features/IgtFeatures";
import {IgtFeature} from "common/features/IgtFeature";
import {TutorialSurvivor} from "common/features/npcs/tutorial/TutorialSurvivor";
import {Npc} from "common/features/npcs/AbstractNpc";
import {NpcListSaveData} from "common/features/npcs/NpcListSaveData";
import {SaveableNpc} from "common/features/npcs/SaveableNpc";
import {NpcSaveData} from "common/features/npcs/NpcSaveData";

export class NpcList extends IgtFeature {
    _features!: IgtFeatures
    npcs!: Record<NpcId, Npc>;

    constructor() {
        super('npcs');
    }

    initialize(features: IgtFeatures) {
        this._features = features;
        this.npcs = {
            [NpcId.Player]: null,
            [NpcId.TutorialSurvivor]: new TutorialSurvivor()
        }
        for (const id in this.npcs) {
            this.npcs[id]?.initialize(this._features)
        }
    }

    public getNpc(id: NpcId): Npc {
        if (id == undefined || id === NpcId.Player) {
            console.trace(`Cannot get NPC with of ID ${id}`)
            return null;
        }
        return this.npcs[id]
    }

    load(data: NpcListSaveData): void {
        // Empty
        // data.npcs.forEach(npcData => {
        //     const npc = this.getNpc(npcData.id);
        //     if (npc instanceof SaveableNpc) {
        //         npc.load(npcData);
        //     }
        // })
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
