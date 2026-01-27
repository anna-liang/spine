import express from 'express';
import { search } from '../controllers/books.controllers.ts';

const router = express.Router();

router.get('/search', search);

export default router;
