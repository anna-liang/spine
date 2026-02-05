import type { Request, Response } from 'express';
import * as libraryService from '../services/library.services.ts';

export const createShelf = async (req: Request, res: Response) => {
  const { name, description, privacy} = req.body;
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
    await libraryService.createShelf({ name, description, owner: req.user.id, privacy});
  } catch (err: any) {
    return res.status(err.status || 500).json({ error: err.message });
  }
};

export const updateShelf = async (req: Request, res: Response) => {

};

export const getShelves = async (req: Request, res: Response) => {

};

export const getShelf = async (req: Request, res: Response) => {

};

export const deleteShelf = async (req: Request, res: Response) => {

};

export const addBookToShelf = async (req: Request, res: Response) => {

};

export const deleteBookFromShelf = async (req: Request, res: Response) => {

};