import {DialogTree} from "common/tools/dialog/DialogTree";
import {NpcId} from "common/features/npcs/NpcId";
import {DialogSequence} from "common/tools/dialog/DialogSequence";
import {DialogText} from "common/tools/dialog/DialogText";
import {DialogChoice} from "common/tools/dialog/DialogChoice";
import {DialogOption} from "common/tools/dialog/DialogOption";
import {SaveableNpc} from "common/features/npcs/SaveableNpc";
import {TutorialSurvivorSaveData} from "common/features/npcs/tutorial/TutorialSurvivorSaveData";
import {VariableString} from "common/tools/dialog/VariableString";
import {DialogVariable} from "common/tools/dialog/DialogVariable";
import {KeyItems} from "common/features/keyitems/keyItems";
import {KeyItemId} from "common/features/keyitems/KeyItemId";

export enum TutorialSurvivorDialog {
    Intro,
    HavingFunChoice,
    HavingFun,
    NotHavingFun,
}

export class TutorialSurvivor extends SaveableNpc {
    _keyItems: KeyItems
    dialog: DialogTree<TutorialSurvivorDialog>;
    talkedToTimes: number = 0;

    constructor(keyItems: KeyItems) {
        super(NpcId.TutorialSurvivor, "Survivor");
        this._keyItems = keyItems;
        this.dialog = new DialogTree<TutorialSurvivorDialog>(
            TutorialSurvivorDialog.Intro,
            [
                new DialogSequence(TutorialSurvivorDialog.Intro, [
                        new DialogText(NpcId.Player, `Nice weather`, () => {
                            this.talkedToTimes++;
                        }),
                        new DialogText(NpcId.TutorialSurvivor, new VariableString("You've talked to me :count: times", [new DialogVariable(":count:", () => this.talkedToTimes)])),
                    ],
                    TutorialSurvivorDialog.HavingFunChoice,
                ),
                new DialogSequence(TutorialSurvivorDialog.HavingFun, [
                    new DialogText(NpcId.Player, "I definitely am"),
                    new DialogText(NpcId.TutorialSurvivor, "Good good", () => {
                        this._keyItems.gainKeyItem(KeyItemId.LeatherBag)
                    }),
                ]),
                new DialogSequence(TutorialSurvivorDialog.NotHavingFun, [
                    new DialogText(NpcId.Player, "Nope, this game sucks"),
                    new DialogText(NpcId.TutorialSurvivor, "Wow rude"),
                ])
            ],
            [
                new DialogChoice(TutorialSurvivorDialog.HavingFunChoice, new DialogText(NpcId.TutorialSurvivor, "Are you having fun?"), [
                    new DialogOption("Yeah", TutorialSurvivorDialog.HavingFun),
                    new DialogOption("Nah", TutorialSurvivorDialog.NotHavingFun),
                ])
            ]
        );
    }

    load(data: TutorialSurvivorSaveData): void {
        this.talkedToTimes = data.talkedToTimes;
    }

    save(): TutorialSurvivorSaveData {
        return {
            id: this.id,
            talkedToTimes: this.talkedToTimes
        };
    }
}
