import { Database } from "../models";
import { CategoryRepository } from "../repository/category.repository";
import { ProductRepository } from "../repository/product.repository";
import { CategoryService } from "../service/category.service";
import { ProductService } from "../service/product.service";
import { CategoryController } from "../controller/category.controller";
import { ProductController } from "../controller/product.controller";
import { ICategoryRepository } from "../interface/ICategoryRepository";
import { IProductRepository } from "../interface/IProductRepository";
import { ICategoryService } from "../interface/ICategoryService";
import { IProductService } from "../interface/IProductService";

/**
 * Contenedor de Inyección de Dependencias
 * Gestiona la creación e inyección de todas las dependencias del sistema
 */
export class DependencyContainer {
  private static instance: DependencyContainer;
  
  // Repositories
  private categoryRepository!: ICategoryRepository;
  private productRepository!: IProductRepository;
  
  // Services
  private categoryService!: ICategoryService;
  private productService!: IProductService;
  
  // Controllers
  private categoryController!: CategoryController;
  private productController!: ProductController;

  private constructor() {
    this.initializeRepositories();
    this.initializeServices();
    this.initializeControllers();
  }

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  /**
   * Inicializa los repositories con sus dependencias
   */
  private initializeRepositories(): void {
    const db = Database.getInstance();
    
    this.categoryRepository = new CategoryRepository(db.Category);
    this.productRepository = new ProductRepository(db.Product);
  }

  /**
   * Inicializa los services inyectando sus repositories
   */
  private initializeServices(): void {
    this.categoryService = new CategoryService(this.categoryRepository);
    this.productService = new ProductService(
      this.productRepository,
      this.categoryRepository
    );
  }

  /**
   * Inicializa los controllers inyectando sus services
   */
  private initializeControllers(): void {
    this.categoryController = new CategoryController(this.categoryService);
    this.productController = new ProductController(this.productService);
  }

  // Getters para obtener las instancias

  public getCategoryRepository(): ICategoryRepository {
    return this.categoryRepository;
  }

  public getProductRepository(): IProductRepository {
    return this.productRepository;
  }

  public getCategoryService(): ICategoryService {
    return this.categoryService;
  }

  public getProductService(): IProductService {
    return this.productService;
  }

  public getCategoryController(): CategoryController {
    return this.categoryController;
  }

  public getProductController(): ProductController {
    return this.productController;
  }
}
