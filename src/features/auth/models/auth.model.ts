export class UserAuth{

    private _uid: string;
    private _email: string;
    private _active: boolean;
    
    constructor(uid:string, email:string, active:boolean){
        this._uid = uid;
        this._email = email;
        this._active = active;
    }
    
    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get uid(): string {
        return this._uid;
    }
    public set uid(value: string) {
        this._uid = value;
    }
    
}