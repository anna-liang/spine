import { Book } from '@/types/books';
import BookListItem from '../listItem/bookListItem';

export default function BookList({ books }: { books: Book[] }) {
  return (
    <div>
      {books.map((book) => {
        return (
          <div key={book.id}>
            <BookListItem book={book} />
          </div>
        );
      })}
    </div>
  );
}
