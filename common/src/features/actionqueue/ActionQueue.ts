import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {IgtFeature} from "common/features/IgtFeature";
import {Action} from "common/tools/actions/Action";
import {ActionQueueSaveData} from "common/features/actionqueue/ActionQueueSaveData";
import {IgtFeatures} from "common/features/IgtFeatures";
import {ActionList} from "common/features/actionlist/ActionList";
import {ActionId} from "common/features/actionlist/ActionId";
import {ActionGenerator} from "common/tools/actions/ActionGenerator";
import {SingleActionGenerator} from "common/tools/actions/SingleActionGenerator";
import {SingleActionGeneratorSaveData} from "common/tools/actions/SingleActionGeneratorSaveData";

export class ActionQueue extends IgtFeature {
    _actionList: ActionList;

    generators: ActionGenerator[] = [];
    readonly MAX_ACTIONS = 10;

    private _onActionCompletion = new SimpleEventDispatcher<Action>();

    public get onActionCompletion(): ISimpleEvent<Action> {
        return this._onActionCompletion.asEvent();
    }

    constructor() {
        super('actionQueue');
    }


    initialize(features: IgtFeatures) {
        this._actionList = features.actionList;
    }

    public get currentAction(): Action | null {
        return this.generators.length === 0 ? null : this.generators[0].currentAction;
    }

    update(delta: number) {
        if (this.generators.length === 0) {
            return;
        }
        if (!this.generators[0].isStarted()) {
            const couldStart = this.generators[0].start();
            if (!couldStart || this.generators[0].isFinished()) {
                this.removeFirstAction();
            }
        }

        // Check again in case first action is removed
        if (this.generators.length > 0) {
            this.generators[0].perform(delta);
            this.generators[0].checkCompletion();
            if (this.generators[0].isFinished()) {
                this.removeFirstAction();
            }
        }
    }

    cancelAction(index: number) {
        const action = this.generators[index];

        if (action == null) {
            console.error(`Could not find and cancel action at index ${index}`);
            return;

        }
        // Reset the rest if we just canceled a travel
        // const cascadeCancel = (action as TravelAction).to != null;
        this.cancelActionsFromIndex(index, false);
    }

    cancelActionsFromIndex(index: number, cascade: boolean) {
        if (!cascade) {
            this.generators[index].stop();
            this.generators.splice(index, 1);
            return;
        }
        for (let i = index; i < this.generators.length; i++) {
            this.generators[i].stop();
        }
        this.generators = this.generators.slice(0, index);
    }

    /**
     * Helper method to more easily add actions by id
     */
    public addActionById(actionId: ActionId) {
        this.addActionGenerator(this._actionList.getActionGenerator(actionId));
    }

    /**
     * Add an action by wrapping it in a generator
     */
    public addAction(action: Action) {
        this.addActionGenerator(new SingleActionGenerator(action));
    }

    addActionGenerator(action: ActionGenerator) {
        // No need to schedule an action for now if we can't perform it.
        if (this.generators.length === 0 && !action.canPerform()) {
            return;
        }

        if (this.generators.length >= this.MAX_ACTIONS) {
            console.log(`You already have ${this.MAX_ACTIONS} actions scheduled.`);
            return;
        }

        // TODO fix pubsub
        // const sub = action.onCompletion.subscribe((action) => {
        //     this._onActionCompletion.dispatch(action);
        // })
        // action.onFinished.one(() => {
        //     sub();
        // })

        this.generators.push(action);
    }

    // Could be improved to be more bug-safe
    removeFirstAction() {
        this.generators.shift();
    }


    load(data: ActionQueueSaveData): void {
        this.generators = [];
        data.generators?.forEach(generatorData => {
            let generator;

            if (generatorData.id === ActionId.SingleActionGenerator) {
                generator = this._actionList.getActionGenerator((generatorData as SingleActionGeneratorSaveData).currentAction.id);
            } else {
                generator = this._actionList.getActionGenerator(generatorData.id);
            }

            generator.load(generatorData);
            this.addActionGenerator(generator);
        })
    }

    save(): ActionQueueSaveData {
        return {
            generators: this.generators.map(generator => generator.save()),
        };
    }

}
