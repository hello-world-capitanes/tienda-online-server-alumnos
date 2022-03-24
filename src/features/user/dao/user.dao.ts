import { BaseDAO } from "../../../core/dao/base.dao";
import { FileService } from "../../../core/services/file.service";
import { User } from "../models/user.model";

export class UserDAO extends BaseDAO {

    private readonly DATABASE_NAME = "users";
    private readonly DATABASE_FILE = `${this.DATABASE_NAME}.json`;
    private readonly DATABASE_PATH = `../../features/user/data/${this.DATABASE_FILE}`

    private static _instance: UserDAO;

    constructor() {
        super();
    }

    public static getInstance(): UserDAO {
        return (!!UserDAO._instance ? UserDAO._instance : new UserDAO());
    }

    public async getUsers(): Promise<any> {
        return FileService.getInstance().readFile(this.DATABASE_PATH);
    }

    public async createUser(newUser: User): Promise<User> {
        newUser.id = BaseDAO.getId();
        newUser.active = true;
        newUser.creationDate = new Date();
        const users = await this.getUsers();
        users.push(newUser);
        return FileService.getInstance().writeFile(this.DATABASE_PATH, users).then(() => newUser);
    }

}