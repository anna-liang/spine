import { Router } from 'express';
import authRoutes from './routes/auth.routes.ts';

const router = Router();
router.use('/', authRoutes);

export default router;
