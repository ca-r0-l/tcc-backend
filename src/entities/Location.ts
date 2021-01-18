import { v4 as uuidv4 } from "uuid";

export default class Location {
    public readonly id: string;
    public agvId: string;
    public origin: string;
    public positionNow: string;

    constructor(props: Omit<Location, "id">, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuidv4();
        }
    }

}
