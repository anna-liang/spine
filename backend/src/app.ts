import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

export default app;
