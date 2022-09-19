import {createApp} from 'vue'
import App from './App.vue'

import './assets/main.css'
import {Connection} from "@/Connection";
import {player} from "common/Content";

createApp(App).mount('#app')

console.log(player);

Connection.init();
