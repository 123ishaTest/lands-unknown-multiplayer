import {Action} from "common/tools/actions/Action";

export interface IActionGenerator {

    /**
     * Whether this action is done, after returning true it will stop
     */
    isFinished(): boolean

    getNext(): Action
}
