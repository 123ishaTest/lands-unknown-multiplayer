import {Requirement} from "common/tools/requirements/Requirement";
import {NoRequirement} from "common/tools/requirements/NoRequirement";

/**
 * Represents a possible option that can be selected when the player is given a choice
 */
export class DialogOption<T> {
    label: string;
    reference: T;
    requirement: Requirement;

    constructor(label: string, reference: T, requirement: Requirement = new NoRequirement()) {
        this.label = label;
        this.reference = reference;
        this.requirement = requirement;
    }

    canAccess(): boolean {
        return this.requirement.isCompleted
    }
}
