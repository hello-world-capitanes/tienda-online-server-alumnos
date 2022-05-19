import admin from 'firebase-admin';

export abstract class FirestoreService {

     protected firestoreRef: admin.firestore.Firestore;
     
     constructor() {
          this.firestoreRef = admin.firestore();
     }

     abstract getCollection(): admin.firestore.CollectionReference;
     

}