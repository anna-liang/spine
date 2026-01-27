export const fetchBooksFromGoogle = async (query: string) => {
  try {
    const response = await fetch(
      `${process.env.GOOGLE_BOOKS_API_URI}${encodeURIComponent(query)}&maxResults=10&key=${process.env.GOOGLE_BOOKS_DEV_API_KEY}`,
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
