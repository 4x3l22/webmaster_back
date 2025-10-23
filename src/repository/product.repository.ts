import { ModelStatic } from 'sequelize';
import { Product, ProductAttributes, ProductCreationAttributes } from '../models/product';
import { Category } from '../models/category';
import { IProductRepository } from '../interface/IProductRepository';

export class ProductRepository implements IProductRepository {
  private productModel: ModelStatic<Product>;

  constructor(productModel: ModelStatic<Product>) {
    this.productModel = productModel;
  }

  public async createProduct(data: ProductCreationAttributes): Promise<Product> {
    return this.productModel.create(data);
  }

  public async getAllProducts(): Promise<Product[]> {
    return this.productModel.findAll({
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'description']
      }]
    });
  }

  public async findProductById(id: number): Promise<Product | null> {
    return this.productModel.findByPk(id, {
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'description']
      }]
    });
  }

  public async findProductByName(name: string): Promise<Product | null> {
    return this.productModel.findOne({ where: { name } });
  }

  public async updateProduct(id: number, data: Partial<ProductAttributes>): Promise<Product | null> {
    const product = await this.productModel.findByPk(id);
    if (!product) return null;
    
    await product.update(data);
    return product;
  }

  public async deleteProduct(id: number): Promise<number> {
    return this.productModel.destroy({ where: { id } });
  }
}
