import { Application, Request, Response } from "express";
import { Routes } from "../../../core/routes/routes";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

export class UserRoutes extends Routes {

    static readonly USER_ROUTE = "user";
    static readonly USERS_ROUTE = "users";

    constructor(
        private app: Application,
    ) {
        super(UserRoutes.USER_ROUTE);
        this.app.post(this.route, this.postUser);
        this.app.get(this.getApiPath(UserRoutes.USERS_ROUTE), this.getUsers);
        this.app.get(`${this.route}/:id`, this.getUser);
    }

    private getUsers(req: Request, res: Response) {
        UserService.getInstance().getUsers().then((users => {
            res.status(200).send(users);
        })).catch(error => {
            res.status(500).send(error);
        });
    }

    private getUser(req: Request, res: Response) {
        const userId: string = req?.params?.id

        if (!userId || userId.length <= 0) {
            return res.status(400).send("User id not provided");
        }

        UserService.getInstance().getUsers().then((users => {
            const user = users.find(user => user.id === userId);
            if (!!user) {
                res.status(200).send(user);
            } else {
                res.status(404).send("User not found");
            }
        })).catch(error => {
            res.status(500).send(error);
        });
    }

    private postUser(req: Request, res: Response) {
        const user = req?.body?.user as User;

        if (!user) {
            return res.status(400).send("No user provided");
        }

        UserService.getInstance().createUser(user).then((user => {
            res.status(200).send(user);
        })).catch(error => {
            res.status(500).send(error);
        });
    }

}