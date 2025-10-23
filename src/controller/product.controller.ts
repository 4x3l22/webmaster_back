import { Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { CreateProductDTO, UpdateProductDTO } from '../interface/product.dto';
import { IProductService } from '../interface/IProductService';

export class ProductController {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  public async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateProductDTO = req.body;
      const product = await this.productService.createProduct(dto);
      res.status(201).json(product);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.productService.getProductById(Number(req.params.id));
      res.status(200).json(product);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public async getProductByName(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.productService.getProductByName(req.params.name);
      res.status(200).json(product);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const dto: UpdateProductDTO = req.body;
      const updatedProduct = await this.productService.updateProduct(Number(req.params.id), dto);
      res.status(200).json(updatedProduct);
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      await this.productService.deleteProduct(Number(req.params.id));
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
