import express from 'express';
// import {
//   searchBooks,
//   searchBookById,
// } from '../controllers/books.controllers.ts';
import { isUserLoggedIn } from '../../middleware/auth.middleware.ts';

const router = express.Router();

/**
 * Creates a new shelf
 */
router.post('/', isUserLoggedIn, () => {
  // user id?
});
/**
 * Updates an existing shelf
 */
router.patch('/:shelfId', isUserLoggedIn, () => {
  // lets user update name of library
});
/**
 * Adds a movie to a shelf
 */
router.post('/:shelfId/movies', isUserLoggedIn, () => {
  // should take a book id
  // user id?
  // should take an optional shelf id (if no id, default shelf)
});
/**
 * Deletes a movie from library
 */
router.delete('/:shelfId/movies/:movieId', isUserLoggedIn, () => {
  // should take a book id
  // user id?
  // should take an optional shelf id (if no id, default shelf)
});
/**
 * Gets all shelves for a user
 */
router.get('/', isUserLoggedIn);
/**
 * Gets a specific shelf for a user
 */
router.get('/:shelfId', isUserLoggedIn);
/**
 * Deletes a shelf
 */
router.delete('/:shelfId', isUserLoggedIn);

export default router;
