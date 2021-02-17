import { v4 as uuidv4 } from "uuid";

export default class Zone {
    public readonly id: string;
    public name: string;
    
    constructor(props: Omit<Zone, "id">, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuidv4();
        }
    }
}
