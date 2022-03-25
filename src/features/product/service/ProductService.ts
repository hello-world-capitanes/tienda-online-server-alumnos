import { Product } from "../models/product";
import { PRODUCT_ERRORS } from "../utils/product.errors";

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

  public async createProduct(product: Product): Promise<any | null>{

      if (!product || !product?.name || !product?.price || !product?.description){
          return Promise.reject(PRODUCT_ERRORS.notProvided);
      }

      const productFound = await this.findByName(product.name);

      if(!!productFound) {
          return Promise.reject(PRODUCT_ERRORS.alreadyExists);
      }

      return ProductDAO.getInstance().create(product);
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