import axios from 'axios';

export const fetchBooksFromGoogle = async (query: string) => {
  try {
    const response = await axios.get(
      `${process.env.GOOGLE_BOOKS_API_URI}/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10&key=${process.env.GOOGLE_BOOKS_DEV_API_KEY}`,
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchBookById = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.GOOGLE_BOOKS_API_URI}/v1/volumes/${id}?key=${process.env.GOOGLE_BOOKS_DEV_API_KEY}`,
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};
