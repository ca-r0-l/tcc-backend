export default class EmailNotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}
