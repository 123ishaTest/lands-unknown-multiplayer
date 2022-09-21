import {ActionGenerator} from "common/tools/actions/ActionGenerator";
import {Action} from "common/tools/actions/Action";
import {IgtFeatures} from "common/features/IgtFeatures";
import {SingleActionGeneratorSaveData} from "common/tools/actions/SingleActionGeneratorSaveData";
import {ActionId} from "common/features/actionlist/ActionId";

export class SingleActionGenerator extends ActionGenerator {
    id = ActionId.SingleActionGenerator;
    action: Action;

    private _isStarted: boolean = false;
    private _isFinished: boolean = false;

    constructor(action: Action, repeats: number = 0) {
        super(ActionId.SingleActionGenerator);
        this.action = action;
        this.setRequirement(action.requirement)
        this.setRepeats(repeats)
    }

    public get description(): string {
        return this.action.description;
    }

    public get currentAction(): Action {
        return this.action;
    }


    /**
     * We have no next action, so we're finished
     */
    next(): void {
        this._isFinished = true;
    }

    perform(delta: number): void {
        this.currentAction.perform(delta);
    }

    canPerform(): boolean {
        return super.canPerform();
    }

    initialize(features: IgtFeatures) {
        this.action.initialize(features);
    }

    isStarted(): boolean {
        return this._isStarted;
    }

    isFinished(): boolean {
        return this._isFinished;
    }

    save(): SingleActionGeneratorSaveData {
        return {
            id: this.id,
            currentAction: this.action.save()
        };
    }

    load(data: SingleActionGeneratorSaveData) {
        this.action.load(data.currentAction);
    }

    start(): boolean {
        return this.action.start();
    }

    stop(): void {
        this.action.stop();
    }

}
