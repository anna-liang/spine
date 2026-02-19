import type { Request, Response } from 'express';
import * as libraryService from '../services/library.services.ts';

export const createShelf = async (req: Request, res: Response) => {
    const { name, description, privacy } = req.body;
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    if (!name) {
        return res.status(400).json({ error: 'Missing parameter "name"' });
    }
    if (!privacy) {
        return res.status(400).json({ error: 'Missing parameter "privacy"' });
    }

    try {
        await libraryService.createShelf({ name, description, owner: req.user.id, privacy });
        return res.sendStatus(200)
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }
};

export const updateShelf = async (req: Request, res: Response) => {
    const { name, description, privacy } = req.body;
    const shelfId = req.params.shelfId as string
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    if (!shelfId) {
        return res.status(400).json({ error: 'Missing parameter "shelfId"' });
    }

    try {
        await libraryService.updateShelf({ name, description, privacy, shelfId });
        return res.sendStatus(200)
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }
};

export const getShelves = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    try {
        const results = await libraryService.getShelves({ owner: req.user.id }) || [];
        return res.json(results);
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }

};

export const getShelf = async (req: Request, res: Response) => {
    const shelfId = req.params.shelfId as string
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    if (!shelfId) {
        return res.status(400).json({ error: 'Missing parameter "shelfId"' });
    }
    try {
        const results = await libraryService.getShelf({ shelfId, owner: req.user.id }) || [];
        return res.json(results);
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }
};

export const deleteShelf = async (req: Request, res: Response) => {

};

export const addBookToShelf = async (req: Request, res: Response) => {
    const shelfId = req.params.shelfId as string
    const bookId = req.params.bookId as string
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    if (!shelfId) {
        return res.status(400).json({ error: 'Missing parameter "shelfId"' });
    }
    if (!bookId) {
        return res.status(400).json({ error: 'Missing parameter "bookId"' });
    }
    try {
        await libraryService.addBookToShelf({ shelfId, bookId, owner: req.user.id });
        return res.sendStatus(200)
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }
};

export const deleteBookFromShelf = async (req: Request, res: Response) => {
    const userBookId = req.params.userBookId as string
    const shelfId = req.params.shelfId as string
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    if (!userBookId) {
        return res.status(400).json({ error: 'Missing parameter "userBookId"' });
    }
    try {
        await libraryService.deleteBookFromShelf({ userBookId, shelfId });
        return res.sendStatus(200)
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }
};

export const updateUserBook = async (req: Request, res: Response) => {
    const bookId = req.params.bookId as string
    const { status, rating, readAt } = req.body;
    let parsedRating: undefined | number = undefined
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    if (!bookId) {
        return res.status(400).json({ error: 'Missing parameter "bookId"' });
    }
    if (rating !== undefined && rating !== null && rating !== '') {
        parsedRating = parseInt(rating)
    }
    try {
        await libraryService.updateUserBook({ bookId, owner: req.user.id, status, rating: parsedRating, readAt });
        return res.sendStatus(200)
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }
};

export const getUserBook = async (req: Request, res: Response) => {
    const bookId = req.params.bookId as string
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    if (!bookId) {
        return res.status(400).json({ error: 'Missing parameter "bookId"' });
    }
    try {
        const results = await libraryService.getUserBook({ owner: req.user.id, bookId });
        return res.json(results);
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }
}; 