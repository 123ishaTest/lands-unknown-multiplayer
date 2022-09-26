import {defaultPlayer} from "common/Content"
import {reactive} from "vue";
import type {Player} from "common/Player";

export class LocalPlayer {
    public static player: Player = reactive(defaultPlayer) as Player;

    public static init() {
        this.player.initialize();
    }
}
