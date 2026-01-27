'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const searchBook = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(query);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_API_URL}/books/search?q=${encodeURIComponent(query)}`,
        { credentials: 'include' },
      );
      const data = await res.json();
      setBooks(data.items);
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
      {books.map((book) => (
        <div key={book.id}>
          <h1>{book.volumeInfo.title}</h1>
          {book.volumeInfo.imageLinks && (
            <Image
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
              width={100}
              height={100}
            />
          )}
        </div>
      ))}
    </div>
  );
}
