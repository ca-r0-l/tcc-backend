import { v4 as uuidv4 } from "uuid";

export default class Route {
    public readonly id: string;
    public agvId: string;
    public startTime: number;
    public endTime: number;
    public rfidIdStart: string;
    public rfidIdEnd: string;

    constructor(props: Omit<Route, "id">, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuidv4();
        }
    }

}
