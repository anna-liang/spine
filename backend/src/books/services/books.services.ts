import axios from 'axios';
import type { Book } from '../models/book.models.ts';
import type { GoogleVolume } from '../models/books.dto.ts';
import { mapGoogleVolumeToBook } from '../../lib/mappers/books.ts';

export const fetchBooksFromGoogle = async (query: string): Promise<Book[]> => {
  try {
    const response = await axios.get(
      `${process.env.GOOGLE_BOOKS_API_URI}/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10&key=${process.env.GOOGLE_BOOKS_DEV_API_KEY}`,
    );
    const mappedBooks = response.data.items.map((book: GoogleVolume) => mapGoogleVolumeToBook(book))
    return mappedBooks;
  } catch (err) {
    throw err;
  }
};

export const fetchBookById = async (id: string): Promise<Book> => {
  try {
    const response = await axios.get(
      `${process.env.GOOGLE_BOOKS_API_URI}/v1/volumes/${id}?key=${process.env.GOOGLE_BOOKS_DEV_API_KEY}`,
    );
    const mappedBook = mapGoogleVolumeToBook(response.data)
    return mappedBook;
  } catch (err) {
    throw err;
  }
};
