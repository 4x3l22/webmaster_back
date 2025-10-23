import { Product } from "../models/product";
import { ProductResponseDTO, ProductWithCategoryDTO } from "../interface/product.dto";

export class ProductMapper {
  static toResponseDTO(product: Product): ProductResponseDTO {
    return {
      id: product.id,
      name: product.name,
      categoryId: product.categoryId,
      price: Number(product.price),
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toResponseDTOList(products: Product[]): ProductResponseDTO[] {
    return products.map(product => this.toResponseDTO(product));
  }

  static toProductWithCategoryDTO(product: any): ProductWithCategoryDTO {
    return {
      id: product.id,
      name: product.name,
      categoryId: product.categoryId,
      price: Number(product.price),
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      category: {
        id: product.category?.id,
        name: product.category?.name,
        description: product.category?.description,
      },
    };
  }

  static toProductWithCategoryDTOList(products: any[]): ProductWithCategoryDTO[] {
    return products.map(product => this.toProductWithCategoryDTO(product));
  }
}
