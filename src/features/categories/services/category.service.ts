import { CATEGORY_ERRORS } from './../utils/category.error';
import { CategoryDAO } from "../dao/category.dao";
import { Category } from "../model/category.model";

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

    public async findById(categoryId: string): Promise<Category | undefined> {
        
        if(!categoryId || categoryId?.length<=0){
            return Promise.reject(CATEGORY_ERRORS.id);
        }

        let categories : Category[] = [];

        try{    
            categories = await this.getAll();
        } catch(error){            
            console.error(error);
            return Promise.reject(CATEGORY_ERRORS.notFound);
        }
               
        return categories?.find(category => category.id === categoryId);

    }

  /*  public async findByEmail(email: string): Promise<Category | undefined> {

    }

    public async findById(categoryId: string): Promise<Category | undefined> {

    }

    public async create(newCategory: Category): Promise<any | null> {

    }

    public async set(category: Category): Promise<any | null> {

    }

    public async update(category: Category): Promise<any | null> {

    }

    public async delete(id: string): Promise<any | null> {

    } */

}