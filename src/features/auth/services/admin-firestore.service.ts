import { IUserAdmin } from './../models/interface-user-admin.model';
import admin from 'firebase-admin';
import { FirestoreService } from '../../../core/services/firestore.service';
import { UserAuth } from './../models/auth.model';
import { UserAdmin } from './../models/user-admin';


export class AdminFirestoreService extends FirestoreService {

    private readonly COLLECTION = "admin";

    private static _instance: AdminFirestoreService;

    constructor() {
        super();
    }

    public static getInstance(): AdminFirestoreService {
        return (!!AdminFirestoreService._instance ? AdminFirestoreService._instance : new AdminFirestoreService());
    }

    getCollection(): admin.firestore.CollectionReference<admin.firestore.DocumentData> {
        return this.firestoreRef.collection(this.COLLECTION);
    }

    public async createAdminDB(newUserAdmin: UserAuth, adminCreatorId: string): Promise<IUserAdmin> {
        let userAdmin = new UserAdmin(
            newUserAdmin.uid,
            newUserAdmin.email,
            adminCreatorId,
            new Date,
            true
        );

        const firebaseUser =
        {
            uid: userAdmin.uid,
            email: userAdmin.email,
            creatorId: userAdmin.creatorId,
            creationDate: userAdmin.creationDate,
            active: userAdmin.active
        } as IUserAdmin;

        return this.getCollection().doc(userAdmin?.uid).set(Object.assign({}, firebaseUser)).then(() => {return firebaseUser}
        );
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

}