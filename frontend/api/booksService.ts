import { mapGoogleVolumeToBook } from '@/lib/mappers/books';
import { GoogleVolume } from '@/types/external/googleBooks';
import { Book } from '@/types/books';
import axios from 'axios';

export const getBooks = async (query: string): Promise<Book[]> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DEV_API_URL}/books?q=${encodeURIComponent(query)}`,
    );
    const mappedBooks = res.data.items.map((volume: GoogleVolume) =>
      mapGoogleVolumeToBook(volume),
    );
    return mappedBooks;
  } catch (err) {
    throw err;
  }
};

export const getBookById = async (id: string): Promise<Book> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DEV_API_URL}/books/${id}`,
    );
    const mappedBook = mapGoogleVolumeToBook(res.data.results);
    return mappedBook;
  } catch (err) {
    throw err;
  }
};
