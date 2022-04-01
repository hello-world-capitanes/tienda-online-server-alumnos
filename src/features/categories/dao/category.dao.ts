import { filtroProducto } from './../../product/models/filtroProducto';
import { Category } from './../model/category.model';
import { BaseDAO } from "../../../core/dao/base.dao";
import { FileService } from "../../../core/services/file.service";
//Include this to load .json in build
import categoriesJson from "../data/categories.json";

export class CategoryDAO extends BaseDAO {

    private readonly DATABASE_NAME = "categories";
    private readonly DATABASE_FILE = `${this.DATABASE_NAME}.json`;
    private readonly DATABASE_PATH = `../../features/categories/data/${this.DATABASE_FILE}`;

    private static _instance: CategoryDAO;

    constructor() {
        super();
    }

    public static getInstance(): CategoryDAO {
        return (!!CategoryDAO._instance ? CategoryDAO._instance : new CategoryDAO());
    }

    public async getAll(): Promise<Category[]> {
        return FileService.getInstance().readFile(this.DATABASE_PATH).then(categories => (categories as Category[]));
    }

    public async create(newCategory: Category): Promise<Category> {
        newCategory.id = BaseDAO.getId();
        const categories = await this.getAll();
        categories.push(newCategory);
        return FileService.getInstance().writeFile(this.DATABASE_PATH, categories).then(() => newCategory);
    }

    public async update(category: Category): Promise<Category> {
        const catergories = await this.getAll();
        const categoryIndex = catergories.findIndex(categoryDatabase => categoryDatabase?.id === category?.id);
        catergories[categoryIndex] = category;
        return FileService.getInstance().writeFile(this.DATABASE_PATH, category).then(() => category);
    }

    public async delete(category: Category): Promise<Category> {
        const catergories = await this.getAll();
        const categoryIndex = catergories.findIndex(categoryDatabase => categoryDatabase?.id === category?.id);
        catergories.splice(categoryIndex,1);
        return FileService.getInstance().writeFile(this.DATABASE_PATH, catergories).then(() => category);
    }

}