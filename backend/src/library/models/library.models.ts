export const ShelfPrivacy = {
  private: "private",
  public: "public",
} as const;

export type ShelfPrivacy = typeof ShelfPrivacy[keyof typeof ShelfPrivacy];

export const BookStatus = {
  READ: "read",
  READING: "reading",
  TO_READ: "to_read"
} as const;

export type BookStatus = typeof BookStatus[keyof typeof BookStatus];

export interface Shelf {
  id: string,
  name: string,
  description?: string,
  owner: string,
  privacy: ShelfPrivacy,
  createdAt: string
}