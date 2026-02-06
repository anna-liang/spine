import { Book } from '@/types/books';
import axios from 'axios';

export const getBooks = async (query: string): Promise<Book[]> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DEV_API_URL}/books?q=${encodeURIComponent(query)}`,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getBookById = async (id: string): Promise<Book> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DEV_API_URL}/books/${id}`,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
