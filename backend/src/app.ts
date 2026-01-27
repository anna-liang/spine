import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import session from 'express-session';
import passport from './auth/passport.ts';
import authRoutes from './auth/index.ts';
import booksRoutes from './books/index.ts';
import { isUserLoggedIn } from './middleware/auth.middleware.ts';

const app = express();
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET is not defined');
}
app.use(session({ secret: sessionSecret }));
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

// const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// pool.on('connect', () => {
//   console.log('Connected to PostgreSQL');
// });

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/dashboard', isUserLoggedIn, (req, res) => {
  res.send('<h1>Welcome!</h1>');
});

export default app;
