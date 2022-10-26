import {DialogSequence} from "common/tools/dialog/DialogSequence";
import {DialogChoice} from "common/tools/dialog/DialogChoice";
import {DialogText} from "common/tools/dialog/DialogText";
import {NpcId} from "common/features/npcs/NpcId";
import {DialogOption} from "common/tools/dialog/DialogOption";
import {NpcDecision} from "common/tools/dialog/decisions/NpcDecision";

export class DialogTree<T> {
    sequences: DialogSequence<T>[];
    choices: DialogChoice<T>[];
    npcDecisions: NpcDecision<T>[];
    root: DialogChoice<T>;
    private readonly firstDialog: T;

    constructor(firstDialog: T, sequences: DialogSequence<T>[], choices: DialogChoice<T>[] = [], npcDecisions: NpcDecision<T>[] = []) {
        this.firstDialog = firstDialog;
        this.sequences = sequences;
        this.choices = choices;
        this.npcDecisions = npcDecisions;

        // Initialize root as a choice with a single option. It will be skipped if there is only a single choice
        this.root = new DialogChoice<T>('root' as unknown as T, new DialogText(NpcId.Player, "What do you want to talk about?"), [new DialogOption<T>("Talk about something else", this.firstDialog)]);
    }

    reset(): void {
        this.sequences.forEach(dialog => {
            dialog.currentIndex = 0;
        })
    }

    getDialog(id: T) {
        return this.sequences.find(value => value.id === id) ?? null;
    }

    getChoice(id: T) {
        return this.choices.find(value => value.id === id) ?? null;
    }

    getNpcDecision(id: T) {
        return this.npcDecisions.find(value => value.id === id) ?? null;
    }
}
