import axios from 'axios';
import { cookies } from 'next/headers';

export const getUser = async () => {
  const cookieHeader = (await cookies()).toString();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_DEV_API_URL}/auth/me`,
    {
      headers: {
        cookie: cookieHeader,
      },
    },
  );

  if (res.status !== 200) {
    throw new Error('Failed to fetch user');
  }

  const data = Object.keys(res.data).length === 0 ? undefined : res.data;
  return data;
};
