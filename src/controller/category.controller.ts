import { CategoryService } from "../service/category.service";
import { Request, Response } from 'express';
import { AppError } from "../errors/AppError";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../interface/category.dto";

export class CategoryController {
  private static categoryService = new CategoryService();

  public static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateCategoryDTO = req.body;
      const category = await CategoryController.categoryService.createCategory(dto);
      res.status(201).json(category);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public static async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await CategoryController.categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public static async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const category = await CategoryController.categoryService.getCategoryById(Number(req.params.id));
      res.status(200).json(category);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public static async getCategoryByName(req: Request, res: Response): Promise<void> {
    try {
      const category = await CategoryController.categoryService.getCategoryByName(req.params.name);
      res.status(200).json(category);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public static async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const dto: UpdateCategoryDTO = req.body;
      const updatedCategory = await CategoryController.categoryService.updateCategory(Number(req.params.id), dto);
      res.status(200).json(updatedCategory);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public static async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      await CategoryController.categoryService.deleteCategory(Number(req.params.id));
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