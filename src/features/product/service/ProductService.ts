import { Product } from "../models/product";
import { PRODUCT_ERRORS } from "../utils/product.errors";
import { ProductDAO } from './../dao/product.dao';
var products = require('../data/products.json');

export class ProductService {
  private static _productService: ProductService;

  constructor() { }

  public static getInstance() {
    return !!ProductService._productService
      ? ProductService._productService
      : new ProductService();
  }

  public async getAll(): Promise<Product[]> {
    return ProductDAO.getInstance().getAll();
  }

  /*    public async createProduct(product: Product): Promise<any | null>{
  
        if (!product || !product?.name || !product?.price || !product?.description){
            return Promise.reject(PRODUCT_ERRORS.notProvided);
        }
  
        const productFound = await this.findByName(product.name);
  
        if(!!productFound) {
            return Promise.reject(PRODUCT_ERRORS.alreadyExists);
        }
  
        return ProductDAO.getInstance().create(product);
    } */

  getProduct(ID: number): string {

    let elemento: any;
    for (let i = 0; i < products.length; i++) {

      if (ID == products[i].nombre) {
        elemento = products[i];
        break;
      }
    }

    return "El producto es el siguiente: \n" + elemento;

  }

  /*  añadir mas funciones */

  public async findByName(name: string): Promise<Product | undefined> {
    if (!name || name?.length <= 0) {
      return Promise.reject(PRODUCT_ERRORS.notProvided);
    }

    let users: Product[] = [];
    try {
      users = await this.getAll();
    } catch (error) {
      console.error(error);
      return Promise.reject(PRODUCT_ERRORS.notFound);
    }

    return users?.find(userDatabase => userDatabase.name === name);
  }

/*   public async delete(name: string): Promise<any | null> {
    if (!name || name?.length <= 0) {
      return Promise.reject(PRODUCT_ERRORS.notProvided);
    }

    const productFound = await this.findByName(name);
    if (!productFound || !productFound?.active) {
      return Promise.reject(PRODUCT_ERRORS.notExists);
    } else {
      productFound.active = false;
      productFound.deleteDate = new Date();
      return ProductDAO.getInstance().update(productFound);
    }
  }
} */