import {DialogTree} from "common/tools/dialog/DialogTree";
import {NpcId} from "common/features/npcs/NpcId";
import {DialogSequence} from "common/tools/dialog/DialogSequence";
import {DialogText} from "common/tools/dialog/DialogText";
import {DialogChoice} from "common/tools/dialog/DialogChoice";
import {DialogOption} from "common/tools/dialog/DialogOption";
import {SaveableNpc} from "common/features/npcs/SaveableNpc";
import {TutorialSurvivorSaveData} from "common/features/npcs/tutorial/TutorialSurvivorSaveData";

export enum TutorialSurvivorDialog {
    Intro,
    HavingFunChoice,
    HavingFun,
    NotHavingFun,
}

export class TutorialSurvivor extends SaveableNpc {
    dialog: DialogTree<TutorialSurvivorDialog>;
    talkedToTimes: number = 0;

    constructor() {
        super(NpcId.TutorialSurvivor, "Survivor");
        this.dialog = new DialogTree<TutorialSurvivorDialog>(
            TutorialSurvivorDialog.Intro,
            [
                new DialogSequence(TutorialSurvivorDialog.Intro, [
                        new DialogText(NpcId.Player, "Nice weather", () => {
                            this.talkedToTimes++;
                            console.log(this.talkedToTimes)
                        }),
                        new DialogText(NpcId.TutorialSurvivor, "Indeed it is"),
                    ],
                    TutorialSurvivorDialog.HavingFunChoice,
                ),
                new DialogSequence(TutorialSurvivorDialog.HavingFun, [
                    new DialogText(NpcId.Player, "I definitely am"),
                    new DialogText(NpcId.TutorialSurvivor, "Good good"),
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
