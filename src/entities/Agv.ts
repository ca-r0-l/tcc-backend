import { v4 as uuidv4 } from "uuid";
import Location from "./Location";
import Rfid from "./Rfid";

export default class Agv {
    public readonly id: string;
    public name: string;
    public helixId: string;
    public batteryPercentage: number;
    public location: Location;
    public pathToFollow: Rfid[];

    constructor(props: Omit<Agv, "id">, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuidv4();
        }
    }
}
