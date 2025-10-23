import { Router } from 'express';
import { DependencyContainer } from '../config/DependencyContainer';

const router = Router();
const container = DependencyContainer.getInstance();
const categoryController = container.getCategoryController();

// Bind methods to preserve 'this' context
router.post('/', categoryController.createCategory.bind(categoryController));
router.get('/', categoryController.getCategories.bind(categoryController));
router.get('/:id', categoryController.getCategoryById.bind(categoryController));
router.get('/name/:name', categoryController.getCategoryByName.bind(categoryController));
router.put('/:id', categoryController.updateCategory.bind(categoryController));
router.delete('/:id', categoryController.deleteCategory.bind(categoryController));

export default router;
