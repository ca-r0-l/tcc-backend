export default class ZoneExistsError extends Error {
    constructor(message: string) {
        super(message);
    }
}
