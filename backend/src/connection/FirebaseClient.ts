import * as admin from 'firebase-admin';
import DecodedIdToken = admin.auth.DecodedIdToken;
import {Player} from "common/Player";
import {PlayerSaveData} from "common/PlayerSaveData";
import {firestore} from "firebase-admin";
import CollectionReference = firestore.CollectionReference;
import {DatabaseClient} from "src/connection/DatabaseClient";
import {UserRecord} from "src/connection/UserRecord";

export class FirebaseClient implements DatabaseClient {

    private databaseURL: string = "https://lands-unknown-multiplayer.firebaseio.com/";
    private savesCollection: CollectionReference

    public async init() {
        const credentials = process.env.HEROKU ? JSON.parse(process.env.SERVICE_ACCOUNT_KEY) : require("../../serviceAccountKey.json")
        admin.initializeApp({
            credential: admin.credential.cert(credentials),
            databaseURL: this.databaseURL,
        });

        const firestore = admin.firestore()
        this.savesCollection = firestore.collection('saves');

    }

    public decodeToken(idToken: string): Promise<DecodedIdToken> {
        if (typeof idToken !== "string") {
            return;
        }
        return admin.auth().verifyIdToken(idToken);

    }

    public async getUserRecordFromToken(token: DecodedIdToken): Promise<UserRecord> {
        const firebaseRecord = await admin.auth().getUser(token.uid);
        return {
            userId: firebaseRecord.uid,
            userName: firebaseRecord.displayName,
        }
    }

    public async getUserRecord(idToken: string): Promise<UserRecord> {
        if (!idToken) {
            return null;
        }
        return this.decodeToken(idToken).then((token: DecodedIdToken) => {
            return this.getUserRecordFromToken(token);
        }).then(function (userRecord: UserRecord) {
            return userRecord;
        }).catch(function (error) {
            console.log(error.message);
            return null;
        });
    }

    async loadPlayerData(userId: string): Promise<PlayerSaveData | null> {
        const data = await this.savesCollection.doc(userId).get()
        return data.data() as PlayerSaveData;
    }

    async storePlayer(player: Player) {
        await this.savesCollection.doc(player.userId).set(player.save());
    }
}
