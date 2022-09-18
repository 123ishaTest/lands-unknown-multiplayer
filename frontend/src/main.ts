import {createApp} from 'vue'
import App from './App.vue'

import './assets/main.css'
import {Player} from "common/Player";
import {SocketHelper} from "@/SocketHelper";

createApp(App).mount('#app')

const player = new Player("asd", "asd");

console.log(player);

SocketHelper.init();
