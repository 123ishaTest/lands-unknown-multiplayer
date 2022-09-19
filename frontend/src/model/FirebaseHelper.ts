import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import AuthUI = firebaseui.auth.AuthUI;
// @ts-ignore
import User = firebase.User;
import {Connection} from "@/Connection";

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

        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.ui.start('#firebaseui-auth-container', {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    const credential = authResult.credential;
                    const isNewUser = authResult.additionalUserInfo.isNewUser;
                    const providerId = authResult.additionalUserInfo.providerId;
                    const operationType = authResult.operationType;
                    // Do something with the returned AuthResult.
                    // Return type determines whether we continue the redirect
                    // automatically or whether we leave that to developer to handle.
                    FirebaseHelper.user = authResult.user;
                    FirebaseHelper.userSet = true;
                    FirebaseHelper.updateToken();
                    return false;
                },
            },
            signInFlow: 'popup',
        });
    }

    public static updateToken() {
        const user = firebase.auth().currentUser;
        if (user) {
            user.getIdToken(true).then((idToken: string) => {
                this.token = idToken;
                console.log("Got token", this.token)
                Connection.init(idToken);
            }).catch(function (error: any) {
                console.error(error);
            });
        }
    }
}
