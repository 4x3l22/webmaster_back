import { Request, Response } from 'express';
import { ProductService } from '../service/product.service';
import { AppError } from '../errors/AppError';
import { CreateProductDTO, UpdateProductDTO } from '../interface/product.dto';

export class ProductController {
  private static productService = new ProductService();

  public static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateProductDTO = req.body;
      const product = await ProductController.productService.createProduct(dto);
      res.status(201).json(product);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public static async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductController.productService.getAllProducts();
      res.status(200).json(products);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductController.productService.getProductById(Number(req.params.id));
      res.status(200).json(product);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public static async getProductByName(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductController.productService.getProductByName(req.params.name);
      res.status(200).json(product);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const dto: UpdateProductDTO = req.body;
      const updatedProduct = await ProductController.productService.updateProduct(Number(req.params.id), dto);
      res.status(200).json(updatedProduct);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      await ProductController.productService.deleteProduct(Number(req.params.id));
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
