import type {Requirement} from "common/tools/requirements/Requirement";
import {NoRequirement} from "common/tools/requirements/NoRequirement";
import {Progress} from "common/tools/requirements/Progress";
import type {Saveable} from "common/tools/saving/Saveable";
import type {ActionSaveData} from "common/tools/actions/ActionSaveData";
import type {ActionId} from "common/features/actionlist/ActionId";
import type {IgtFeatures} from "common/features/IgtFeatures";

export abstract class Action implements Saveable {
    abstract id: ActionId;

    description: string;
    abstract icon: string;

    private _duration: number;

    currentProgress: number = 0;
    requirement: Requirement = new NoRequirement();

    protected constructor(description: string, duration: number) {
        this.description = description;
        this._duration = duration;
    }

    public get duration(): number {
        return this._duration;
    }

    public set duration(value: number) {
        this._duration = value;
    }

    public get saveKey() {
        return this.id;
    }

    perform(delta: number): void {
        this.currentProgress += delta;
    }

    canBeCompleted() {
        return this.currentProgress >= this.duration;
    }

    /**
     * Returns whether this action can be repeated
     */
    complete(): boolean {
        return this.gainReward();
    }

    getProgress(): Progress {
        return new Progress(this.currentProgress, this.duration);
    }

    resetAction() {
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

    /**
     * Returns whether this action was actually started
     */
    start(): boolean {
        if (!this.canPerform()) {
            console.log(`Can't start action ${this.description}`)
            return false;
        }
        return true;
    }

    stop() {
        this.currentProgress = 0;
    }

    /**
     * Implement with whatever the reward should be for your action.
     * Return false if something is blocking a repeat (full inventory, etc)
     */
    abstract gainReward(): boolean;

    public setRequirement(req: Requirement): this {
        this.requirement = req;
        return this;
    }

    load(data: ActionSaveData): void {
        this.currentProgress = data.currentProgress;
        this._duration = data.duration;
        this.description = data.description;
    };

    save(): ActionSaveData {
        return {
            id: this.id,
            description: this.description,
            currentProgress: this.currentProgress,
            duration: this.duration,
        }
    }

    /**
     * Grab the features your action needs
     */
    abstract initialize(features: IgtFeatures): void;
}
