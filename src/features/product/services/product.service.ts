import { ProductDAO } from "../dao/product.dao";
import { Product } from "../models/product.model";
import { PRODUCT_ERRORS } from "../utils/product.error";
import { ProductParser } from "../utils/product.parser";
var products = require('../data/products.json');
export class ProductService {
    
    private static _instance: ProductService;

    constructor() {
    }

    public static getInstance(): ProductService {
        return (!!ProductService._instance ? ProductService._instance : new ProductService());
    }

    public async getAll(): Promise<Product[]> {
        return ProductDAO.getInstance().getAll().then(products => {
            return products?.map(product => {
                return product;
            });
        });
    }
    public async update(product:Product): Promise<any | null> {
        if (!product) {
            return Promise.reject(PRODUCT_ERRORS.notProvided);
        } else if (!product?.id) {
            return Promise.reject(product.id);
        }

        const productFound = await this.findByID(product?.id);
        if (!productFound) {
            return Promise.reject(PRODUCT_ERRORS.notExists);
        }

        const productParsed = ProductParser.parse(productFound, product);

        return ProductDAO.getInstance().update(productParsed);
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
    public async findByID(userId: number): Promise<Product | undefined> {
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
  
      return product?.find(productDatabase => productDatabase.name === name);
    }
    public async set(product: Product): Promise<any | null> {
        if (!product) {
            return Promise.reject(PRODUCT_ERRORS.notProvided);
        } else {
            if (!product?.name || product?.name?.length <= 0) {
                return Promise.reject(PRODUCT_ERRORS.name.notProvided);
            }
        }

        const productFound = await this.findByID(product?.id);
        if (!productFound) {
            return Promise.reject(PRODUCT_ERRORS.notExists);
        }

        productFound.name = product.name;
        productFound.image = product.image;
        productFound.price = product.price;
        productFound.description = product.description;

        return ProductDAO.getInstance().update(productFound);
    }
  
}