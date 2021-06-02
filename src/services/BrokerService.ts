import * as admin from "firebase-admin";
import path from "path";
import AgvService from "../usecases/AgvService";
import HelixService from "./HelixService";

export default class BrokerService {
    private _admin: any;

    constructor(private agvService: AgvService, private helixService: HelixService) {
        this._admin = admin.initializeApp({
            credential: admin.credential.cert(path.resolve(__dirname, "..", "..", "app-agv-molis-firebase-adminsdk-afrx2-ddd1c88496.json"))
        });
     }

    public async receiveBrokerUpdate(msg: BrokerUpdateHelix): Promise<void> {
        const alarm = msg.data[0].alarm;
        const id = msg.data[0].id;
        const location = msg.data[0].location;
        const voltage = msg.data[0].voltage;
        await this.agvService.updateLocationAndBattery(
            id,
            location,
            voltage);
                
        const message = {
            data: { data: "update"},
            topic: "broker"
        };

        // Menos de 30% e alarme ligado -> não faz nada
        // Menos de 30% e alarme desligado -> liga alarme
        // Mais de 30% e alarme desligado -> não faz nada
        // Mais de 30% e alarme ligado -> desliga alarme
        const percentage = this.calculatePercentage(voltage);

        if (alarm === "off" && percentage <= 30) {
            console.log(`\n\nEnviando request para ligar o alarme - alarme: ${JSON.stringify(alarm)} - porcentagem: ${JSON.stringify(percentage)}\n\n`)
            await this.helixService.setAlarmOn(id);
        }

        if (alarm === "on" && percentage > 30) {
            console.log(`\n\nEnviando request para desligar o alarme - alarme: ${JSON.stringify(alarm)} - porcentagem: ${JSON.stringify(percentage)}\n\n`)
            await this.helixService.setAlarmOff(id);
        }

        console.log(`\n\n${JSON.stringify(msg)}\n\n`)
        await this._admin.messaging().send(message);
    }

    private calculatePercentage(voltage: number): number {
        const total = 8.4;
        const minimium = 5.2;
        return (voltage * 100) / total;
    }
}

interface BrokerUpdateHelix {
    data: [
        {
            id: string,
            type: string,
            TimeInstant: string,
            location: string,
            voltage: number,
            alarm: string
        }
    ]
}