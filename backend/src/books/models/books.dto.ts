export interface GoogleVolume {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    mainCategory: string;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    contentVersion: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
}

export interface GoogleSearchVolumesResponse {
  kind: string;
  totalItems: number;
  items: GoogleVolume[];
}
