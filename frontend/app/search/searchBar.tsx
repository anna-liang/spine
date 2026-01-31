'use client';

import { useState } from 'react';
import axios from 'axios';
import { Book } from '../../types/books';
import { mapGoogleVolumeToBook } from '@/lib/mappers/books';
import BookList from '@/components/list/bookList';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const searchBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_DEV_API_URL}/books/search?q=${encodeURIComponent(query)}`,
      );
      setBooks(mapGoogleVolumeToBook(res.data.items));
      console.log(res.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex h-50 items-center justify-center">
        <form onSubmit={searchBook}>
          <input
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <BookList books={books} />
    </div>
  );
}
