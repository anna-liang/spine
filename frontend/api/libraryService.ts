"use server"

import { ShelfPrivacy } from "@/types/library";
import { cookies } from "next/headers";
import axios from "axios";

export const createShelf = async ({name, description, privacy}: {name: string, description?: string, privacy: ShelfPrivacy}) => {
    try {
        const cookieHeader = (await cookies()).toString();
        const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DEV_API_URL}/shelves`, {
            name, description, privacy
        }, {
            headers: {
                cookie: cookieHeader,
            },
            withCredentials: true
        }
        );
        console.log('returned shelf', res.data)
        return res.data
        
    } catch (err) {
        console.log("ERROR IN SERVICE", err)
        throw err
  }
};