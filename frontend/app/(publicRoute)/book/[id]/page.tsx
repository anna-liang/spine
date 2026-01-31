import { searchBookById } from '@/api/booksService';
import { formatAuthors } from '@/utils/helpers';
import Image from 'next/image';

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = await searchBookById(id);

  return (
    <div className="flex flex-col items-center justify-center">
      {book.title}
      <span>{formatAuthors(book.authors)}</span>
      {book.image && (
        <Image src={book.image} alt={book.title} width={100} height={100} />
      )}
      <div>{book.description}</div>
    </div>
  );
}
