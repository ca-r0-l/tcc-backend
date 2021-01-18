import { v4 as uuidv4 } from "uuid";

export default class Rfid {
    public readonly id: string;
    public name: string;
    public location: string;
    public helixId: string;

    constructor(props: Omit<Rfid, "id">, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuidv4();
        }
    }

}
