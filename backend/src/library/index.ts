import { Router } from 'express';
import libraryRoutes from './routes/library.routes.ts';

const router = Router();
router.use('/', libraryRoutes);

export default router;
