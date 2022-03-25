import { Application, Request, Response } from "express";
import { Routes } from "../../../core/routes/routes";
import { Category } from "../model/category.model";
//import { CategoryService } from "../services/category.service";

export class CategoryRoutes extends Routes {

    static readonly CATEGORY_ROUTE = "category";
    static readonly CATEGORIES_ROUTE = "categories";

    constructor(
        private app: Application,
    ) {
        super(CategoryRoutes.CATEGORY_ROUTE);
        this.app.get(`${this.route}`, this.get);
        this.app.get(this.getApiPath(CategoryRoutes.CATEGORIES_ROUTE), this.getAll);
        this.app.post(this.route, this.create);
        this.app.put(`${this.route}`, this.update);
        this.app.patch(`${this.route}`, this.partialUpdate);
        this.app.delete(`${this.route}`, this.delete);
    }

    private getAll(req: Request, res: Response) {
        
    }

    private get(req: Request, res: Response) {
        
    }

    private create(req: Request, res: Response) {
        
    }

    private update(req: Request, res: Response) {
        
    }

    private partialUpdate(req: Request, res: Response) {
        
    }

    private delete(req: Request, res: Response) {
        
    }
}