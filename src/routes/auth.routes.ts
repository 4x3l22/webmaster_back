import { Router } from 'express';
import { ProductController } from '../controller/product.controller';
import { CategoryController } from '../controller/category.controller';

const router: Router = Router();

/**
 * Product Routes
 */
router.post('/create-product', ProductController.createProduct);
router.get('/products', ProductController.getProducts);
router.get('/products/:name', ProductController.getProductByName);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

/** 
 * Category Routes
*/
router.post('/create-category', CategoryController.createCategory);
router.get('/categories', CategoryController.getCategories);
router.get('/categories/:name', CategoryController.getCategoryByName);
router.put('/categories/:id', CategoryController.updateCategory);
router.delete('/categories/:id', CategoryController.deleteCategory);

export default router;
