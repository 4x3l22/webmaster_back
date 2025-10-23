import { Product, ProductAttributes, ProductCreationAttributes } from "../models/product";

export interface IProductRepository {
  createProduct(data: ProductCreationAttributes): Promise<Product>;
  getAllProducts(): Promise<Product[]>;
  findProductById(id: number): Promise<Product | null>;
  findProductByName(name: string): Promise<Product | null>;
  updateProduct(id: number, data: Partial<ProductAttributes>): Promise<Product | null>;
  deleteProduct(id: number): Promise<number>;
}
