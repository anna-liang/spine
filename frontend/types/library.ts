export const ShelfPrivacy = {
  PRIVATE: "private",
  PUBLIC: "public",
} as const;

export type ShelfPrivacy = typeof ShelfPrivacy[keyof typeof ShelfPrivacy];

export const BookStatus = {
  READ: "read",
  READING: "reading",
  TO_READ: "to_read",
} as const;

export type BookStatus = typeof BookStatus[keyof typeof BookStatus];
