import axios from 'axios';
import type { Book } from '../models/book.models.ts';
import type { GoogleVolume } from '../models/books.dto.ts';
import { mapGoogleVolumeToBook } from '../../lib/mappers/books.ts';
import { pool } from '../../db.ts';

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

    try {
      // add to book table
      await pool.query<GoogleVolume>(`
            INSERT INTO "book" (id, title, authors, publisher, published_date, description, page_count, main_category, categories, average_rating, ratings_count, thumbnail, language, preview_link, info_link, saleability, list_price, retail_price, buy_link)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
            ON CONFLICT (id) DO NOTHING
            RETURNING *;
            `,
        [mappedBook.id, mappedBook.title, mappedBook.authors, mappedBook.publisher, mappedBook.publishedDate, mappedBook.description, mappedBook.pageCount, mappedBook.mainCategory, mappedBook.categories, mappedBook.averageRating, mappedBook.ratingsCount, mappedBook.image, mappedBook.language, mappedBook.previewLink, mappedBook.infoLink, mappedBook.saleability, mappedBook.listPrice, mappedBook.retailPrice, mappedBook.buyLink] // TODO: write a helper function
      )
    } catch (err) {
      console.error(err);
      throw err;
    }
    return mappedBook;
  } catch (err) {
    throw err;
  }
};
