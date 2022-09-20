import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {IgtFeature} from "common/features/IgtFeature";
import {Action} from "common/tools/actions/Action";
import {ActionQueueSaveData} from "common/features/actionqueue/ActionQueueSaveData";

export class ActionQueue extends IgtFeature {
    actions: Action[] = [];
    readonly MAX_ACTIONS = 10;

    private _onActionCompletion = new SimpleEventDispatcher<Action>();

    public get onActionCompletion(): ISimpleEvent<Action> {
        return this._onActionCompletion.asEvent();
    }

    constructor() {
        super('actionQueue');
    }

    update(delta: number) {
        if (this.actions.length > 0) {
            if (!this.actions[0].isStarted) {
                const couldStart = this.actions[0].start();
                if (!couldStart) {
                    this.removeFirstAction();
                }
            }
        }
        if (this.actions.length > 0) {
            if (this.actions[0].isFinished) {
                this.removeFirstAction();
            }
        }

        // Check again in case first action is removed
        if (this.actions.length > 0) {
            this.actions[0].perform(delta);
        }
    }

    cancelAction(index: number) {
        const action = this.actions[index];

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
            this.actions[index].stop();
            this.actions.splice(index, 1);
            return;
        }
        for (let i = index; i < this.actions.length; i++) {
            this.actions[i].stop();
        }
        this.actions = this.actions.slice(0, index);
    }

    addAction(action: Action, repeat: number = -1) {
        if (repeat !== -1) {
            action.repeat = repeat;
        }

        // No need to schedule an action for now if we can't perform it.
        if (this.actions.length === 0 && !action.canPerform()) {
            return;
        }

        if (this.actions.length >= this.MAX_ACTIONS) {
            console.log(`You already have ${this.MAX_ACTIONS} actions scheduled.`);
            return;
        }

        const sub = action.onCompletion.subscribe((action) => {
            this._onActionCompletion.dispatch(action);
        })
        action.onFinished.one(() => {
            sub();
        })

        this.actions.push(action);
    }

    // Could be improved to be more bug-safe
    removeFirstAction() {
        this.actions.shift();
    }


    load(data: ActionQueueSaveData): void {
        // TODO implement loading of actions
    }

    save(): ActionQueueSaveData {
        return {
            actions: this.actions.map(action => action.save()),
        }
    }

}
