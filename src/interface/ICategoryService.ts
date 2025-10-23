import { CreateCategoryDTO, UpdateCategoryDTO, CategoryResponseDTO } from "./category.dto";

export interface ICategoryService {
  createCategory(data: CreateCategoryDTO): Promise<CategoryResponseDTO>;
  getAllCategories(): Promise<CategoryResponseDTO[]>;
  getCategoryById(id: number): Promise<CategoryResponseDTO>;
  getCategoryByName(name: string): Promise<CategoryResponseDTO>;
  updateCategory(id: number, data: UpdateCategoryDTO): Promise<CategoryResponseDTO>;
  deleteCategory(id: number): Promise<void>;
}
