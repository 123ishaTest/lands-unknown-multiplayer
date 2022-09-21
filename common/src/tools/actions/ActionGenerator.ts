import {Action} from "common/tools/actions/Action";
import {Requirement} from "common/tools/requirements/Requirement";
import {NoRequirement} from "common/tools/requirements/NoRequirement";
import {IgtFeatures} from "common/features/IgtFeatures";
import {Saveable} from "common/tools/saving/Saveable";
import {ActionGeneratorSaveData} from "common/tools/actions/ActionGeneratorSaveData";
import {ActionId} from "common/features/actionlist/ActionId";

export abstract class ActionGenerator implements Saveable {
    abstract id: ActionId;
    abstract description: string;

    repeats: number = 0;
    requirement: Requirement = new NoRequirement()

    saveKey: string;

    abstract currentAction: Action;

    protected constructor(saveKey: string) {
        this.saveKey = saveKey;
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

    public abstract initialize(features: IgtFeatures);

    public abstract isStarted(): boolean;

    public abstract isFinished(): boolean;

    public abstract perform(delta: number): void;

    checkCompletion(): void {
        if (this.currentAction?.canBeCompleted()) {
            const canBeRepeated = this.currentAction.complete()
            if (canBeRepeated && this.repeats > 0) {
                this.currentAction.resetAction()
                this.repeats--;
            } else {
                this.next();
            }
        }
    }

    public abstract next(): void

    public abstract start(): boolean;

    public abstract stop(): void;

    abstract save(): ActionGeneratorSaveData;

    abstract load(data: ActionGeneratorSaveData): void;
}

