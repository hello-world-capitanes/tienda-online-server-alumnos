var products = require('../data/products.json');

export class ProductService {
  private static _productService: ProductService;

  constructor() {}

  public static getInstance() {
    return !!ProductService._productService
      ? ProductService._productService
      : new ProductService();
  }

  getAllProducts(): JSON{
    return products;
  }

  createProduct(product: JSON): string{

      return "Se ha creado el producto: "+ product;
  }

  getProduct(ID: number): string{
      
      let elemento: any;
      for (let i=0; i < products.length; i++){

          if(ID == products[i].nombre){
              elemento = products[i];
              break;
          }
      }

      return "El producto es el siguiente: \n" +  elemento;

  }

  /*  añadir mas funciones */

}