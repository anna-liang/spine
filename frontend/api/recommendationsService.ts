"use server"
import { cookies } from "next/headers";
import axios from "axios";

export const getRecommendations = async () => {
    try {
        const cookieHeader = (await cookies()).toString();
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_DEV_API_URL}/recommendations`, {
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