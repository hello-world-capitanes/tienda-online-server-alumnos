import { CategoryDAO } from "../dao/category.dao";
import { Category } from "../model/category.model";
import { CATEGORY_ERRORS } from "../utils/category.error";
export class CategoryService {
    
    private static _instance: CategoryService;

    constructor() {
    }

    public static getInstance(): CategoryService {
        return (!!CategoryService._instance ? CategoryService._instance : new CategoryService());
    }

    public async getAll(): Promise<Category[]> {
        return CategoryDAO.getInstance().getAll().then(categories=>{
            return categories?.map(category=>{
                return category;
            });
        });
    }

    public async findByName(name: string): Promise<Category | undefined>{
        if(!name || name?.length <= 0){
            return Promise.reject(CATEGORY_ERRORS.notProvided);
        }

        let categories: Category[] = [];
        try{
            categories = await this.getAll();
        }catch(e){
            console.error(e)
            return Promise.reject(CATEGORY_ERRORS.notFound);
        }
        return categories?.find(categoryDatabase => categoryDatabase.name === name);
    }

    public async create(newCategory: Category): Promise<any | null> {
        if(!newCategory || !newCategory?.name || newCategory?.name?.length <= 0){
            return Promise.reject(CATEGORY_ERRORS.notProvided);
        }
        const categoryFound = await this.findByName(newCategory?.name);
        if(!!categoryFound){
            return Promise.reject(CATEGORY_ERRORS.alreadyExists);
        }
        return CategoryDAO.getInstance().create(newCategory);
    }

/*  public async set(category: Category): Promise<any | null> {

    } */

    public async findById(categoryId: string): Promise<Category | undefined> {
        if(!categoryId || categoryId.length <= 0){
            return Promise.reject(CATEGORY_ERRORS.id);
        }

        let categories:Category[] = [];

        try{
            categories = await this.getAll();
        } catch(error){
            console.error(error);
            return Promise.reject(CATEGORY_ERRORS.notFound);
        }

        return categories?.find(category => category.id === categoryId);

    }

    public async update(category: Category): Promise<any | null> {
        if(!category){
            return Promise.reject(CATEGORY_ERRORS.notProvided);
        }
        else if(!category?.id){
            return Promise.reject(CATEGORY_ERRORS.id);
        }
        else if(!category.name){
            return Promise.reject(CATEGORY_ERRORS.name);
        }
        else if(!category.description){
            return Promise.reject(CATEGORY_ERRORS.description);
        }

        const categoryFound = await this.findById(category.id);

        if(!categoryFound){
            return Promise.reject(CATEGORY_ERRORS.notExists);
        }

        return CategoryDAO.getInstance().update(categoryFound);
    }

    public async delete(id: string): Promise<any | null> {
        if(!id || id.length <= 0){
            return Promise.reject(CATEGORY_ERRORS.id);
        }

        const categoryFound = await this.findById(id);

        if(!categoryFound){
            return Promise.reject(CATEGORY_ERRORS.notExists);
        }

        return CategoryDAO.getInstance().delete(categoryFound);

    }

}