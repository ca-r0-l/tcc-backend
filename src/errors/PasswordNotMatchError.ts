export default class PasswordNotMatchError extends Error {
    constructor(message: string) {
        super(message);
    }
}
