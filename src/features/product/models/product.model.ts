import { Category } from './../../categories/model/category.model';
export class Product {
  private _id: string;
  private _name: string;
  private _image: string;
  private _price: number;
  private _description?: string | undefined;
  private _active: boolean;
  private _category: string|undefined;
/*   private _categories: CategoryIdFilter[];
  private _marca: string */

  constructor(
    name: string,
    image: string,
    price: number,
    description?: string,
    category?:string,
  ) {
    this._id = "";
    this._name = name;
    this._image = image;
    this._price = price;
    this._active = true;
    if (!!description && description.length > 0) {
      this._description = description;
    }
    if (!!category && category.length > 0) {
      this._category = category;
    }
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get image(): string {
    return this._image;
  }
  public set image(value: string) {
    this._image = value;
  }
  public get price(): number {
    return this._price;
  }
  public set price(value: number) {
    this._price = value;
  }
  public get description(): string | undefined {
    return this._description;
  }
  public set description(value: string | undefined) {
    this._description = value;
  }
  get active(): boolean {
    return this._active;
  }
   set active(value: boolean) {
    this._active = value;
  }
  public get category(): string | undefined {
    return this._category;
  }
  public set category(value: string | undefined) {
    this._category = value;
  }
}
