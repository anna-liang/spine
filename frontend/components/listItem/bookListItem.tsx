import { Book } from '@/types/books';
import Image from 'next/image';

export default function BookListItem({ book }: { book: Book }) {
  const formatAuthors = (authors: string[]) => authors.join(', ');

  return (
    <div key={book.id}>
      <h1>{book.title}</h1>
      <h3>{formatAuthors(book.authors)}</h3>
      {book.image && (
        <Image src={book.image} alt={book.title} width={100} height={100} />
      )}
    </div>
  );
}
