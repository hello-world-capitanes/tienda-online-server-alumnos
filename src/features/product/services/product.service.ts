import { ProductDAO } from "../dao/product.dao";
import { Product } from "../models/product.model";
import { PRODUCT_ERRORS } from "../utils/product.error";
import { ProductParser } from "../utils/product.parser";

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
            return Promise.reject(product.id.notProvided);
        }

        const productFound = await this.findId(product?.id);
        if (!productFound || !productFound?.active) {
            return Promise.reject(PRODUCT_ERRORS.notExists);
        }

        const productParsed = ProductParser.parse(productFound, product);

        return ProductDAO.getInstance().update(productParsed);
    }
}