import axios from 'axios';
import { pool } from '../../db.ts';
import { v4 as uuidv4 } from 'uuid'
import { ShelfPrivacy, type Shelf } from '../models/library.models.ts';
import dayjs from 'dayjs';
import { HttpError } from '../../utils/HttpError.ts';

export const createShelf = async ({name, description, owner, privacy}: {name: string, description?: string, owner: string, privacy: ShelfPrivacy}) => {
  try {
    const result = await pool.query<Shelf>(`
        INSERT INTO "shelf" (id, name, description, books, owner, privacy, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (name) DO NOTHING
        RETURNING id, name, description, books, owner, privacy, created_at
        `,
        [uuidv4(), name, description, [], owner, privacy, dayjs(new Date())]
    )
    if (result.rows.length === 0) {
        throw new HttpError("A shelf with this name already exists.", 409)
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateShelf = async () => {
};

export const getShelves = async () => {

};

export const getShelf = async () => {

};

export const deleteShelf = async () => {

};

export const addBookToShelf = async () => {

};

export const deleteBookFromShelf = async () => {

};
