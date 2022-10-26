import {NpcId} from "common/features/npcs/NpcId";
import {VariableString} from "common/tools/dialog/VariableString";

export class DialogText {
    speaker: NpcId;
    variableString: VariableString

    // Executed after this text is read
    afterRead?: Function;

    constructor(speaker: NpcId, text: string | VariableString, afterRead?: Function) {
        this.speaker = speaker;
        if (text instanceof VariableString) {
            this.variableString = text;
        } else {
            this.variableString = new VariableString(text, []);
        }
        this.afterRead = afterRead;
    }

    get text(): string {
        return this.variableString.render();
    }

}
