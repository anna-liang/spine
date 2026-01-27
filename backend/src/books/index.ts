import { Router } from 'express';
import booksRoutes from './routes/books.routes.ts';

const router = Router();
router.use('/', booksRoutes);

export default router;
