import { IUserAdmin } from './../models/interface-user-admin.model';
import { UserAdmin } from './../models/user-admin';
import { AdminFirestoreService } from './../services/admin-firestore.service';
import { UserAuthRegister } from './../models/user-auth-register.model';
import { Application, Request, Response } from "express";
import { Routes } from "../../../core/routes/routes";
import { User } from "../../user/models/user.model";
import { AuthService } from "../services/auth.service";


export class AuthRoutes extends Routes {

    static readonly AUTH_ROUTE = "auth";

    constructor(
        private app: Application,
    ) {
        super(AuthRoutes.AUTH_ROUTE);
       // this.app.get(this.route, this.get);
        this.app.post(this.route, this.create);
      //  this.app.delete(`${this.route}`, this.delete);
    }

    
    // Create Admin
    private create(req: Request, res: Response) {        
        const user = req?.body?.user as UserAuthRegister;
        const adminCreatorId = req?.body?.adminCreatorId;
        
        if (!user) {
            return res.status(400).send("No user provided");
        }
        
        //this.http.post(url, { user: {}}).subscribe
        
        AuthService.getInstance().createAdminAuth(user, adminCreatorId).then((userAuth => {

            if (!userAuth) {
                return res.status(400).send("No user provided");
            }
            
            AdminFirestoreService.getInstance().createAdminDB(userAuth, adminCreatorId).then((userAdmin => {
                res.status(200).send(userAdmin);
            })).catch(error => {
                res.status(500).send(error);
            });
        })).catch(error => {
            res.status(500).send(error);
        });
    }
    
    // Create Regular User
    
    
    /*     
    private createAdminDB(req: Request, res: Response) {
        const user = req?.body?.user as UserAdmin;
        
        if (!user) {
            return res.status(400).send("No user provided");
        }

        AdminFirestoreService.getInstance().createAdminDB(user).then((user => {
            res.status(200).send(user);
        })).catch(error => {
            res.status(500).send(error);
        });
    } */

    


    /*     private delete(req: Request, res: Response) {
        const user = req?.body?.user as User;

        if (!user) {
            return res.status(400).send("No user provided");
        }
        
        AuthService.getInstance().update(user).then((user => {
            res.status(200).send(user);
        })).catch(error => {
            res.status(500).send(error);
        });
    } */
    
    /*     private get(req: Request, res: Response) {
            const { id, email } = req?.query;
    
            const hasUserId = (!!id && typeof(id) === "string" && id?.length > 0);
            const hasUserEmail = (!!email && typeof(email) === "string" && email?.length > 0);
    
            let userOperation;
            if (!hasUserId && !hasUserEmail) {
                return res.status(400).send("User id not provided");
            } else if (hasUserId) {
                userOperation = AuthService.getInstance().findById(id);
            } else if (hasUserEmail) {
                userOperation = AuthService.getInstance().findByEmail(email);
            }
    
            userOperation?.then((user => {
                if (!!user) {
                    res.status(200).send(user);
                } else {
                    res.status(404).send("User not found");
                }
            })).catch(error => {
                res.status(500).send("Error user");
            });
        } */
}