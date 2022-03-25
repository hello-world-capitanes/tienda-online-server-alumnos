import { CategoryDAO } from "../dao/category.dao";
import { Category } from "../model/category.model";
import { CATEGORY_ERRORS } from "../utils/category.error";
import { CategoryParser } from "../utils/category.parser";

export class CategoryService {
    
    private static _instance: CategoryService;

    constructor() {
    }

    public static getInstance(): CategoryService {
        return (!!CategoryService._instance ? CategoryService._instance : new CategoryService());
    }

/*  public async getAll(): Promise<Category[]> {

    }

    public async findByEmail(email: string): Promise<Category | undefined> {

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