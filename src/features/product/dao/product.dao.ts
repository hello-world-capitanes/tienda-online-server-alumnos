import { BaseDAO } from "../../../core/dao/base.dao";
import { FileService } from "../../../core/services/file.service";
import { Product } from "../models/product";

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

    public async create(newProduct: Product): Promise<Product> {
        newProduct.id = parseInt(BaseDAO.getId());

        const products = await this.getAll();
        products.push(newProduct);
        return FileService.getInstance().writeFile(this.DATABASE_PATH, products).then(() => newProduct);
    }

    // public async update(Product: Product): Promise<Product> {
    //     const users = await this.getAll();
    //     const userIndex = users.findIndex(userDatabase => userDatabase?.email === user?.email);
    //     users[userIndex] = user;
    //     return FileService.getInstance().writeFile(this.DATABASE_PATH, users).then(() => user);
    // }

}