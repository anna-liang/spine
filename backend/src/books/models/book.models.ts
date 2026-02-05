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
  previewLink: string;
}
