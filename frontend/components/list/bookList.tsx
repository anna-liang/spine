import { Book } from '@/types/books';
import BookListItem from '../listItem/bookListItem';

export default function BookList({ books }: { books: Book[] }) {
  return (
    <ul>
      {books.map((book) => {
        return (
          <li key={book.id}>
            <BookListItem book={book} />
          </li>
        );
      })}
    </ul>
  );
}
