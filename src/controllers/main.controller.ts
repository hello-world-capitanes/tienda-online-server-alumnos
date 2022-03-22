import { Router, Request, Response } from "express";
import { IBaseController } from "./base-controller.interface";

export class MainController implements IBaseController {

    private path = '/';
    public router = Router();

    constructor() { }

    public initRoutes() {
        this.router.get(this.path, this.getRootPath);
    }

    private getRootPath(req: Request, res: Response) {
        res.sendStatus(200);
    }

}