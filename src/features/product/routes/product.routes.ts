import { Application, Request, Response } from "express";
import { Routes } from "../../../core/routes/routes";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";

export class ProductRoutes extends Routes {

    static readonly PRODUCT_ROUTE = "product";
    static readonly PRODUCTS_ROUTE = "products";

    constructor(
        private app: Application,
    ) {
        super(ProductRoutes.PRODUCT_ROUTE);
 
        this.app.get(this.getApiPath(ProductRoutes.PRODUCTS_ROUTE), this.getAll);
   
        this.app.put(`${this.route}`, this.update);
        this.app.patch(`${this.route}`, this.partialUpdate);
    
    }

    private getAll(req: Request, res: Response) {
        ProductService.getInstance().getAll().then((products => {
            res.status(200).send(products);
        })).catch(error => {
            res.status(500).send(error);
        });
    }

    private update(req: Request, res: Response) {
        const product = req?.body?.product as Product;

        if (!product) {
            return res.status(400).send("No product provided");
        }

        ProductService.getInstance().set(product).then((product => {
            res.status(200).send(product);
        })).catch(error => {
            res.status(500).send(error);
        });
    }

    private partialUpdate(req: Request, res: Response) {
        const product = req?.body?.product as Product;

        if (!product) {
            return res.status(400).send("No user provided");
        }

        ProductService.getInstance().update(product).then((product => {
            res.status(200).send(product);
        })).catch(error => {
            res.status(500).send(error);
        });
    }

}