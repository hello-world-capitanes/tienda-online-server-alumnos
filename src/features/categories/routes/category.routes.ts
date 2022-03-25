import { Application } from "express";
import { Routes } from "../../../core/routes/routes";
import { Category } from "../model/category.model";

export class CategoryRoutes extends Routes{

    static readonly CATEGORY_ROUTE = "category";
    static readonly CATEGORY_ROUTES = "categories";

    constructor(
        private app:Application,
    ){
        super(CategoryRoutes.CATEGORY_ROUTE);
        this.app.put(`${this.route}`, this.update);
        this.app.get(`${this.route}`, this.delete);
    }

    private update(req: Request, res: Response) {
        const category = req?.body?.category as Category;

        if (!category) {
            return res.status(400).send("No category provided");
        }

        CategoryService.getInstance().set(category).then((category => {
            res.status(200).send(category);
        })).catch(error => {
            res.status(500).send(error);
        });
    }

    private delete(req: Request, res: Response) {
        const category = req?.body?.category as Category;

        if (!category) {
            return res.status(400).send("No category provided");
        }

        CategoryService.getInstance().update(category).then((category => {
            res.status(200).send(category);
        })).catch(error => {
            res.status(500).send(error);
        });
    }
}