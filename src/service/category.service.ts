import { Database } from "../models";
import { Category, CategoryAttributes, CategoryCreationAttributes } from "../models/category";
import { CategoryRepository } from "../repository/category.repository";


export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        const db = Database.getInstance();
        this.categoryRepository = new CategoryRepository(db.Category);
    }

    /** 🧩 Crear una nueva categoría */
    public async createCategory(data: CategoryCreationAttributes): Promise<Category> {
        const { name } = data;

        // Validaciones básicas
        if (!name) throw new Error('El nombre de la categoría es obligatorio');

        // Evita duplicados
        const existing = await this.categoryRepository.findCategoryByName(name);
        if (existing) throw new Error(`Ya existe una categoría con el nombre "${name}"`);

        // Crea la categoría
        return this.categoryRepository.createCategory(data);
    }

    /** 📦 Obtener todas las categorías */
    public async getAllCategories(): Promise<Category[]> {
        return this.categoryRepository.getAllCategories();
    }

    /** 🔍 Buscar categoría por nombre */
    public async getCategoryByName(name: string): Promise<Category | null> {
        if (!name) throw new Error('El nombre es obligatorio');
        return this.categoryRepository.findCategoryByName(name);
    }

    /** ✏️ Actualizar una categoría */
    public async updateCategory(id: number, data: Partial<CategoryAttributes>): Promise<Category> {
        const [count, updated] = await this.categoryRepository.updateCategory(id, data);

        if (count === 0) {
            throw new Error(`No se encontró la categoría con ID ${id}`);
        }

        return updated[0];
    }

    /** 🗑️ Eliminar (lógicamente) una categoría */
    public async deleteCategory(id: number): Promise<void> {
        const deletedCount = await this.categoryRepository.deleteCategory(id);
        if (deletedCount === 0) {
            throw new Error(`No se encontró la categoría con ID ${id}`);
        }
    }
}
