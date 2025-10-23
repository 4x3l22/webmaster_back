import e, { Request, Response } from 'express';
import { ProductService } from '../service/product.service';

export class ProductController {

  public static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productService = new ProductService();
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  public static async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const productService = new ProductService();
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  public static async getProductByName(req: Request, res: Response): Promise<void> {
    try {
      const productService = new ProductService();
      const product = await productService.getProductByName(req.params.name);
      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.status(200).json(product);
      }
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  public static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const productService = new ProductService();
      const updatedProduct = await productService.updateProduct(Number(req.params.id), req.body);
      res.status(200).json(updatedProduct);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  public static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const productService = new ProductService();
      await productService.deleteProduct(Number(req.params.id));
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
