import { IUserAdmin } from "./interface-user-admin.model";

export class UserAdmin implements IUserAdmin{

    private _uid: string;
    private _email: string;
    private _creatorId: string;
    private _creationDate: Date;
    private _active: boolean;
    
    
    constructor(uid: string, email:string, creatorId:string, creationDate:Date, active:boolean){
        this._uid = uid;
        this._email = email;
        this._creatorId = creatorId;
        this._creationDate = creationDate;
        this._active = active;
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
    
    public get creatorId(): string {
        return this._creatorId;
    }
    public set creatorId(value: string) {
        this._creatorId = value;
    }
    public get creationDate(): Date {
        return this._creationDate;
    }
    public set creationDate(value: Date) {
        this._creationDate = value;
    }

    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
    }

}