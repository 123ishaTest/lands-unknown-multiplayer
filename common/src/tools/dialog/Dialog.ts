import {DialogTree} from "common/tools/dialog/DialogTree";
import {DialogType} from "common/tools/dialog/DialogType";
import {DialogChoice} from "common/tools/dialog/DialogChoice";
import {DialogSequence} from "common/tools/dialog/DialogSequence";

export class Dialog<T> {
    public tree: DialogTree<T> | null;
    public type: DialogType;
    public choice: DialogChoice<T> | null;
    public sequence: DialogSequence<T> | null;


    constructor() {
        this.tree = null;
        this.type = DialogType.None;
        this.choice = null;
        this.sequence = null;
    }

    public start(tree: DialogTree<T>) {
        tree.reset();
        this.tree = tree;
        const root = this.tree.root;

        // If we only have 1 option we can skip the root
        if (root.options.length === 1) {
            this.goToDestination(root.options[0].reference);
        } else {
            this.setRoot(root);
        }
    }

    /**
     * Skip to the end of the current dialog
     */
    public goToEnd() {
        if (this.sequence == null) {
            return;
        }
        while (this.sequence) {
            this.next();
        }
    }

    /**
     * Returns true when the dialog is done
     */
    public next(): boolean {
        if (this.sequence == null) {
            console.warn("Could not go next if sequence is null");
            return;
        }
        this.sequence.next();

        if (this.sequence.isAtEnd()) {
            this.sequence.reset();
            this.goToDestination(this.sequence.destination);
        }
        return this.type === DialogType.None;
    }

    public selectOption(index: number) {
        if (this.choice == null) {
            console.warn("Could not select option if choice is null");
            return;
        }
        if (index >= this.choice.options.length) {
            console.warn(`Current choice does not have index ${index}, only ${this.choice.options.length} options`);
            return;
        }

        const destination = this.choice.options[index].reference;

        this.goToDestination(destination);
    }

    private goToDestination(destination: T | undefined) {
        if (destination == undefined) {
            this.end();
            return;
        }

        // Check if it's an NPC choice
        const npcDecision = this.tree?.getNpcDecision(destination);

        if (npcDecision) {
            const decided = npcDecision.decide();
            this.goToDestination(decided)
            return;
        }

        // Or a sequence
        const sequence = this.tree?.getDialog(destination);
        if (sequence) {
            this.setSequence(sequence);
            return;
        }

        // Or a player choice
        const choice = this.tree?.getChoice(destination);
        if (choice) {
            this.setChoice(choice)
            return;
        }

        console.error(`Could not transition to id ${destination}. Is it implemented?`)
    }

    private setSequence(sequence: DialogSequence<T>) {
        this.type = DialogType.Sequence;
        this.choice = null;
        this.sequence = sequence;
    }

    private setRoot(root: DialogChoice<T>) {
        this.type = DialogType.Choice;
        this.sequence = null;
        this.choice = root;
    }

    private setChoice(choice: DialogChoice<T>) {
        this.sequence = null;
        this.choice = choice
        this.type = DialogType.Choice;
    }

    private end() {
        this.sequence = null;
        this.choice = null;
        this.type = DialogType.None;
    }
}
