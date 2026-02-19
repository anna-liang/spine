import { pool } from '../../db.ts';
import { v4 as uuidv4 } from 'uuid'
import { BookStatus, ShelfPrivacy, type Shelf } from '../models/library.models.ts';
import dayjs, { type Dayjs } from 'dayjs';
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
    console.log('Error fetching book:', err)
    throw err
  }
  // insert in user_book
  try {
    const insertUserBookTableResult = await pool.query<UserBookRow>(`
        INSERT INTO "user_book" (id, status, user_id, book_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, book_id) DO NOTHING
        RETURNING *;
        `,
      [uuidv4(), BookStatus.TO_READ, owner, bookId]
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
    console.log('user_book table insert error', err)
    throw err
  }
  // insert in shelf_book
  try {
    await pool.query<ShelfBookRow>(`
        INSERT INTO "shelf_book" (id, shelf_id, user_book_id, added_at)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (shelf_id, user_book_id) DO NOTHING
        RETURNING id, shelf_id, user_book_id, added_at
        `,
      [uuidv4(), shelfId, userBookId, dayjs(new Date())]
    )
  } catch (err) {
    console.log('shelf_book table insert error', err)
    throw err
  }
  return
};

export const deleteBookFromShelf = async ({ userBookId, shelfId }: { userBookId: string, shelfId: string }) => {
  try {
    const result = await pool.query<Shelf>(`
          DELETE FROM "shelf_book"
          WHERE user_book_id = $1 AND shelf_id = $2
          RETURNING *;
        `,
      [userBookId, shelfId]
    )
    if (result.rowCount === 0) {
      throw new HttpError("Unexpected error deleting book from shelf", 500)
    }
    return result.rowCount
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateUserBook = async ({ owner, bookId, status, rating, readAt }: { owner: string, bookId: string, status?: BookStatus, rating?: number | undefined, readAt?: string }) => {
  try {
    let readAtDate: Dayjs | string | undefined = readAt
    if (!readAt && status === BookStatus.READ) readAtDate = dayjs(new Date())
    const result = await pool.query<Shelf>(`
          UPDATE "user_book"
          SET
            status = COALESCE($1, status),
            user_rating = COALESCE($2, user_rating),
            read_at = COALESCE($3, read_at)
          WHERE user_id = $4 AND book_id = $5
          RETURNING *;
        `,
      [status, rating, readAtDate, owner, bookId]
    )
    if (result.rows.length === 0) {
      throw new HttpError("Unexpected error updating shelf", 500)
    }
    return result.rows
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUserBook = async ({ owner, bookId }: { owner: string, bookId: string }) => {
  try {
    const result = await pool.query<Shelf>(`
        SELECT * FROM "user_book"
        WHERE user_id = $1 AND book_id = $2
        `,
      [owner, bookId]
    )
    return result.rows
  } catch (err) {
    console.error(err);
    throw err;
  }
};