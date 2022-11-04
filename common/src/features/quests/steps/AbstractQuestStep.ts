import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {IgtFeatures} from "common/features/IgtFeatures";

export abstract class AbstractQuestStep {
    id: number;

    protected _onStepCompleted = new SimpleEventDispatcher<AbstractQuestStep>();

    protected constructor(id: number) {
        this.id = id;
    }

    abstract before(features: IgtFeatures): void;

    abstract after(features: IgtFeatures): void;

    public get onStepCompleted(): ISimpleEvent<AbstractQuestStep> {
        return this._onStepCompleted.asEvent();
    }

}
