import { Application, Request, Response } from "express";
import { Routes } from "../../../core/routes/routes";
import { ProductService } from "../service/ProductService";

export class ProductRoutes extends Routes {

    static readonly USER_ROUTE = "product";
    static readonly USERS_ROUTE = "products";

    constructor(
        private app: Application,
    ) {
        super(ProductRoutes.USER_ROUTE);
        this.app.get(`${this.route}`, this.get);
        this.app.get(this.getApiPath(ProductRoutes.USERS_ROUTE), this.getAll);
        // this.app.post(this.route, this.create);
        // this.app.put(`${this.route}`, this.update);
        // this.app.patch(`${this.route}`, this.partialUpdate);
        // this.app.delete(`${this.route}`, this.delete);
    }

    private getAll(req: Request, res: Response) {
        ProductService.getInstance().getAll().then((users => {
            res.status(200).send(users);
        })).catch(error => {
            res.status(500).send(error);
        });
    }

    private get(req: Request, res: Response) {
        const { id, nombre } = req?.query;

        const hasProductId = (!!id && typeof(id) === "number");
        const hasProductEmail = (!!nombre && typeof(nombre) === "string" && nombre?.length > 0);

        let productOperation;
        if (!hasProductId && !hasProductEmail) {
            return res.status(400).send("User id not provided");
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
        })).catch(error => {
            res.status(500).send(error);
        });
    }

    // private create(req: Request, res: Response) {
    //     const user = req?.body?.user as User;

    //     if (!user) {
    //         return res.status(400).send("No user provided");
    //     }

    //     UserService.getInstance().create(user).then((user => {
    //         res.status(200).send(user);
    //     })).catch(error => {
    //         res.status(500).send(error);
    //     });
    //     /*
    //     try {
    //         const userCreate = await UserService.getInstance().create(user);
    //     } catch(error) {
    //         return res.status(400).send("No user provided");
    //     }
    //     */
    // }

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

    // private delete(req: Request, res: Response) {
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
