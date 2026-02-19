export interface Book {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: number;
  mainCategory: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  image?: string;
  language: string;
  previewLink: string;
  infoLink: string;
  saleability?: string;
  listPrice?: {
    amount?: number;
    currencyCode?: string
  },
  retailPrice?: {
    amount?: number;
    currencyCode?: string
  },
  buyLink?: string;
}

export const Saleability = {
  FOR_SALE: "FOR_SALE",
  FREE: "FREE",
  NOT_FOR_SALE: "NOT_FOR_SALE"
} as const;

export type Saleability = typeof Saleability[keyof typeof Saleability];
