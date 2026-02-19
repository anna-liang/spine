import type { GoogleVolume } from "../../books/models/books.dto.ts";
import type { Book } from "../../books/models/book.models.ts";

const splitCategories = (categories: string[]): string[] => {
    let splitCategories: string[] = []
    if (categories && categories.length !== 0) {
        categories.map((category) => {
            splitCategories = splitCategories.concat(category.split('/').map((item) => item.trim()))
        })
    }
    const uniqueCategories = [...new Set(splitCategories)]
    return uniqueCategories
}

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
        categories: splitCategories(volume.volumeInfo.categories),
        averageRating: volume.volumeInfo.averageRating,
        ratingsCount: volume.volumeInfo.ratingsCount,
        image: volume.volumeInfo.imageLinks
            ? volume.volumeInfo.imageLinks.thumbnail
            : '',
        previewLink: volume.volumeInfo.previewLink,
        language: volume.volumeInfo.language,
        infoLink: volume.volumeInfo.infoLink,
        saleability: volume.saleInfo.saleability,
        listPrice: volume.saleInfo.listPrice ?? {},
        retailPrice: volume.saleInfo.retailPrice ?? {},
        buyLink: volume.saleInfo.buyLink ?? ''
    };
    return book;
}