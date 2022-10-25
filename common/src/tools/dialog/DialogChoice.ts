import {DialogText} from "common/tools/dialog/DialogText";
import {DialogOption} from "common/tools/dialog/DialogOption";

export class DialogChoice<T> {
    id: T;
    description: DialogText;
    options: DialogOption<T>[]

    constructor(id: T, description: DialogText, options: DialogOption<T>[]) {
        this.id = id;
        this.description = description
        this.options = options;
    }
}
