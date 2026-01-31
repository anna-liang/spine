import axios from 'axios';

export const fetchBooksFromGoogle = async (query: string) => {
  try {
    const response = await axios.get(
      `${process.env.GOOGLE_BOOKS_API_URI}${encodeURIComponent(query)}&maxResults=10&key=${process.env.GOOGLE_BOOKS_DEV_API_KEY}`,
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
