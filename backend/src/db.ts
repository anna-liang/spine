import { Pool } from 'pg';

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.connect()
  .then((client) => {
    console.log('Connected successfully!');
  })
  .catch(err => {
    console.error('Connection failed:', err.message);
  });