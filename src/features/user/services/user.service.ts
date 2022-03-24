import { UserDAO } from "../dao/user.dao";
import { User } from "../models/user.model";

export class UserService {
    
    private static _instance: UserService;

    constructor() {
    }

    public static getInstance(): UserService {
        return (!!UserService._instance ? UserService._instance : new UserService());
    }

    public async getUsers(): Promise<User[]> {
        return UserDAO.getInstance().getUsers().then(users => {
            return (users as User[]).map(user => {
                user.creationDate = (!!user.creationDate ? new Date(user.creationDate) : user.creationDate);
                user.deleteDate = (!!user.deleteDate ? new Date(user.deleteDate) : user.deleteDate);
                return user;
            });
        });
    }

    public async createUser(newUser: User): Promise<any | null> {
        if (!newUser || !newUser?.email || newUser?.email?.length <= 0) {
            return Promise.reject("No user provided");
        }

        const userFound = await this.findUserByEmail(newUser);

        if (!userFound) {
            return UserDAO.getInstance().createUser(newUser);
        } else {
            throw new Error("User already exists");
        }
    }

    public async findUserByEmail(user: User): Promise<User | undefined> {
        if (!user || !user?.email || user?.email?.length <= 0) {
            return Promise.reject("No user provided");
        }

        let users: User[] = [];
        try {
            users = await this.getUsers();
        } catch(error) {
            console.error(error);
        }
        
        return users?.find(userDatabase => userDatabase.email === user.email);
    }

}