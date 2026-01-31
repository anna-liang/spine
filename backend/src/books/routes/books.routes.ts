import express from 'express';
import {
  searchBooks,
  searchBookById,
} from '../controllers/books.controllers.ts';

const router = express.Router();

router.get('/search', searchBooks);
router.get('/searchById', searchBookById);

export default router;
