import type { Request, Response } from 'express';
import * as booksService from '../services/books.services.ts';

export const getBooks = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  try {
    const results = await booksService.fetchBooksFromGoogle(query);
    return res.json({ items: results.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search books' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Missing query parameter "id"' });
  }

  try {
    const results = await booksService.fetchOneBookById(id);
    return res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search book by id' });
  }
};
