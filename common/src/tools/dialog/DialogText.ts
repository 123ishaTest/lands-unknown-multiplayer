import {NpcId} from "common/features/npcs/NpcId";

export class DialogText {
    speaker: NpcId;
    text: string;

    // Executed after this text is read
    afterRead?: Function;

    constructor(speaker: NpcId, text: string, afterRead?: Function) {
        this.speaker = speaker;
        this.text = text;
        this.afterRead = afterRead;
    }

}
