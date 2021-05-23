import * as admin from "firebase-admin";
import path from "path";

export default class BrokerService {
    private _admin: any;

    constructor() {
        this._admin = admin.initializeApp({
            credential: admin.credential.cert(path.resolve(__dirname, "..", "..", "app-agv-molis-firebase-adminsdk-afrx2-ddd1c88496.json"))
        });
     }

    public async receiveBrokerUpdate(msg: any): Promise<void> {
        const topic = "broker";

        const message = {
            data: { data: JSON.stringify(msg["data"]) },
            topic: topic
        };      
        
        console.log("\n\nMensagem =>" + JSON.stringify(message));
        
        await this._admin.messaging().send(message);
    }
}
