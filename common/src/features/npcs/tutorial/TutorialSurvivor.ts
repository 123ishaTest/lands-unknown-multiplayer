import {Npc} from "common/features/npcs/AbstractNpc";
import {DialogTree} from "common/tools/dialog/DialogTree";
import {NpcId} from "common/features/npcs/NpcId";
import {DialogSequence} from "common/tools/dialog/DialogSequence";
import {DialogText} from "common/tools/dialog/DialogText";

export enum TutorialSurvivorDialog {
    Intro,
}

export class TutorialSurvivor extends Npc {
    dialog: DialogTree<TutorialSurvivorDialog>;

    constructor() {
        super(NpcId.TutorialSurvivor, "Survivor");
        this.dialog = new DialogTree<TutorialSurvivorDialog>(
            TutorialSurvivorDialog.Intro,
            [
                new DialogSequence(TutorialSurvivorDialog.Intro, [
                    new DialogText(NpcId.Player, "Nice weather"),
                    new DialogText(NpcId.TutorialSurvivor, "Indeed it is"),
                ])
            ]
        );
    }
}
