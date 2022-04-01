export class filtroProducto {
    private _active:boolean;
    private _name:string;
    private _categories: string[];
    private _brand:string;
  
    constructor(active:boolean, name:string, categories:string[], brand:string){
      this._active = active;
      this._name = name;
      this._categories = categories;
      this._brand = brand
    }
  
    get active():boolean{
      return this._active;
    }
  
    get name():string{
      return this._name;
    }
  
    get categories():string[]{
      return this._categories;
    }
  
    get brand(): string{
      return this._brand;
    }
  }
  