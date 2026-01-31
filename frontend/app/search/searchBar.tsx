'use client';

import { useState } from 'react';
import { Book } from '../../types/books';
import BookList from '@/components/list/bookList';
import { searchBook } from '@/api/booksService';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const books = await searchBook(query);
      setBooks(books);
      console.log(books);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex h-50 items-center justify-center">
        <form onSubmit={handleSearch}>
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
