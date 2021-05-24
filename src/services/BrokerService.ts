import * as admin from "firebase-admin";
import path from "path";
import AgvService from "../usecases/AgvService";

export default class BrokerService {
    private _admin: any;

    constructor(private agvService: AgvService) {
        this._admin = admin.initializeApp({
            credential: admin.credential.cert(path.resolve(__dirname, "..", "..", "app-agv-molis-firebase-adminsdk-afrx2-ddd1c88496.json"))
        });
     }

    public async receiveBrokerUpdate(msg: BrokerUpdateHelix): Promise<void> {
        const topic = "broker";

        await this.agvService.updateLocationAndBattery(
            msg.data[0].id,
            msg.data[0].location,
            msg.data[0].voltage);

        const message = {
            data: "update",
            topic: topic
        };
        
        console.log("\n\n" + message)
        await this._admin.messaging().send(message);
    }
}

interface BrokerUpdateHelix {
    data: [
        {
            id: string,
            type: string,
            TimeInstant: string,
            location: string,
            voltage: number
        }
    ]
}