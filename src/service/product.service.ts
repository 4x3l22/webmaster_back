import { AppError } from '../errors/AppError';
import { CreateProductDTO, UpdateProductDTO, ProductWithCategoryDTO } from '../interface/product.dto';
import { ProductMapper } from '../mappers/product.mapper';
import { IProductRepository } from '../interface/IProductRepository';
import { ICategoryRepository } from '../interface/ICategoryRepository';
import { IProductService } from '../interface/IProductService';

export class ProductService implements IProductService {
  private productRepository: IProductRepository;
  private categoryRepository: ICategoryRepository;

  constructor(productRepository: IProductRepository, categoryRepository: ICategoryRepository) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
  }

  public async createProduct(data: CreateProductDTO): Promise<ProductWithCategoryDTO> {
    const { name, categoryId, price, stock } = data;

    if (!name || name.trim() === '') {
      throw AppError.badRequest('El nombre del producto es obligatorio');
    }
    
    if (!categoryId) {
      throw AppError.badRequest('La categoría es obligatoria');
    }
    
    if (price === undefined || price === null) {
      throw AppError.badRequest('El precio es obligatorio');
    }
    
    if (price <= 0) {
      throw AppError.badRequest('El precio debe ser mayor que 0');
    }
    
    if (stock === undefined || stock === null) {
      throw AppError.badRequest('El stock es obligatorio');
    }
    
    if (stock < 0) {
      throw AppError.badRequest('El stock no puede ser negativo');
    }

    const categoryExists = await this.categoryRepository.findCategoryById(categoryId);
    if (!categoryExists) {
      throw AppError.notFound(`La categoría con ID ${categoryId} no existe`);
    }

    const existing = await this.productRepository.findProductByName(name);
    if (existing) {
      throw AppError.conflict(`Ya existe un producto con el nombre "${name}"`);
    }

    const product = await this.productRepository.createProduct(data);
    const productWithCategory = await this.productRepository.findProductById(product.id);
    return ProductMapper.toProductWithCategoryDTO(productWithCategory);
  }

  public async getAllProducts(): Promise<ProductWithCategoryDTO[]> {
    const products = await this.productRepository.getAllProducts();
    return ProductMapper.toProductWithCategoryDTOList(products);
  }

  public async getProductById(id: number): Promise<ProductWithCategoryDTO> {
    if (!id || id <= 0) {
      throw AppError.badRequest('El ID debe ser un número válido');
    }

    const product = await this.productRepository.findProductById(id);
    if (!product) {
      throw AppError.notFound(`No se encontró el producto con ID ${id}`);
    }

    return ProductMapper.toProductWithCategoryDTO(product);
  }

  public async getProductByName(name: string): Promise<ProductWithCategoryDTO> {
    if (!name || name.trim() === '') {
      throw AppError.badRequest('El nombre es obligatorio');
    }

    const product = await this.productRepository.findProductByName(name);
    if (!product) {
      throw AppError.notFound(`No se encontró el producto con el nombre "${name}"`);
    }

    const productWithCategory = await this.productRepository.findProductById(product.id);
    return ProductMapper.toProductWithCategoryDTO(productWithCategory);
  }

  public async updateProduct(id: number, data: UpdateProductDTO): Promise<ProductWithCategoryDTO> {
    if (!id || id <= 0) {
      throw AppError.badRequest('El ID debe ser un número válido');
    }

    if (data.name !== undefined && data.name.trim() === '') {
      throw AppError.badRequest('El nombre no puede estar vacío');
    }

    if (data.price !== undefined && data.price <= 0) {
      throw AppError.badRequest('El precio debe ser mayor que 0');
    }

    if (data.stock !== undefined && data.stock < 0) {
      throw AppError.badRequest('El stock no puede ser negativo');
    }

    if (data.categoryId) {
      const categoryExists = await this.categoryRepository.findCategoryById(data.categoryId);
      if (!categoryExists) {
        throw AppError.notFound(`La categoría con ID ${data.categoryId} no existe`);
      }
    }

    if (data.name) {
      const existing = await this.productRepository.findProductByName(data.name);
      if (existing && existing.id !== id) {
        throw AppError.conflict(`Ya existe un producto con el nombre "${data.name}"`);
      }
    }

    const updated = await this.productRepository.updateProduct(id, data);
    if (!updated) {
      throw AppError.notFound(`No se encontró el producto con ID ${id}`);
    }

    const productWithCategory = await this.productRepository.findProductById(id);
    return ProductMapper.toProductWithCategoryDTO(productWithCategory);
  }

  public async deleteProduct(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw AppError.badRequest('El ID debe ser un número válido');
    }

    const product = await this.productRepository.findProductById(id);
    if (!product) {
      throw AppError.notFound(`No se encontró el producto con ID ${id}`);
    }

    const deletedCount = await this.productRepository.deleteProduct(id);
    if (deletedCount === 0) {
      throw AppError.notFound(`No se pudo eliminar el producto con ID ${id}`);
    }
  }
}
