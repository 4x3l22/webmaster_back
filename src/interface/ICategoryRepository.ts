import { Category, CategoryAttributes, CategoryCreationAttributes } from "../models/category";

export interface ICategoryRepository {
  createCategory(data: CategoryCreationAttributes): Promise<Category>;
  getAllCategories(): Promise<Category[]>;
  findCategoryById(id: number): Promise<Category | null>;
  findCategoryByName(name: string): Promise<Category | null>;
  updateCategory(id: number, data: Partial<CategoryAttributes>): Promise<Category | null>;
  deleteCategory(id: number): Promise<number>;
}
