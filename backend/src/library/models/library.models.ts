import type { Book } from "../../books/models/book.models.ts";

export const ShelfPrivacy = {
  PRIVATE: "private",
  PUBLIC: "public",
} as const;

export type ShelfPrivacy = typeof ShelfPrivacy[keyof typeof ShelfPrivacy];


export interface Shelf {
    id: string,
    name: string,
    description?: string,
    books: Book[],
    owner: string,
    privacy: ShelfPrivacy,
    createdAt: string
}