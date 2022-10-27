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
    Intro = 'tutorial/intro',
    Explanation = 'tutorial/explanation',
}

export class TutorialQuest extends AbstractQuest {
    before(): void {
        const introInjection = new DialogRootInjection(NpcId.TutorialSurvivor, "Are you alive?",
            new DialogSequence(TutorialDialog.Intro, [
                    new DialogText(NpcId.TutorialSurvivor, "I'm badly injured, please help me out"),
                    new DialogText(NpcId.Player, "What can I do?"),
                    new DialogText(NpcId.TutorialSurvivor, "I need something to eat, can you cook me up some shrimp?"),
                    new DialogText(NpcId.Player, "Sure..."),
                    new DialogText(NpcId.TutorialSurvivor, "...Do you know how to do that?"),
                    new DialogText(NpcId.Player, "Not really"),
                    new DialogText(NpcId.TutorialSurvivor, "It's easy, take this fishing net and cast it in the ocean"),
                    new DialogText(NpcId.Player, "Brb", () => {
                        this.start();
                        introInjection.eject(this._features);
                    }),
                ],
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
