import { ModelStatic } from "sequelize";
import { Category, CategoryAttributes, CategoryCreationAttributes } from "../models/category";

export class CategoryRepository {
    private categoryModel: ModelStatic<Category>;

    constructor(categoryModel: ModelStatic<Category>) {
        this.categoryModel = categoryModel;
    }

    /** 🧩 Crear una nueva categoría */
    public async createCategory(data: CategoryCreationAttributes): Promise<Category> {
        return this.categoryModel.create(data);
    }

    /** 📦 Obtener todas las categorías */
    public async getAllCategories(): Promise<Category[]> {
        return this.categoryModel.findAll();
    }

    /** 🔍 Buscar categoría por nombre */
    public async findCategoryByName(name: string): Promise<Category | null> {
        return this.categoryModel.findOne({ where: { name } });
    }

    /** 🧱 Actualizar una categoría */
    public async updateCategory(id: number, data: Partial<CategoryAttributes>): Promise<[number, Category[]]> {
        return this.categoryModel.update(data, {
            where: { id },
            returning: true,
        });
    }

    /** 🗑️ Eliminar (lógicamente) una categoría */
    public async deleteCategory(id: number): Promise<number> {
        return this.categoryModel.destroy({ where: { id } });
    }
}
