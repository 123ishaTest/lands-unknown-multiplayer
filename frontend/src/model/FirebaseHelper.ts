import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import AuthUI = firebaseui.auth.AuthUI;
// @ts-ignore
import User = firebase.User;
import {ApiClient} from "@/model/ApiClient";

export class FirebaseHelper {
    public static ui: AuthUI;
    public static user: User | null = null;
    public static userSet = false;
    public static token = "";
    public static displayName = "";

    public static init() {
        const firebaseConfig = {
            apiKey: "AIzaSyAGvdCM162YR4JcTxQZ7_WrUUz_0ZxNhEk",
            authDomain: "lands-unknown-multiplayer.firebaseapp.com",
            projectId: "lands-unknown-multiplayer",
            storageBucket: "lands-unknown-multiplayer.appspot.com",
            messagingSenderId: "843225416000",
            appId: "1:843225416000:web:666d9c24730c5e08ca7aa5"
        };


        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                FirebaseHelper.updateToken();
            }
        });
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.ui.start('#firebaseui-auth-container', {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
                signInSuccessWithAuthResult: function () {
                    FirebaseHelper.updateToken();
                    return false;
                },
            },
            signInFlow: 'popup',
        });
    }

    public static updateToken() {
        const user = firebase.auth().currentUser;
        if (!user) {
            return;
        }
        this.user = user
        this.userSet = true;
        user.getIdToken(true).then((idToken: string) => {
            this.token = idToken;
            ApiClient.login(idToken);
        }).catch(function (error: any) {
            console.error(error);
        });
    }
}
