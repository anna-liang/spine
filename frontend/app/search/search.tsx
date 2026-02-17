'use client';

import { useState } from 'react';
import { Book } from '../../types/books';
import BookList from '@/components/list/bookList';
import { getBooks } from '@/api/booksService';
import SearchBar from './searchBar';

export default function Search() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState<Book[]>([]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            try {
                const books = await getBooks(query);
                console.log(books)
                setBooks(books);
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <SearchBar handleSearch={handleSearch} handleOnChange={handleOnChange} query={query} />
            <BookList books={books} />
        </div>
    );
}
