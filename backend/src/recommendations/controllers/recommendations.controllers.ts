import type { Request, Response } from 'express';
import * as recommendationsService from '../services/recommendations.service.ts'

export const getRecommendationsForUser = async (req: Request, res: Response) => {
    const limitParam = req.query?.limit as string
    let limit: number = 20;

    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    if (limitParam) {
        limit = limitParam ? parseInt(limitParam) : limit
    }
    try {
        const results = await recommendationsService.getRecommendationsForUser({ owner: req.user.id, limit }) || [];
        return res.json(results);
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }

};

export const getRecommendationsForBook = async (req: Request, res: Response) => {
    const bookId = req.params.bookId as string
    const limitParam = req.query?.limit as string
    let limit: number = 20;
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    if (!bookId) {
        return res.status(400).json({ error: 'Missing parameter "bookId"' });
    }
    if (limitParam) {
        limit = limitParam ? parseInt(limitParam) : limit
    }
    try {
        const results = await recommendationsService.getRecommendationsForBook({ bookId, limit }) || [];
        return res.json(results);
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }

};

export const getRecommendationsForShelf = async (req: Request, res: Response) => {
    const shelfId = req.params.shelfId as string
    const limitParam = req.query?.limit as string
    let limit: number = 20;
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    if (!shelfId) {
        return res.status(400).json({ error: 'Missing parameter "shelfId"' });
    }
    if (limitParam) {
        limit = limitParam ? parseInt(limitParam) : limit
    }
    try {
        const results = await recommendationsService.getRecommendationsForShelf({ owner: req.user.id, shelfId, limit }) || [];
        return res.json(results);
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }

};