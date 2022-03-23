import { Application, Request, Response } from "express";
import { Routes } from "./routes";

export class HealthRoutes extends Routes {

    constructor(
        private app: Application,
    ) {
        super("health");
        this.app.get(this.route, this.defaultRoute);
        this.app.post(`${this.route}/json`, this.healthJson);
    }

    private defaultRoute(req: Request, res: Response) {
        res.status(200).send({});
    }

    private healthJson(req: Request, res: Response) {
        res.status(200).send({...req.body});
    }

}