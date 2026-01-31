import { Book } from '@/types/books';
import Image from 'next/image';
import Link from 'next/link';
import { formatAuthors } from '@/utils/helpers';

export default function BookListItem({ book }: { book: Book }) {
  return (
    <Link key={book.id} href={`/book/${book.id}`}>
      <h1>{book.title}</h1>
      <h3>{formatAuthors(book.authors)}</h3>
      {book.image && (
        <Image src={book.image} alt={book.title} width={100} height={100} />
      )}
    </Link>
  );
}
