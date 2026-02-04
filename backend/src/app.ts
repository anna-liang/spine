import express from 'express';
import cors from 'cors';
import { pool } from './db.ts';
import session from 'express-session';
import passport from './auth/passport.ts';
import authRoutes from './auth/index.ts';
import booksRoutes from './books/index.ts';
import libraryRoutes from './library/index.ts';

const app = express();
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET is not defined');
}
app.use(
  session({
    secret: sessionSecret,
    cookie: {
      httpOnly: true,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.DEV_CLIENT_URI,
    credentials: true,
  }),
);
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/books', booksRoutes);
app.use('/shelves', libraryRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', server: 'running' });
});

export default app;
