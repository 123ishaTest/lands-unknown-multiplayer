import {KeyItemId} from "common/features/keyitems/KeyItemId";
import {Requirement} from "common/tools/requirements/Requirement";
import {NoRequirement} from "common/tools/requirements/NoRequirement";

export class KeyItem {
    id: KeyItemId;
    name: string;
    description: string;
    unlockHint: string;
    image: string
    isUnlocked: boolean = false;
    requirement: Requirement;

    constructor(id: KeyItemId, image: string = "", name: string, description: string, unlockHint: string = "", requirement: Requirement = new NoRequirement()) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.unlockHint = unlockHint;
        this.image = image;
        this.requirement = requirement;
    }

    unlock(): boolean {
        if (this.requirement.isCompleted && !this.isUnlocked) {
            this.isUnlocked = true;
            return true;
        }
        return false;
    }
}
