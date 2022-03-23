import { Request, Response, Application } from "express";
import { Routes } from "./routes";

export class MainRoutes extends Routes {

    constructor(
        private app: Application,
    ) {
        super("");
        this.app.get(this.route, this.defaultRoute);
    }

    private defaultRoute(req: Request, res: Response) {
        res.sendStatus(200);
    }

}