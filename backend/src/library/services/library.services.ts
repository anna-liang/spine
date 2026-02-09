import { pool } from '../../db.ts';
import { v4 as uuidv4 } from 'uuid'
import { BookStatus, ShelfPrivacy, type Shelf } from '../models/library.models.ts';
import dayjs from 'dayjs';
import { HttpError } from '../../utils/HttpError.ts';
import { fetchBookById } from '../../books/services/books.services.ts';
import type { Book } from '../../books/models/book.models.ts';
import type { GoogleVolume } from '../../books/models/books.dto.ts';
import type { UserBookRow, ShelfBookRow } from '../models/library.db.types.ts';

export const createShelf = async ({ name, description, owner, privacy }: { name: string, description?: string, owner: string, privacy: ShelfPrivacy }) => {
  try {
    const result = await pool.query<Shelf>(`
        INSERT INTO "shelf" (id, name, description, owner, privacy, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `,
      [uuidv4(), name, description, owner, privacy, dayjs(new Date())]
    )
    if (result.rows.length === 0) {
      throw new HttpError("A shelf with this name already exists.", 409)
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateShelf = async ({ name, description, privacy, shelfId }: { name: string, description?: string, privacy: ShelfPrivacy, shelfId: string }) => {
  try {
    const result = await pool.query<Shelf>(`
          UPDATE "shelf"
          SET
            name = COALESCE(NULLIF($1, ''), name),
            description = COALESCE($2, description),
            privacy = $3
          WHERE id = $4
          RETURNING *;
        `,
      [name, description, privacy, shelfId]
    )
    console.log(result.rows)
    if (result.rows.length === 0) {
      throw new HttpError("Unexpected error updating shelf", 500)
    }
    return result.rows
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getShelves = async ({ owner }: { owner: string }) => {
  try {
    const result = await pool.query<Shelf>(`
        SELECT * FROM "shelf"
        WHERE owner = $1
        `,
      [owner]
    )
    if (result.rows.length === 0) {
      throw new HttpError("Shelves not found.", 404)
    }
    return result.rows
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getShelf = async ({ shelfId, owner }: { shelfId: string, owner: string }) => {
  try {
    const result = await pool.query<Shelf>(`
        SELECT * FROM "shelf"
        WHERE id = $1 AND owner = $2
        `,
      [shelfId, owner]
    )
    if (result.rows.length === 0) {
      throw new HttpError("Shelf not found.", 404)
    }
    return result.rows
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteShelf = async () => {

};

export const addBookToShelf = async ({ shelfId, bookId, owner }: { shelfId: string, bookId: string, owner: string }) => {
  let bookToAdd: Book = {
    id: '',
    title: '',
    authors: [],
    publisher: '',
    publishedDate: '',
    description: '',
    pageCount: 0,
    mainCategory: '',
    categories: [],
    averageRating: 0,
    ratingsCount: 0,
    image: '',
    language: '',
    previewLink: '',
    infoLink: ''
  }
  let userBookId = ''
  try {
    const bookResult = await fetchBookById(bookId)
    if (bookResult) bookToAdd = bookResult
  } catch (err) {
    console.log('fetch book err')
    throw err
  }
  // insert in book
  try {
    const bookTableResult = await pool.query<GoogleVolume>(`
        INSERT INTO "book" (id, title, authors, publisher, published_date, description, page_count, main_category, categories, average_rating, ratings_count, thumbnail, language, preview_link, info_link)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        ON CONFLICT (id) DO NOTHING
        RETURNING *;
        `,
      [bookToAdd.id, bookToAdd.title, bookToAdd.authors, bookToAdd.publisher, bookToAdd.publishedDate, bookToAdd.description, bookToAdd.pageCount, bookToAdd.mainCategory, bookToAdd.categories, bookToAdd.averageRating, bookToAdd.ratingsCount, bookToAdd.image, bookToAdd.language, bookToAdd.previewLink, bookToAdd.infoLink] // TODO: write a helper function
    )
  } catch (err) {
    console.log(err)
    throw err
  }
  // insert in user_book
  try {
    // TODO: create type for return object
    const insertUserBookTableResult = await pool.query<UserBookRow>(`
        INSERT INTO "user_book" (id, status, user_id, book_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, book_id) DO NOTHING
        RETURNING *;
        `,
      [uuidv4(), BookStatus.NOTREAD, owner, bookId]
    )
    if (insertUserBookTableResult.rows.length !== 0 && insertUserBookTableResult.rows[0]) {
      userBookId = insertUserBookTableResult.rows[0].id
    }
    // There was a conflict (i.e. a user has already added this book to a shelf before),
    // but we want a user to be able to add this book to a different shelf,
    // so fetch their existing entry
    else if (insertUserBookTableResult.rows.length === 0) {
      const selectUserBookTableResult = await pool.query(`
        SELECT * FROM "user_book"
        WHERE book_id = $1 AND user_id = $2
        `,
        [bookId, owner]
      )
      userBookId = selectUserBookTableResult.rows[0].id
    }
  } catch (err) {
    console.log(err)
    throw err
  }
  // insert in shelf_book
  try {
    // TODO: create type for return object
    const shelfBookTableResult = await pool.query<ShelfBookRow>(`
        INSERT INTO "shelf_book" (id, shelf_id, user_book_id, added_at)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (shelf_id, user_book_id) DO NOTHING
        RETURNING id, shelf_id, user_book_id, added_at
        `,
      [uuidv4(), shelfId, userBookId, dayjs(new Date())]
    )
  } catch (err) {
    console.log(err)
    throw err
  }
  return
};

export const deleteBookFromShelf = async ({ bookId, shelfId }: { bookId: string, shelfId: string }) => {
  // await pool.query(`
  //       UPDATE "shelf"
  //       SET books = array_remove(books, $1)
  //       WHERE id = $2
  //       RETURNING *;
  //       `,
  //     [bookId, shelfId]
  // );

};
