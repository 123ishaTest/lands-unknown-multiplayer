import {Requirement} from "common/tools/requirements/Requirement";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {NoRequirement} from "common/tools/requirements/NoRequirement";
import {Progress} from "common/tools/requirements/Progress";
import {Saveable} from "common/tools/saving/Saveable";
import {ActionSaveData} from "common/tools/actions/ActionSaveData";

export abstract class Action implements Saveable {
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


    public setRepeat(count: number) {
        this.repeat = count;
    }

    public setRequirement(req: Requirement) {
        this.requirement = req;
    }

    abstract load(data: ActionSaveData): void;

    abstract save(): ActionSaveData;

    abstract saveKey: string;

}
