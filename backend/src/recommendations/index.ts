import { Router } from 'express';
import recommendationsRoutes from './routes/recommendations.routes.ts';

const router = Router();
router.use('/', recommendationsRoutes);

export default router;
