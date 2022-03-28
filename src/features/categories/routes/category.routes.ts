import { Application, Request, Response } from "express";
import { Routes } from "../../../core/routes/routes";
import { CategoryService } from "../services/category.service";
import { Category } from './../model/category.model';

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
        CategoryService.getInstance().getAll().then((categories => {
            res.status(200).send(categories);
        })).catch(error => {
            res.status(500).send(error);
        });
    }

    private get(req: Request, res: Response) {
        const {id} = req?.query;
        

        const hasCategoryId = (!!id && typeof(id) === "string" && id?.length > 0);

        let categoryOperation;
        if (!hasCategoryId && !hasCategoryId) {
            return res.status(400).send("Category id not provided");
        } else if (hasCategoryId) {
            categoryOperation = CategoryService.getInstance().findById(id);            
        }

        categoryOperation?.then((category => {

            if (!!category) {
                res.status(200).send(category);
            } else {
                res.status(404).send("Category not found");
            }
        })).catch(error => {
            res.status(500).send(error);
        });
        
    }

    private create(req: Request, res: Response) {
        const category = req?.body?.category as Category;
        if(!category){
            return res.status(400).send("No category provided");
        }
        CategoryService.getInstance().create(category).then((category => {
            res.status(200).send(category);
        })).catch(e => {
            res.status(500).send(e);
        })
    }

    private update(req: Request, res: Response) {
        const category = req?.body?.category as Category;

        if(!category){
            
            return res.status(400).send("No category provided");
        }

        CategoryService.getInstance().update(category).then((category => {
            res.status(200).send(category);
        })).catch(error => {
            res.status(500).send(error);
        })
    }

    private partialUpdate(req: Request, res: Response) {
        
    }

    private delete(req: Request, res: Response) {
        const category = req?.body?.category as Category;

        if(!category){
            return res.status(400).send("No category provided");
        }
        CategoryService.getInstance().delete(category.id).then((category => {
            res.status(200).send(category);
        })).catch(error => {
            res.status(500).send(error);
        })
    }
}