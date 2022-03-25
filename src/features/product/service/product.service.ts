import { Product } from "../models/product";
import { PRODUCT_ERRORS } from "../utils/product.errors";
import { ProductDAO } from '../dao/product.dao';
var products = require('../data/products.json');

export class ProductService {
  private static _productService: ProductService;

  constructor() {}

  public static getInstance() {
    return !!ProductService._productService
      ? ProductService._productService
      : new ProductService();
  }

  public async getAll(): Promise<Product[]>
  {
    return ProductDAO.getInstance().getAll();
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
 
  public async findByID(userId: string): Promise<Product | undefined> {
    if (!userId) {
        return Promise.reject(PRODUCT_ERRORS.notProvided);
    }

    let products: Product[] = [];
    try {
      products = await this.getAll();
    } catch(error) {
      console.error(error);
      return Promise.reject(PRODUCT_ERRORS.notFound);
    }
    
    return products?.find(userDatabase => userDatabase.id === userId);
  } 

  public async findByName(name: string): Promise<Product | undefined> {
    if (!name || name?.length <= 0) {
      return Promise.reject(PRODUCT_ERRORS.notProvided);
    }

    let product: Product[] = [];
    try {
      product = await this.getAll();
    } catch (error) {
      console.error(error);
      return Promise.reject(PRODUCT_ERRORS.notFound);
    }

    return product?.find(userDatabase => userDatabase.name === name);
  }

/* 
   public async delete(name: string): Promise<any | null> {
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
  } */

  /*  añadir mas funciones */

}
