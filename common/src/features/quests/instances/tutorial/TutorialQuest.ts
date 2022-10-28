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
import {CompleteRecipeActionQuestStep} from "common/features/quests/steps/CompleteRecipeActionQuestStep";
import {ActionId} from "common/features/actionlist/ActionId";
import {PermanentlyAddGeneratorInjection} from "common/tools/injections/PermanentlyAddGeneratorInjection";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";
import {RoiLocationIdentifier} from "common/features/worldmap/roi/RoiLocationIdentifier";
import {GeneratorId} from "common/features/actionlist/GeneratorId";

export enum TutorialDialog {
    Intro = 'tutorial/intro',
    Explanation = 'tutorial/explanation',
    GoFish = 'tutorial/explanation',
}

export class TutorialQuest extends AbstractQuest {
    before(): void {
        const introInjection = new DialogRootInjection(NpcId.TutorialSurvivor, "Are you alive?",
            new DialogSequence(TutorialDialog.Intro, [
                    new DialogText(NpcId.TutorialSurvivor, "I'm badly injured, please help me out"),
                    new DialogText(NpcId.Player, "What can I do?", () => {
                        this.start();
                        introInjection.eject(this._features);
                    }),
                ],
                TutorialDialog.Explanation)
        );
        introInjection.inject(this._features);
    }

    completion(): void {
        // TODO get rewards
    }

    constructor(features: IgtFeatures) {
        super(QuestId.Tutorial, "Getting out alive", [
                new InjectionQuestStep(TutorialStepId.Explanation, [
                        new DialogRootInjection(NpcId.TutorialSurvivor, "What can I do?",
                            new DialogSequence(TutorialDialog.Explanation, [
                                    new DialogText(NpcId.TutorialSurvivor, "I need something to eat, can you cook me up some shrimp?"),
                                    new DialogText(NpcId.Player, "Sure..."),
                                    new DialogText(NpcId.TutorialSurvivor, "...Do you know how to do that?"),
                                    new DialogText(NpcId.Player, "Not really"),
                                    new DialogText(NpcId.TutorialSurvivor, "It's easy, take this fishing net and cast it in the ocean"),
                                    new DialogText(NpcId.Player, "I will try my best", () => {
                                            this.completeStep(TutorialStepId.Explanation)
                                        }
                                    ),
                                ]
                            )
                        )
                    ]
                ),
                new CompleteRecipeActionQuestStep(TutorialStepId.GoFish, ActionId.FishShrimpAction, 5, [
                    new PermanentlyAddGeneratorInjection(new RoiLocationIdentifier(WorldLocationId.TutorialShrimp), GeneratorId.FishLowerTier),
                ], features.actionQueue),
            ],
            new NoRequirement(), features);
    }
}
