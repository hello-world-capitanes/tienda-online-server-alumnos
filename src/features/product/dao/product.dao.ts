import { BaseDAO } from "../../../core/dao/base.dao";
import { FileService } from "../../../core/services/file.service";
import { Product } from "../models/product";

export class ProductDAO extends BaseDAO {

    private readonly DATABASE_NAME = "product";
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
        return FileService.getInstance().readFile(this.DATABASE_PATH).then(users => (users as Product[]));
    }

/*     public async create(newProduct: Product): Promise<Product> {
        newProduct
        newProduct.active = true;
        newProduct.creationDate = new Date();
        // Delete deleteDate property
        Reflect.deleteProperty(newUser, 'deleteDate');
        const users = await this.getAll();
        users.push(newUser);
        return FileService.getInstance().writeFile(this.DATABASE_PATH, users).then(() => newUser);
    } */

    // public async update(Product: Product): Promise<Product> {
    //     const users = await this.getAll();
    //     const userIndex = users.findIndex(userDatabase => userDatabase?.email === user?.email);
    //     users[userIndex] = user;
    //     return FileService.getInstance().writeFile(this.DATABASE_PATH, users).then(() => user);
    // }

}