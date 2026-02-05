import express from 'express';
import { createShelf, updateShelf, getShelves, getShelf, deleteShelf, addBookToShelf, deleteBookFromShelf } from '../controllers/library.controllers.ts';
import { isUserLoggedIn } from '../../middleware/auth.middleware.ts';

const router = express.Router();

/**
 * Creates a new shelf
 */
router.post('/', isUserLoggedIn, createShelf);
/**
 * Updates an existing shelf
 */
router.patch('/:shelfId', isUserLoggedIn, updateShelf);
/**
 * Adds a book to a shelf
 */
router.post('/:shelfId/books', isUserLoggedIn, addBookToShelf);
/**
 * Deletes a book from library
 */
router.delete('/:shelfId/books/:bookId', isUserLoggedIn, deleteBookFromShelf);
/**
 * Gets all shelves for a user
 */
router.get('/', isUserLoggedIn, getShelves);
/**
 * Gets a specific shelf for a user
 */
router.get('/:shelfId', isUserLoggedIn, getShelf);
/**
 * Deletes a shelf
 */
router.delete('/:shelfId', isUserLoggedIn, deleteShelf);

export default router;
