import { BaseDAO } from "../../../core/dao/base.dao";
import { FileService } from "../../../core/services/file.service";
import { Product } from "../models/product.model";

export class ProductDAO extends BaseDAO {

    private readonly DATABASE_NAME = "products";
    private readonly DATABASE_FILE = `${this.DATABASE_NAME}.json`;
    private readonly DATABASE_PATH = `../../features/product/data/${this.DATABASE_FILE}`;

    private static _instance: ProductDAO;

    constructor() {
        super();
    }

    public static getInstance(): ProductDAO {
        return (!!ProductDAO._instance ? ProductDAO._instance : new ProductDAO());
    }

    public async getAll(): Promise<Product[]> {
        return FileService.getInstance().readFile(this.DATABASE_PATH).then(product => (product as Product[]));
    }

    public async update(product: Product): Promise<Product> {
        const products = await this.getAll();
        const productIndex = products.findIndex(productDatabase => productDatabase?.id === product?.id);
        products[productIndex] = product;
        return FileService.getInstance().writeFile(this.DATABASE_PATH, products).then(() => product);
    }
    public async create(newProduct: Product): Promise<Product> {
        newProduct.id = BaseDAO.getId();

        const products = await this.getAll();
        products.push(newProduct);
        return FileService.getInstance().writeFile(this.DATABASE_PATH, products).then(() => newProduct);
    }

     public async delete(product: Product): Promise<Product> {
        const products = await this.getAll();
        const productIndex = products.findIndex(productDatabase => productDatabase?.id === product?.id);
        products[productIndex] = product;
        return FileService.getInstance().writeFile(this.DATABASE_PATH, products).then(() => product);
    } 
}