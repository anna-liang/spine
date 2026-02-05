export const ShelfPrivacy = {
  PRIVATE: "private",
  PUBLIC: "public",
} as const;

export type ShelfPrivacy = typeof ShelfPrivacy[keyof typeof ShelfPrivacy];