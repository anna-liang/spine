import type { Request, Response, NextFunction } from 'express';
import * as booksService from '../services/books.services.ts';

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.query.q);
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
