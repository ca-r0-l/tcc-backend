import { v4 as uuidv4 } from "uuid";
import Zone from "./Zone";

export default class Agv {
    public readonly id: string;
    public name: string;
    public helixId: string;
    public batteryPercentage?: number = 0;
    public location?: string = null;
    public path?: Zone[] = null;

    constructor(props: Omit<Agv, "id">, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuidv4();
        }
    }
}
