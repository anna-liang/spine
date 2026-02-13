import express from 'express';
import {
    getRecommendationsForUser, getRecommendationsForBook, getRecommendationsForShelf
} from '../controllers/recommendations.controllers.ts';
import { isUserLoggedIn } from '../../middleware/auth.middleware.ts';

const router = express.Router();

router.get('/user', isUserLoggedIn, getRecommendationsForUser);
router.get('/book', isUserLoggedIn, getRecommendationsForBook);
router.get('/shelf', isUserLoggedIn, getRecommendationsForShelf);

export default router;
