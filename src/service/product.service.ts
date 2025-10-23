import { ProductRepository } from '../repository/product.repository';
import { Product, ProductCreationAttributes, ProductAttributes } from '../models/product';
import { Database } from '../models';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    const db = Database.getInstance();
    this.productRepository = new ProductRepository(db.Product);
  }

  /** 🧩 Crear un nuevo producto */
  public async createProduct(data: ProductCreationAttributes): Promise<Product> {
    const { name, categoryId, price, stock } = data;

    // Validaciones básicas
    if (!name) throw new Error('El nombre del producto es obligatorio');
    if (!categoryId) throw new Error('La categoría es obligatoria');
    if (price === undefined || price <= 0) throw new Error('El precio debe ser mayor que 0');
    if (stock === undefined || stock < 0) throw new Error('El stock no puede ser negativo');

    // Evita duplicados
    const existing = await this.productRepository.findProductByName(name);
    if (existing) throw new Error(`Ya existe un producto con el nombre "${name}"`);

    // Crea el producto
    return this.productRepository.createProduct(data);
  }

  /** 📦 Obtener todos los productos */
  public async getAllProducts(): Promise<Product[]> {
    return this.productRepository.getAllProducts();
  }

  /** 🔍 Buscar producto por nombre */
  public async getProductByName(name: string): Promise<Product | null> {
    if (!name) throw new Error('El nombre es obligatorio');
    return this.productRepository.findProductByName(name);
  }

  /** ✏️ Actualizar un producto */
  public async updateProduct(id: number, data: Partial<ProductAttributes>): Promise<Product> {
    const [count, updated] = await this.productRepository.updateProduct(id, data);

    if (count === 0) {
      throw new Error(`No se encontró el producto con ID ${id}`);
    }

    return updated[0];
  }

  /** 🗑️ Eliminar (lógicamente) un producto */
  public async deleteProduct(id: number): Promise<void> {
    const deletedCount = await this.productRepository.deleteProduct(id);
    if (deletedCount === 0) {
      throw new Error(`No se encontró el producto con ID ${id}`);
    }
  }
}
