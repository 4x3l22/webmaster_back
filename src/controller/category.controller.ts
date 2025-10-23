import { CategoryService } from "../service/category.service";
import e, { Request, Response } from 'express';

export class CategoryController {

  public static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryService = new CategoryService();
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  public static async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categoryService = new CategoryService();
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  public static async getCategoryByName(req: Request, res: Response): Promise<void> {
    try {
      const categoryService = new CategoryService();
      const category = await categoryService.getCategoryByName(req.params.name);
      if (!category) {
        res.status(404).json({ error: 'Categoría no encontrada' });
      } else {
        res.status(200).json(category);
      }
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  public static async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryService = new CategoryService();
      const updatedCategory = await categoryService.updateCategory(Number(req.params.id), req.body);
      res.status(200).json(updatedCategory);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  public static async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoryService = new CategoryService();
      await categoryService.deleteCategory(Number(req.params.id));
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}