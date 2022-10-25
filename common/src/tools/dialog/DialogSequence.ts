import {DialogText} from "common/tools/dialog/DialogText";

/**
 * A linear sequence of DialogText
 */
export class DialogSequence<T> {
    id: T;
    dialog: DialogText[];

    currentIndex: number = 0;

    destination?: T;

    constructor(id: T, dialog: DialogText[], destination?: T) {
        this.id = id;
        this.dialog = dialog;
        this.destination = destination;
    }

    next() {
        if (this.isAtEnd()) {
            console.warn(`Cannot go next as currentIndex is at the max`);
            return;
        }

        const currentDialog = this.dialog[this.currentIndex];
        if (currentDialog.afterRead != undefined) {
            currentDialog.afterRead();
        }
        this.currentIndex++;
    }

    isAtEnd(): boolean {
        return this.currentIndex === this.dialog.length;
    }

    getDialogText() {
        return this.dialog[this.currentIndex];
    }

    reset() {
        this.currentIndex = 0;
    }
}
