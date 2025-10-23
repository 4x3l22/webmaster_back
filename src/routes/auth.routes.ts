import { Router } from 'express';

const router: Router = Router();

/**
 * Auth Routes
 * Aquí irán las rutas de autenticación en el futuro
 */
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Auth service is running' });
});

export default router;
