import { Router } from 'express';
import { DependencyContainer } from '../config/DependencyContainer';

const router = Router();
const container = DependencyContainer.getInstance();
const productController = container.getProductController();

// Bind methods to preserve 'this' context
router.post('/', productController.createProduct.bind(productController));
router.get('/', productController.getProducts.bind(productController));
router.get('/:id', productController.getProductById.bind(productController));
router.get('/name/:name', productController.getProductByName.bind(productController));
router.put('/:id', productController.updateProduct.bind(productController));
router.delete('/:id', productController.deleteProduct.bind(productController));

export default router;
