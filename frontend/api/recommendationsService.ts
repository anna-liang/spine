"use server"
import { cookies } from "next/headers";
import axios from "axios";

export const getRecommendationsForUser = async () => {
    try {
        const cookieHeader = (await cookies()).toString();
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_DEV_API_URL}/recommendations/user`, {
            headers: {
                cookie: cookieHeader,
            },
            withCredentials: true
        }
        );
        return res.data

    } catch (err) {
        throw err
    }
};

export const getRecommendationsForBook = async ({ bookId }: { bookId: string }) => {
    try {
        const cookieHeader = (await cookies()).toString();
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_DEV_API_URL}/recommendations/book/${bookId}`, {
            headers: {
                cookie: cookieHeader,
            },
            withCredentials: true
        }
        );
        return res.data

    } catch (err) {
        throw err
    }
};

export const getRecommendationsForShelf = async ({ shelfId }: { shelfId: string }) => {
    try {
        const cookieHeader = (await cookies()).toString();
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_DEV_API_URL}/recommendations/shelf/${shelfId}`, {
            headers: {
                cookie: cookieHeader,
            },
            withCredentials: true
        }
        );
        console.log('returned recommendations', res.data)
        return res.data

    } catch (err) {
        throw err
    }
};