import express from 'express';
import { getRecommendations } from '../controllers/recommendations.controllers.ts';
import { isUserLoggedIn } from '../../middleware/auth.middleware.ts';

const router = express.Router();

router.get('/', isUserLoggedIn, getRecommendations);

export default router;
