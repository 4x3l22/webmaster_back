import { AppError } from "../errors/AppError";
import { CreateCategoryDTO, UpdateCategoryDTO, CategoryResponseDTO } from "../interface/category.dto";
import { CategoryMapper } from "../mappers/category.mapper";
import { ICategoryRepository } from "../interface/ICategoryRepository";
import { ICategoryService } from "../interface/ICategoryService";


export class CategoryService implements ICategoryService {
    private categoryRepository: ICategoryRepository;

    constructor(categoryRepository: ICategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public async createCategory(data: CreateCategoryDTO): Promise<CategoryResponseDTO> {
        const { name } = data;

        if (!name || name.trim() === '') {
            throw AppError.badRequest('El nombre de la categoría es obligatorio');
        }

        const existing = await this.categoryRepository.findCategoryByName(name);
        if (existing) {
            throw AppError.conflict(`Ya existe una categoría con el nombre "${name}"`);
        }

        const category = await this.categoryRepository.createCategory(data);
        return CategoryMapper.toResponseDTO(category);
    }

    public async getAllCategories(): Promise<CategoryResponseDTO[]> {
        const categories = await this.categoryRepository.getAllCategories();
        return CategoryMapper.toResponseDTOList(categories);
    }

    public async getCategoryById(id: number): Promise<CategoryResponseDTO> {
        if (!id || id <= 0) {
            throw AppError.badRequest('El ID debe ser un número válido');
        }

        const category = await this.categoryRepository.findCategoryById(id);
        if (!category) {
            throw AppError.notFound(`No se encontró la categoría con ID ${id}`);
        }

        return CategoryMapper.toResponseDTO(category);
    }

    public async getCategoryByName(name: string): Promise<CategoryResponseDTO> {
        if (!name || name.trim() === '') {
            throw AppError.badRequest('El nombre es obligatorio');
        }

        const category = await this.categoryRepository.findCategoryByName(name);
        if (!category) {
            throw AppError.notFound(`No se encontró la categoría con el nombre "${name}"`);
        }

        return CategoryMapper.toResponseDTO(category);
    }

    public async updateCategory(id: number, data: UpdateCategoryDTO): Promise<CategoryResponseDTO> {
        if (!id || id <= 0) {
            throw AppError.badRequest('El ID debe ser un número válido');
        }

        if (data.name && data.name.trim() === '') {
            throw AppError.badRequest('El nombre no puede estar vacío');
        }

        if (data.name) {
            const existing = await this.categoryRepository.findCategoryByName(data.name);
            if (existing && existing.id !== id) {
                throw AppError.conflict(`Ya existe una categoría con el nombre "${data.name}"`);
            }
        }

        const updated = await this.categoryRepository.updateCategory(id, data);
        if (!updated) {
            throw AppError.notFound(`No se encontró la categoría con ID ${id}`);
        }

        return CategoryMapper.toResponseDTO(updated);
    }

    public async deleteCategory(id: number): Promise<void> {
        if (!id || id <= 0) {
            throw AppError.badRequest('El ID debe ser un número válido');
        }

        const category = await this.categoryRepository.findCategoryById(id);
        if (!category) {
            throw AppError.notFound(`No se encontró la categoría con ID ${id}`);
        }

        const deletedCount = await this.categoryRepository.deleteCategory(id);
        if (deletedCount === 0) {
            throw AppError.notFound(`No se pudo eliminar la categoría con ID ${id}`);
        }
    }
}
