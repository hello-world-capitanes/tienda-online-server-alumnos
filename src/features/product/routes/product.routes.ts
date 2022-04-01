import { Application, Request, Response } from "express";
import { Routes } from "../../../core/routes/routes";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";

export class ProductRoutes extends Routes {

    static readonly PRODUCT_ROUTE = "product";
    static readonly PRODUCTS_ROUTE = "products";
    static readonly PRODUCTS_ROUTE_FILTER = "productsFiltered";

    constructor(
        private app: Application,
    ) {
        super(ProductRoutes.PRODUCT_ROUTE);
        this.app.get(this.route, this.get);
        this.app.get(this.getApiPath(ProductRoutes.PRODUCTS_ROUTE), this.getAll);
        this.app.get(this.getApiPath(ProductRoutes.PRODUCTS_ROUTE_FILTER), this.getByFilter);
        this.app.post(this.route, this.create);
        // this.app.post(this.route, this.create);
        // this.app.put(`${this.route}`, this.update);
        // this.app.patch(`${this.route}`, this.partialUpdate);
        // this.app.delete(`${this.route}`, this.delete);
 
   
        this.app.put(`${this.route}`, this.update);
        
    
    }

     private getAll(req: Request, res: Response) {
        ProductService.getInstance().getAll().then((products => {
            res.status(200).send(products);
        })).catch(error => {
            res.status(500).send(error);
        });
    } 
    private getByFilter(req: Request, res: Response) {
        const {category} = req?.query;

        const hasProductCategory = (!!category && typeof(category) === "string" && category?.length > 0);

        let productOperation;
        if (!hasProductCategory) {
            return res.status(400).send("Product category not provided");
        } else{
            productOperation = ProductService.getInstance().filterByCategory(category);
        }

        productOperation?.then((product => {
            if (!!product) {
                res.status(200).send(product);
            } else {
                res.status(404).send("Product not found");
            }
        }))
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
    
    private get(req: Request, res: Response) {
        const { id, nombre} = req?.query;

        const hasProductId = (!!id && typeof(id) === "string");
        const hasProductEmail = (!!nombre && typeof(nombre) === "string" && nombre?.length > 0);

        let productOperation;
        if (!hasProductId && !hasProductEmail) {
            return res.status(400).send("Product id not provided");
        } else if (hasProductId) {
            productOperation = ProductService.getInstance().findByID(id);
        } else if (hasProductEmail) {
            productOperation = ProductService.getInstance().findByName(nombre);
        }

        productOperation?.then((product => {
            if (!!product) {
                res.status(200).send(product);
            } else {
                res.status(404).send("Product not found");
            }
        }))
    }

    private create(req: Request, res: Response) {
        const product = req?.body as Product;

        if (!product) {
            return res.status(400).send("No product provided");
        }

        ProductService.getInstance().createProduct(product).then((product => {
            res.status(200).send(product);
        })).catch(error => {
            res.status(500).send(error);
        });
    }

         private delete(req: Request, res: Response) {
         const product = req?.body?.user as Product;

         if (!product) {
             return res.status(400).send("No user provided");
         }

         ProductService.getInstance().update(product).then((product => {
             res.status(200).send(product);
         })).catch(error => {
             res.status(500).send(error);
         });
     }

    // private update(req: Request, res: Response) {
    //     const user = req?.body?.user as User;

    //     if (!user) {
    //         return res.status(400).send("No user provided");
    //     }

    //     UserService.getInstance().set(user).then((user => {
    //         res.status(200).send(user);
    //     })).catch(error => {
    //         res.status(500).send(error);
    //     });
    // }

    // private partialUpdate(req: Request, res: Response) {
    //     const user = req?.body?.user as User;

    //     if (!user) {
    //         return res.status(400).send("No user provided");
    //     }

    //     UserService.getInstance().update(user).then((user => {
    //         res.status(200).send(user);
    //     })).catch(error => {
    //         res.status(500).send(error);
    //     });
    // }
}
    

    

