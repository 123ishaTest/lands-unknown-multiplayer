import {createApp} from 'vue'
import App from './App.vue'

import './assets/main.css'
import {player} from "common/Content";
import {FirebaseHelper} from "@/model/FirebaseHelper";

createApp(App).mount('#app')

console.log(player);

FirebaseHelper.init();
