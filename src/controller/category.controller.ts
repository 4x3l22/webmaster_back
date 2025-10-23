import { Request, Response } from 'express';
import { AppError } from "../errors/AppError";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../interface/category.dto";
import { ICategoryService } from "../interface/ICategoryService";

export class CategoryController {
  private categoryService: ICategoryService;

  constructor(categoryService: ICategoryService) {
    this.categoryService = categoryService;
  }

  public async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateCategoryDTO = req.body;
      const category = await this.categoryService.createCategory(dto);
      res.status(201).json(category);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const category = await this.categoryService.getCategoryById(Number(req.params.id));
      res.status(200).json(category);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public async getCategoryByName(req: Request, res: Response): Promise<void> {
    try {
      const category = await this.categoryService.getCategoryByName(req.params.name);
      res.status(200).json(category);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const dto: UpdateCategoryDTO = req.body;
      const updatedCategory = await this.categoryService.updateCategory(Number(req.params.id), dto);
      res.status(200).json(updatedCategory);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      await this.categoryService.deleteCategory(Number(req.params.id));
      res.status(204).send();
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }
}