import type { Request, Response } from 'express';
import * as recommendationsService from '../services/recommendations.service.ts'

export const getRecommendations = async (req: Request, res: Response) => {
    console.log('GET /recommendations')
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    try {
        const results = await recommendationsService.getRecommendations({ owner: req.user.id }) || [];
        return res.json(results);
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }

};

