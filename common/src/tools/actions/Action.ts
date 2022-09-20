import {Requirement} from "common/tools/requirements/Requirement";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {NoRequirement} from "common/tools/requirements/NoRequirement";
import {Progress} from "common/tools/requirements/Progress";
import {Saveable} from "common/tools/saving/Saveable";
import {ActionSaveData} from "common/tools/actions/ActionSaveData";
import {ActionId} from "common/features/actionlist/ActionId";
import {IgtFeatures} from "common/features/IgtFeatures";

export abstract class Action implements Saveable {
    abstract id: ActionId;

    description: string;
    abstract icon: string;

    duration: number;
    repeat: number = Infinity; //0, x, Infinity (until error)

    isStarted: boolean = false;
    currentProgress: number = 0;
    isFinished: boolean = false;
    requirement: Requirement = new NoRequirement();

    // One iteration completed
    private _onCompletion = new SimpleEventDispatcher<Action>();
    // Entire action finished
    private _onFinished = new SimpleEventDispatcher<Action>();

    protected constructor(description: string, duration: number) {
        this.description = description;
        this.duration = duration;
    }

    public get saveKey() {
        return this.id;
    }

    perform(delta: number): void {
        if (!this.isStarted || this.isFinished) {
            return;
        }
        this.currentProgress += delta;

        if (this.canBeCompleted()) {
            this.complete();
        }
    }

    canBeCompleted() {
        return this.isStarted && this.currentProgress >= this.duration;
    }

    complete(): void {
        if (this.isFinished) {
            console.warn("Cannot complete action that is already finished");
            return;
        }
        console.log("Action completed");
        this._onCompletion.dispatch(this);
        const canRepeat: boolean = this.gainReward();
        if (canRepeat && this.repeat > 0) {
            this.repeatAction();
        } else {
            this.finish();
        }
    }

    getProgress(): Progress {
        return new Progress(this.currentProgress, this.duration);
    }

    repeatAction() {
        this.repeat--;
        this.currentProgress = 0;
    }

    /**
     * Some actions cannot be performed at the moment, but can already be scheduled (like cooking a fish)
     */
    canSchedule(): boolean {
        return this.requirement.isCompleted;
    }

    /**
     * Override if more permissions exist.
     */
    canPerform(): boolean {
        return this.requirement.isCompleted;
    }

    start(): boolean {
        if (!this.canPerform()) {
            console.log(`Can't start action ${this.description}`)
            return false;
        }
        this.isStarted = true;
        return true;
    }

    finish(): void {
        this.isFinished = true;
        this._onFinished.dispatch(this);
    }

    stop() {
        this.currentProgress = 0;
        this.isStarted = false;
    }

    /**
     * Implement with whatever the reward should be for your action.
     * Return false if something is blocking a repeat (full inventory, etc)
     */
    abstract gainReward(): boolean;

    public get onCompletion(): ISimpleEvent<Action> {
        return this._onCompletion.asEvent();
    }

    public get onFinished(): ISimpleEvent<Action> {
        return this._onFinished.asEvent();
    }


    public setRepeat(count: number): this {
        this.repeat = count;
        return this;
    }

    public setRequirement(req: Requirement): this {
        this.requirement = req;
        return this;
    }

    load(data: ActionSaveData): void {
        this.currentProgress = data.currentProgress;
        this.repeat = data.repeat;
        this.duration = data.duration;
    };

    save(): ActionSaveData {
        return {
            id: this.id,
            currentProgress: this.currentProgress,
            duration: this.duration,
            repeat: this.repeat
        }
    }

    /**
     * Grab the features your action need
     */
    abstract initialize(features: IgtFeatures): void;
}
