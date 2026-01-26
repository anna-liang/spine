import express from 'express';
import {
  googleAuth,
  googleCallback,
  logout,
} from '../controllers/auth.controllers.ts';
import { isUserLoggedIn } from '../../middleware/auth.middleware.ts';

const router = express.Router();

router.get('/google', googleAuth);

router.get('/protected', isUserLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}!`);
});

router.get('/failure', (req, res) => {
  res.send('Something went wrong...');
});

router.get('/google/callback', googleCallback);

router.get('/logout', logout);

export default router;
