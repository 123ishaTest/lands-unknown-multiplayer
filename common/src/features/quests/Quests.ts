import {IgtFeature} from "common/features/IgtFeature";
import {AbstractQuest} from "common/features/quests/AbstractQuest";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {QuestId} from "common/features/quests/QuestId";
import {IgtFeatures} from "common/features/IgtFeatures";
import {TutorialQuest} from "common/features/quests/instances/tutorial/TutorialQuest";
import {QuestsSaveData} from "common/features/quests/QuestsSaveData";

export class Quests extends IgtFeature {

    list: AbstractQuest[] = [];

    protected _onQuestCompleted = new SimpleEventDispatcher<AbstractQuest>();

    public get onQuestCompleted(): ISimpleEvent<AbstractQuest> {
        return this._onQuestCompleted.asEvent();
    }

    constructor() {
        super('quests');
    }

    getQuest(id: QuestId) {
        return this.list.find(quest => {
            return quest.id === id;
        })
    }

    initialize(features: IgtFeatures) {
        super.initialize(features);
        this.list = [
            new TutorialQuest(features),
        ]

        this.list.forEach(quest => {
            quest.onQuestCompleted.one(quest => {
                this._onQuestCompleted.dispatch(quest);
            })
        })
    }

    start() {
        this.list.forEach(quest => {
            if (!quest.isStarted) {
                quest.before();
            }
        })
    }

    load(data: QuestsSaveData): void {
        data.list?.forEach(questData => {
            const quest = this.getQuest(questData.id)
            if (quest) {
                quest.load(questData)
            }
        })
    }

    save(): QuestsSaveData {
        return {
            list: this.list.filter(quest => {
                return quest.isStarted;
            }).map(quest => {
                return quest.save();
            })
        };
    }
}
