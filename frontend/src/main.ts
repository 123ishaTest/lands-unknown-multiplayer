import {createApp} from 'vue'
import App from './App.vue'

import './assets/main.css'
import {FirebaseHelper} from "@/model/FirebaseHelper";

createApp(App).mount('#app')

FirebaseHelper.init();
