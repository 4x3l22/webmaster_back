import { ModelStatic } from 'sequelize';
import { Product, ProductAttributes, ProductCreationAttributes } from '../models/product';

export class ProductRepository {
  private productModel: ModelStatic<Product>;

  constructor(productModel: ModelStatic<Product>) {
    this.productModel = productModel;
  }

  /** 🧩 Crear un nuevo producto */
  public async createProduct(data: ProductCreationAttributes): Promise<Product> {
    return this.productModel.create(data);
  }

  /** 📦 Obtener todos los productos */
  public async getAllProducts(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  /** 🔍 Buscar producto por nombre */
  public async findProductByName(name: string): Promise<Product | null> {
    return this.productModel.findOne({ where: { name } });
  }

  /** 🧱 Actualizar un producto */
  public async updateProduct(id: number, data: Partial<ProductAttributes>): Promise<[number, Product[]]> {
    return this.productModel.update(data, {
      where: { id },
      returning: true, // devuelve los registros actualizados (Postgres)
    });
  }

  /** 🗑️ Eliminar (lógicamente) un producto */
  public async deleteProduct(id: number): Promise<number> {
    return this.productModel.destroy({ where: { id } });
  }
}
