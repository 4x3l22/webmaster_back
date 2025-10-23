import { Category } from "../models/category";
import { CategoryResponseDTO } from "../interface/category.dto";

export class CategoryMapper {
  static toResponseDTO(category: Category): CategoryResponseDTO {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  static toResponseDTOList(categories: Category[]): CategoryResponseDTO[] {
    return categories.map(category => this.toResponseDTO(category));
  }
}
