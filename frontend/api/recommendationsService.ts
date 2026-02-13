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
        console.log('returned recommendations', res.data)
        return res.data

    } catch (err) {
        throw err
    }
};

export const getRecommendationsForBook = async () => {
    try {
        const cookieHeader = (await cookies()).toString();
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_DEV_API_URL}/recommendations/book`, {
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

export const getRecommendationsForShelf = async () => {
    try {
        const cookieHeader = (await cookies()).toString();
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_DEV_API_URL}/recommendations/shelf`, {
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