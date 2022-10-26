import {AbstractQuest} from "common/features/quests/AbstractQuest";
import {NpcId} from "common/features/npcs/NpcId";
import {DialogRootInjection} from "common/tools/injections/DialogRootInjection";
import {DialogSequence} from "common/tools/dialog/DialogSequence";
import {NoRequirement} from "common/tools/requirements/NoRequirement";
import {DialogText} from "common/tools/dialog/DialogText";
import {IgtFeatures} from "common/features/IgtFeatures";
import {QuestId} from "common/features/quests/QuestId";
import {TutorialStepId} from "common/features/quests/instances/tutorial/TutorialStepId";
import {InjectionQuestStep} from "common/features/quests/steps/InjectionQuestStep";

export enum TutorialDialog {
    QuestIntro,
    Explanation,
}

export class TutorialQuest extends AbstractQuest {
    before(): void {
        const introInjection = new DialogRootInjection(
            NpcId.TutorialSurvivor,
            "So you're alive?",
            new DialogSequence(TutorialDialog.QuestIntro, [
                    new DialogText(NpcId.TutorialSurvivor, "Just barely"),
                    new DialogText(NpcId.Player, "Chop wood?"),
                    new DialogText(NpcId.TutorialSurvivor, "Yeah lets go", () => {
                        this.start();
                        introInjection.eject(this._features);
                    }),
                ],
                null,
            )
        );
        introInjection.inject(this._features);
    }

    completion(): void {
        // TODO get rewards
    }

    constructor(features: IgtFeatures) {
        super(QuestId.Tutorial, "Getting out alive", [
                new InjectionQuestStep(TutorialStepId.Intro, [
                        new DialogRootInjection(NpcId.TutorialSurvivor, "Talk about lumberjack quest",
                            new DialogSequence(TutorialDialog.Explanation, [
                                    new DialogText(NpcId.Player, "I will try my best", () => {
                                            this.completeStep(TutorialStepId.Intro)
                                        }
                                    ),
                                ]
                            )
                        )
                    ]
                ),
            ],
            new NoRequirement(), features);
    }
}
