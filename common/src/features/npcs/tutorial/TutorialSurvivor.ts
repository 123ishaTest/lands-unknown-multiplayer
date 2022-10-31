import {DialogTree} from "common/tools/dialog/DialogTree";
import {NpcId} from "common/features/npcs/NpcId";
import {DialogSequence} from "common/tools/dialog/DialogSequence";
import {DialogText} from "common/tools/dialog/DialogText";
import {KeyItems} from "common/features/keyitems/keyItems";
import {Npc} from "common/features/npcs/AbstractNpc";

export enum TutorialSurvivorDialog {
    Worries,
}

export class TutorialSurvivor extends Npc {
    _keyItems: KeyItems
    dialog: DialogTree<TutorialSurvivorDialog>;

    constructor(keyItems: KeyItems) {
        super(NpcId.TutorialSurvivor, "Survivor");
        this._keyItems = keyItems;
        this.dialog = new DialogTree<TutorialSurvivorDialog>(
            TutorialSurvivorDialog.Worries,
            [
                new DialogSequence(TutorialSurvivorDialog.Worries, [
                        new DialogText(NpcId.TutorialSurvivor, "Please help me out"),
                        new DialogText(NpcId.Player, "I'm trying"),
                    ]
                ),
            ],
        );
    }
}
