export class Product {

    private _id: number;
    private _name: string;
    private _image: string;
    private _price: number;
    private _description: string;

    constructor(
        id: number,
        name: string,
        image: string,
        price: number,
        description: string,
    ) {
        this._id = id;
        this._name = name;
        this._image = image;
        this._price = price;
        this._description = description;
    }

    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }

    get image(): string {
        return this._image;
    }
    set image(value: string) {
        this._image = value;
    }

    get price(): number {
        return this._price;
    }
    set price(value: number) {
        this._price = value;
    }

    get description(): string {
        return this._description;
    }
    set description(value: string) {
        this._description = value;
    }

   

}
