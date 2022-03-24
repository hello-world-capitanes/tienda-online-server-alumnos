export class User {

    private _id: string;
    private _email: string;
    private _name: string;
    private _lastname1: string;
    private _lastname2: string;
    private _active: boolean;
    private _creationDate: Date;
    private _deleteDate: Date;
    private _postalCode: number;

    constructor(
        id: string,
        email: string,
        name: string,
        lastname1: string,
        lastname2: string,
        active: boolean,
        creationDate: Date,
        deleteDate: Date,
        postalCode: number,
    ) {
        this._id = id;
        this._email = email;
        this._name = name;
        this._lastname1 = lastname1;
        this._lastname2 = lastname2;
        this._active = active;
        this._creationDate = creationDate;
        this._deleteDate = deleteDate;
        this._postalCode = postalCode;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get email(): string {
        return this._email;
    }

    get name(): string {
        return this._name;
    }

    get lastname1(): string {
        return this._lastname1;
    }

    get lastname2(): string {
        return this._lastname2;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }

    public get creationDate(): Date {
        return this._creationDate;
    }
    public set creationDate(value: Date) {
        this._creationDate = value;
    }

    public get deleteDate(): Date {
        return this._deleteDate;
    }
    public set deleteDate(value: Date) {
        this._deleteDate = value;
    }

    public get postalCode(): number {
        return this._postalCode;
    }
    public set postalCode(value: number) {
        this._postalCode = value;
    }

}
