import type {Action} from "common/tools/actions/Action";
import type {Requirement} from "common/tools/requirements/Requirement";
import {NoRequirement} from "common/tools/requirements/NoRequirement";
import type {IgtFeatures} from "common/features/IgtFeatures";
import type {Saveable} from "common/tools/saving/Saveable";
import type {ActionGeneratorSaveData} from "common/tools/actions/ActionGeneratorSaveData";
import {GeneratorId} from "common/features/actionlist/GeneratorId";

export abstract class ActionGenerator implements Saveable {
    abstract id: GeneratorId;
    description: string;

    repeats: number = 0;
    requirement: Requirement = new NoRequirement()

    saveKey: string;

    protected constructor(saveKey: string, description: string) {
        this.saveKey = saveKey;
        this.description = description;
    }

    public setRepeats(amount: number): this {
        this.repeats = amount;
        return this;
    }

    public setRequirement(req: Requirement): this {
        this.requirement = req;
        return this;
    }

    public canPerform(): boolean {
        return this.requirement.isCompleted;
    }

    public abstract initialize(features: IgtFeatures): void;

    public abstract isStarted(): boolean;

    public abstract isFinished(): boolean;

    /**
     * Get the next action from this generator
     */
    public abstract next(): Action

    /**
     * Called when this generator is processed in the top of the action queue
     */
    public start(): boolean {
        return true;
    };

    /**
     * Called when this generator is removed from the queue
     */
    public stop(): void {
        // Empty
    };

    abstract save(): ActionGeneratorSaveData;

    abstract load(data: ActionGeneratorSaveData): void;
}

