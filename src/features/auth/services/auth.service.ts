import { UserAdmin } from './../models/user-admin';
import { IErrorAuth } from './../models/error-auth.model';
import admin from 'firebase-admin';
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';
import { UserAuthRegister } from '../models/user-auth-register.model';
import { USER_ERRORS } from "../utils/user.error";
import { UserAuth } from './../models/auth.model';
import { FirestoreService } from '../../../core/services/firestore.service';




export class AuthService extends FirestoreService {

    private readonly COLLECTION_ADMIN = "admin";

    private static _instance: AuthService;

    protected authRef: admin.auth.Auth;

    constructor() {
        super();
        this.authRef = admin.auth();
    }

    public static getInstance(): AuthService {
        return (!!AuthService._instance ? AuthService._instance : new AuthService());
    }

    getCollection(): admin.firestore.CollectionReference<admin.firestore.DocumentData> {
        return this.firestoreRef.collection(this.COLLECTION_ADMIN);
    }

    public async findByEmail(email: string): Promise<UserAuth | undefined> {
        if (!email || email?.length <= 0) {
            return Promise.reject(USER_ERRORS.notProvided);
        }
        
        try {
            return this.authRef.getUserByEmail(email).then(user => {
                if (!user) {
                    return Promise.reject(USER_ERRORS.notFound);
                }
                return new UserAuth(user.uid, user.email!, !user.disabled);
            });

        } catch (error) {
            console.error(error);
            return Promise.reject(USER_ERRORS.notFound);
        }
    }



    public async existCreatorAdmin(adminCreatorId: string): Promise<boolean> {
        if (!adminCreatorId || adminCreatorId?.length <= 0) {
            return Promise.reject(USER_ERRORS.notProvided);
        }

        return this.authRef.getUser(adminCreatorId).then(userAuth => {

            if (!userAuth || userAuth.disabled) {
                return Promise.reject(USER_ERRORS.notFound);
            }

            return this.getCollection().doc(userAuth.uid).get().then(user => {
                let userAdmin = user.data() as UserAdmin;
                return userAdmin.active
            });
        }).catch(error => {
            return Promise.reject(USER_ERRORS.notFound);
        });

    }

    public async createAdminAuth(newUserAuth: UserAuthRegister, adminCreatorId: string): Promise<UserAuth | undefined> {
        if (!newUserAuth || !newUserAuth?.email || newUserAuth?.email?.length <= 0) {
            return Promise.reject(USER_ERRORS.notProvided);
        }

        if (!newUserAuth?.password || newUserAuth?.password?.length <= 0) {
            return Promise.reject(USER_ERRORS.notProvided);
        }


        return this.findByEmail(newUserAuth?.email).then((userFound) => {
            if (!!userFound) {
                return Promise.reject(USER_ERRORS.alreadyExists);
            }

        }).catch((error) => {
            const errorAuth = error as IErrorAuth;
            if (errorAuth.message == USER_ERRORS.alreadyExists) {
                return Promise.reject(USER_ERRORS.alreadyExists);
            } else {

                return this.existCreatorAdmin(adminCreatorId).then(exist => {
                    if (!exist) {
                        return Promise.reject(USER_ERRORS.notFound);
                    }
                    const properties: CreateRequest = {
                        email: newUserAuth.email,
                        password: newUserAuth.password,
                    };
                    return this.authRef.createUser(properties).then(userRegistered => {
                        if (userRegistered) {
                            return new UserAuth(userRegistered.uid, userRegistered.email!, true);
                        }
                    });
                })
            }
        });
    }


    /* 
    public async delete(id: string): Promise<any | null> {
        if (!id || id?.length <= 0) {
            return Promise.reject(USER_ERRORS.notProvided);
        }
        
        const userFound = await this.findById(id);
        if (!userFound || !userFound?.active) {
            return Promise.reject(USER_ERRORS.notExists);
        } else {
            userFound.active = false;
            userFound.deleteDate = new Date();
            return UserDAO.getInstance().update(userFound);
        }
    } */

    /*     public async findById(authId: string): Promise<UserAuth | undefined> {
            if (!authId || authId?.length <= 0) {
                return Promise.reject(USER_ERRORS.notProvided);
            }
    
            try {
                return this.authRef.getUser(authId).then(user => {
                    if (!user) {
                        return Promise.reject(USER_ERRORS.notFound);
                    }
                    return new UserAuth(user.uid, user.email!, !user.disabled);
                });
    
            } catch (error) {
                console.error(error);
                return Promise.reject(USER_ERRORS.notFound);
            }
        } */

}