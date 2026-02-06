import type { Request, Response } from 'express';
import { fetchBooksFromGoogle, fetchBookById } from '../services/books.services.ts';

export const getBooks = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  try {
    const results = await fetchBooksFromGoogle(query) || [];
    return res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search books' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  if (!id) {
    return res.status(400).json({ error: 'Missing query parameter "id"' });
  }

  try {
    const results = await fetchBookById(id);
    return res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search book by id' });
  }
};
