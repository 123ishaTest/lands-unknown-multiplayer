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
import {PermanentlyAddFacilityInjection} from "common/tools/injections/PermanentlyAddFacilityInjection";
import {FacilityType} from "common/features/facilities/FacilityType";
import {ArriveAtLocationQuestStep} from "common/features/quests/steps/ArriveAtLocationQuestStep";
import {ItemId} from "common/features/items/ItemId";
import {GainKeyItemInjection} from "common/tools/injections/GainKeyItemInjection";
import {KeyItemId} from "common/features/keyitems/KeyItemId";

export enum TutorialDialog {
    Intro = 'tutorial/intro',
    Explanation = 'tutorial/explanation',
    LostFishingNet = 'tutorial/lost-fishing-net',
    RangeExplanation = 'tutorial/range-explanation',
    WoodInTheNorth = 'tutorial/wood-in-the-north',
    HealAdventurer = 'tutorial/heal-adventurer',
}

export class TutorialQuest extends AbstractQuest {
    completion(): void {
        // TODO get rewards
    }

    constructor(features: IgtFeatures) {
        super(QuestId.Tutorial, "Getting out alive",
            new DialogRootInjection(NpcId.TutorialSurvivor, "Are you alive?",
                new DialogSequence(TutorialDialog.Intro, [
                        new DialogText(NpcId.TutorialSurvivor, "I'm badly injured, please help me out"),
                        new DialogText(NpcId.Player, "What can I do?", () => {
                            this.start();
                        }),
                    ],
                    TutorialDialog.Explanation)
            ),
            [
                new InjectionQuestStep(TutorialStepId.Explanation, [
                        new DialogRootInjection(NpcId.TutorialSurvivor, "What can I do?",
                            new DialogSequence(TutorialDialog.Explanation, [
                                    new DialogText(NpcId.TutorialSurvivor, "I need something to eat, can you cook me up some shrimp?"),
                                    new DialogText(NpcId.Player, "Sure..."),
                                    new DialogText(NpcId.TutorialSurvivor, "...Do you know how to do that?"),
                                    new DialogText(NpcId.Player, "Not really"),
                                    new DialogText(NpcId.TutorialSurvivor, "It's easy, take this fishing net and cast it in the ocean"),
                                    new DialogText(NpcId.Player, "How will I carry them?"),
                                    new DialogText(NpcId.TutorialSurvivor, "You can take my bag, it allows you to carry items"),
                                    new DialogText(NpcId.Player, "I will try my best", () => {
                                            this._features.inventory.gainItemById(ItemId.FishingNet)
                                            this.completeStep(TutorialStepId.Explanation)
                                        }
                                    ),
                                ]
                            )
                        )
                    ]
                ),
                new CompleteRecipeActionQuestStep(TutorialStepId.GoFish, ActionId.FishShrimpAction, 5, [
                    new GainKeyItemInjection(KeyItemId.LeatherBag),
                    new DialogRootInjection(NpcId.TutorialSurvivor, "I lost my fishing net...",
                        new DialogSequence(TutorialDialog.LostFishingNet, [
                                new DialogText(NpcId.TutorialSurvivor, "That's quite careless of you"),
                                new DialogText(NpcId.Player, "Yeah..."),
                                new DialogText(NpcId.TutorialSurvivor, "Well I just happen to have spare one here"),
                                new DialogText(NpcId.Player, "Thanks", () => {
                                        this._features.inventory.gainItemById(ItemId.FishingNet)
                                    }
                                ),
                            ]
                        )
                    ),
                    new PermanentlyAddGeneratorInjection(new RoiLocationIdentifier(WorldLocationId.TutorialShrimp), GeneratorId.FishLowerTier),
                ], features.actionQueue),
                new InjectionQuestStep(TutorialStepId.DeliverFish, [
                        new DialogRootInjection(NpcId.TutorialSurvivor, "I got your fish here",
                            new DialogSequence(TutorialDialog.RangeExplanation, [
                                    new DialogText(NpcId.TutorialSurvivor, "But it's raw"),
                                    new DialogText(NpcId.Player, "Yeah..."),
                                    new DialogText(NpcId.TutorialSurvivor, "I can't really eat that can I?"),
                                    new DialogText(NpcId.Player, "What am I supposed to do?"),
                                    new DialogText(NpcId.TutorialSurvivor, "There is a range on the ship, maybe it still works?"),
                                    new DialogText(NpcId.Player, "I will check it out", () => {
                                            this.completeStep(TutorialStepId.DeliverFish)
                                        }
                                    ),
                                ]
                            )
                        )
                    ]
                ),
                new ArriveAtLocationQuestStep(TutorialStepId.InspectBrokenShip, WorldLocationId.TutorialBrokenShip, [
                    new PermanentlyAddFacilityInjection(new RoiLocationIdentifier(WorldLocationId.TutorialBrokenShip), FacilityType.ShrimpRange),
                ], features.worldMap),
                new InjectionQuestStep(TutorialStepId.DiscussWithSurvivor, [
                        new DialogRootInjection(NpcId.TutorialSurvivor, "It seems I need wood to cook on the range",
                            new DialogSequence(TutorialDialog.WoodInTheNorth, [
                                    new DialogText(NpcId.TutorialSurvivor, "I noticed a small tree up to the north"),
                                    new DialogText(NpcId.Player, "I'll be right back, take care", () => {
                                            this.completeStep(TutorialStepId.DiscussWithSurvivor)
                                        }
                                    ),
                                ]
                            )
                        )
                    ]
                ),
                new CompleteRecipeActionQuestStep(TutorialStepId.ChopWood, ActionId.ChopLogs, 5, [
                    new PermanentlyAddGeneratorInjection(new RoiLocationIdentifier(WorldLocationId.TutorialTree), GeneratorId.NormalTree),
                ], features.actionQueue),
                new CompleteRecipeActionQuestStep(TutorialStepId.CookShrimp, ActionId.CookShrimpAction, 5, [], features.actionQueue),
                new InjectionQuestStep(TutorialStepId.HealAdventurer, [
                        new DialogRootInjection(NpcId.TutorialSurvivor, "I have some cooked food here",
                            new DialogSequence(TutorialDialog.HealAdventurer, [
                                    new DialogText(NpcId.TutorialSurvivor, "Thanks so much"),
                                    new DialogText(NpcId.Player, "The adventurer looks slightly better"),
                                    new DialogText(NpcId.Player, "Quest complete?", () => {
                                            this.completeStep(TutorialStepId.HealAdventurer)
                                        }
                                    ),
                                ]
                            )
                        )
                    ]
                )
            ],
            new NoRequirement(), features);
    }
}
