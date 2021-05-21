import * as admin from "firebase-admin";
import path from "path";

export default class BrokerService {
    private _admin: any;

    constructor() {
        this._admin = admin.initializeApp({
            credential: admin.credential.cert(path.resolve(__dirname, "..", "..", "app-agv-molis-firebase-adminsdk-afrx2-ddd1c88496.json"))
        });
     }

    public async receiveBrokerUpdate(): Promise<void> {
        const topic = "update";

        const message = {
            data: {
                msg: "hello world"
            },
            topic: topic
        };
                        
        await this._admin.messaging().send(message);
    }
}
