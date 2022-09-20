import * as admin from 'firebase-admin';
import DecodedIdToken = admin.auth.DecodedIdToken;
import UserRecord = admin.auth.UserRecord;
import {Player} from "common/Player";
import {PlayerSaveData} from "common/PlayerSaveData";
import {firestore} from "firebase-admin";
import CollectionReference = firestore.CollectionReference;

export class FirebaseHelper {

    private static databaseURL: string = "https://lands-unknown-multiplayer.firebaseio.com/";
    private static savesCollection: CollectionReference

    public static async init() {
        const credentials = process.env.HEROKU ? JSON.parse(process.env.SERVICE_ACCOUNT_KEY) : require("../../serviceAccountKey.json")
        admin.initializeApp({
            credential: admin.credential.cert(credentials),
            databaseURL: this.databaseURL,
        });

        const firestore = admin.firestore()
        this.savesCollection = firestore.collection('saves');

    }

    public static decodeToken(idToken: string): Promise<DecodedIdToken> {
        if (typeof idToken !== "string") {
            return;
        }
        return admin.auth().verifyIdToken(idToken);

    }

    public static getUserRecordFromToken(token: DecodedIdToken): Promise<UserRecord> {
        return admin.auth().getUser(token.uid);
    }

    public static async getUserRecord(idToken: string): Promise<UserRecord> {
        if (!idToken) {
            return null;
        }
        return FirebaseHelper.decodeToken(idToken).then((token: DecodedIdToken) => {
            return FirebaseHelper.getUserRecordFromToken(token);
        }).then(function (userRecord: UserRecord) {
            return userRecord;
        }).catch(function (error) {
            console.log(error.message);
            return null;
        });
    }

    static async loadPlayerData(userId: string): Promise<PlayerSaveData | null> {
        const data = await this.savesCollection.doc(userId).get()
        return data.data() as PlayerSaveData;
    }

    static storePlayer(player: Player) {
        this.savesCollection.doc(player.userId).set(player.save());
    }
}
