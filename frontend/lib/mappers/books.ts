import { GoogleVolume } from '@/types/external/googleBooks';
import { Book } from '@/types/books';

export function mapGoogleVolumeToBook(volume: GoogleVolume): Book {
  const book: Book = {
    id: volume.id,
    title: volume.volumeInfo.title,
    authors: volume.volumeInfo.authors ?? [],
    publisher: volume.volumeInfo.publisher,
    publishedDate: volume.volumeInfo.publishedDate,
    description: volume.volumeInfo.description,
    pageCount: volume.volumeInfo.pageCount,
    mainCategory: volume.volumeInfo.mainCategory,
    categories: volume.volumeInfo.categories,
    averageRating: volume.volumeInfo.averageRating,
    ratingsCount: volume.volumeInfo.averageRating,
    image: volume.volumeInfo.imageLinks
      ? volume.volumeInfo.imageLinks.thumbnail
      : '',
    previewLink: volume.volumeInfo.previewLink,
  };
  return book;
}
