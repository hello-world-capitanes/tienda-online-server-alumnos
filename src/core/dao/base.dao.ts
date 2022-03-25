export class BaseDAO {

    constructor() {
    }

    protected static getId(): string {
        return Math.random().toString(36).substring(2, 9);
    }

}