import { v4 as uuidv4 } from "uuid";
import { Role } from "./Role";

export default class User {
    public readonly id: string;
    public name: string;
    public department: string;
    public role: Role;
    public email: string;
    public password: string;

    constructor(props: Omit<User, "id">, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuidv4();
        }
    }
}
