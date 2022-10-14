import {createApp} from 'vue'
import App from './App.vue'

import './assets/main.css'
import {FirebaseHelper} from "@/model/FirebaseHelper";
import {ApiClient} from "@/model/ApiClient";

createApp(App).mount('#app')

process.env.NODE_ENV === "production" ? FirebaseHelper.init() : ApiClient.login("");
