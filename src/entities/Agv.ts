import { v4 as uuidv4 } from "uuid";

export default class Agv {
    public readonly id: string;
    public name: string;
    public helixId: string;
    public batteryPercentage: number;

    constructor(props: Omit<Agv, "id">, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuidv4();
        }
    }
}
