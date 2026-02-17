import express from 'express';
import {
  googleAuth,
  googleCallback,
  getUser,
  logout,
} from '../controllers/auth.controllers.ts';

const router = express.Router();

router.get('/google', googleAuth);

router.get('/failure', (req, res) => {
  res.send('Something went wrong...');
});

router.get('/google/callback', googleCallback);

router.get('/me', getUser);

router.get('/logout', logout);

export default router;
