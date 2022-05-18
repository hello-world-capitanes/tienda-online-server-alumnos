import { IUserAdmin } from "./interface-user-admin.model";

export class UserAdmin implements IUserAdmin{

    private _uid: string;
    private _email: string;
    private _creatorEmail: string;
    private _creationDate: Date;
    
    constructor(uid: string, email:string, creatorEmail:string, creationDate:Date){
        this._uid = uid;
        this._email = email;
        this._creatorEmail = creatorEmail;
        this._creationDate = creationDate;
    }
    
    public get uid(): string {
        return this._uid;
    }
    public set uid(value: string) {
        this._uid = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    
    public get creatorEmail(): string {
        return this._creatorEmail;
    }
    public set creatorEmail(value: string) {
        this._creatorEmail = value;
    }
    public get creationDate(): Date {
        return this._creationDate;
    }
    public set creationDate(value: Date) {
        this._creationDate = value;
    }
}