import User from "./User";

export default class UserLoggedIn {
    public user: User;
    public token: string;

    constructor(user: User, token: string) {
        this.user = user;
        this.token = token;
    }
}
