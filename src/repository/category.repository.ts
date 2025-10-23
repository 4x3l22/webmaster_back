import { ModelStatic } from "sequelize";
import { Category, CategoryAttributes, CategoryCreationAttributes } from "../models/category";
import { ICategoryRepository } from "../interface/ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {
    private categoryModel: ModelStatic<Category>;

    constructor(categoryModel: ModelStatic<Category>) {
        this.categoryModel = categoryModel;
    }

    public async createCategory(data: CategoryCreationAttributes): Promise<Category> {
        return this.categoryModel.create(data);
    }

    public async getAllCategories(): Promise<Category[]> {
        return this.categoryModel.findAll();
    }

    public async findCategoryById(id: number): Promise<Category | null> {
        return this.categoryModel.findByPk(id);
    }

    public async findCategoryByName(name: string): Promise<Category | null> {
        return this.categoryModel.findOne({ where: { name } });
    }

    public async updateCategory(id: number, data: Partial<CategoryAttributes>): Promise<Category | null> {
        const category = await this.categoryModel.findByPk(id);
        if (!category) return null;
        
        await category.update(data);
        return category;
    }

    public async deleteCategory(id: number): Promise<number> {
        return this.categoryModel.destroy({ where: { id } });
    }
}
