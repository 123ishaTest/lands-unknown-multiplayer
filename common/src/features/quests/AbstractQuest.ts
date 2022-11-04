import {isSaveable, Saveable} from "common/tools/saving/Saveable";
import {IgtFeatures} from "common/features/IgtFeatures";
import {QuestId} from "common/features/quests/QuestId";
import {Requirement} from "common/tools/requirements/Requirement";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {QuestStatus} from "common/features/quests/QuestStatus";
import {QuestSaveData} from "common/features/quests/QuestSaveData";
import {AbstractQuestStep} from "common/features/quests/steps/AbstractQuestStep";
import {AbstractInjection} from "common/tools/injections/AbstractInjection";
import {NoRequirement} from "common/tools/requirements/NoRequirement";

export abstract class AbstractQuest implements Saveable {
    _features: IgtFeatures;

    id: QuestId;
    name: string;
    requirement: Requirement;

    abstract initialStep: AbstractInjection;
    abstract steps: AbstractQuestStep[];
    currentIndex: number = -1;
    isStarted: boolean = false;
    isCompleted: boolean = false;

    saveKey: string;

    protected _onQuestCompleted = new SimpleEventDispatcher<AbstractQuest>();
    protected _onQuestStarted = new SimpleEventDispatcher<AbstractQuest>();

    public get onQuestCompleted(): ISimpleEvent<AbstractQuest> {
        return this._onQuestCompleted.asEvent();
    }

    public get onQuestStarted(): ISimpleEvent<AbstractQuest> {
        return this._onQuestStarted.asEvent();
    }


    protected constructor(id: QuestId, name: string,) {
        this.id = id;
        this.name = name;
        this.requirement = new NoRequirement();

        this.saveKey = id;
    }

    /**
     * Run before this quest is even active.
     * Use to inject starting dialog.
     */
    before(): void {
        this.initialStep.inject(this._features)
    }

    /**
     * This method will only run once. You can give rewards in here.
     */
    abstract completion(): void

    initialize(features: IgtFeatures) {
        this._features = features;
    }

    completeStep(id: number) {
        if (this.currentStep.id !== id) {
            console.warn(`Cannot complete step ${id} if we're currently at ${this.currentStep.id}`);
            return;
        }
        this.nextStep();
    }

    private nextStep() {
        if (!this.isStarted) {
            console.error("Cannot next step quest if it's not started");
        }
        if (this.currentStep) {
            this.currentStep.after(this._features);
        }

        if (this.currentIndex == this.steps.length - 1) {
            this.completeQuest();
            this.currentIndex++;
            return;
        }
        this.currentIndex++;

        this.currentStep.before(this._features);

        // In case the step wants to mark itself as completed
        this.currentStep.onStepCompleted.one((step) => {
            this.completeStep(step.id);
        })

    }

    private completeQuest() {
        this.isCompleted = true;
        this.completion();
        this._onQuestCompleted.dispatch(this);
    }

    start(notify: boolean = true) {
        if (!this.requirement.isCompleted || this.isStarted) {
            console.warn(`Cannot start quest ${this.id}`);
            return;
        }
        this.isStarted = true;
        this.initialStep.eject(this._features);

        if (notify) {
            this._onQuestStarted.dispatch(this);
        }
        this.nextStep();
    }

    get currentStep() {
        return this.steps[this.currentIndex];
    }

    get status(): QuestStatus {
        if (!this.isStarted) {
            return QuestStatus.NotStarted;
        }
        if (this.isCompleted) {
            return QuestStatus.Finished;
        }
        return QuestStatus.Started;
    }

    load(data: QuestSaveData): void {
        if (!this.isStarted) {
            this.start(false);
        }

        for (let i = this.currentIndex; i < data.currentIndex; i++) {
            this.completeStep(i);
        }

        data.steps?.forEach(stepData => {
            const step = this.steps[stepData.step];
            if (step && isSaveable(step)) {
                step.load(stepData.data);
            }
        })
    }

    save(): QuestSaveData {
        return {
            id: this.id,
            currentIndex: this.currentIndex,
            steps: this.steps.flatMap(step => {
                if (isSaveable(step)) {
                    return [{
                        step: step.id,
                        data: step.save(),
                    }]
                }
                return [];
            })
        };
    }
}
