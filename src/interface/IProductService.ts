import { CreateProductDTO, UpdateProductDTO, ProductWithCategoryDTO } from "./product.dto";

export interface IProductService {
  createProduct(data: CreateProductDTO): Promise<ProductWithCategoryDTO>;
  getAllProducts(): Promise<ProductWithCategoryDTO[]>;
  getProductById(id: number): Promise<ProductWithCategoryDTO>;
  getProductByName(name: string): Promise<ProductWithCategoryDTO>;
  updateProduct(id: number, data: UpdateProductDTO): Promise<ProductWithCategoryDTO>;
  deleteProduct(id: number): Promise<void>;
}
