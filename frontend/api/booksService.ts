import { mapGoogleVolumeToBook } from '@/lib/mappers/books';
import { GoogleVolume } from '@/types/external/googleBooks';
import { Book } from '@/types/books';
import axios from 'axios';

export const searchBook = async (query: string): Promise<Book[]> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DEV_API_URL}/books/search?q=${encodeURIComponent(query)}`,
    );
    const mappedBooks = res.data.items.map((volume: GoogleVolume) =>
      mapGoogleVolumeToBook(volume),
    );
    return mappedBooks;
  } catch (err) {
    throw err;
  }
};

export const searchBookById = async (id: string): Promise<Book> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DEV_API_URL}/books/searchById?id=${encodeURIComponent(id)}`,
    );
    const mappedBook = mapGoogleVolumeToBook(res.data.results);
    return mappedBook;
  } catch (err) {
    throw err;
  }
};
