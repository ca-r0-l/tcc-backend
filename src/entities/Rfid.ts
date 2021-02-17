import { v4 as uuidv4 } from "uuid";
import Zone from "./Zone";

export default class Rfid {
    public readonly id: string;
    public name: string;
    public zone: Zone;
    public helixId: string;

    constructor(props: Omit<Rfid, "id">, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuidv4();
        }
    }
}
