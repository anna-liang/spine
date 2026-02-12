"use server"

import { BookStatus, ShelfPrivacy } from "@/types/library";
import { cookies } from "next/headers";
import axios from "axios";

export const createShelf = async ({ name, description, privacy }: { name: string, description?: string, privacy: ShelfPrivacy }) => {
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
        return res.data

    } catch (err) {
        throw err
    }
};

export const updateShelf = async ({ name, description, privacy, id }: { name: string, description?: string, privacy: ShelfPrivacy, id: string }) => {
    try {
        const cookieHeader = (await cookies()).toString();
        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_DEV_API_URL}/shelves/${id}`, {
            name, description, privacy
        }, {
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

export const getShelves = async () => {
    try {
        const cookieHeader = (await cookies()).toString();
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_DEV_API_URL}/shelves`, {
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

export const getShelf = async ({ id }: { id: string }) => {
    try {
        const cookieHeader = (await cookies()).toString();
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_DEV_API_URL}/shelves/${id}`, {
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

export const addBookToShelf = async ({ shelfId, bookId }: { shelfId: string, bookId: string }) => {
    try {
        console.log(shelfId, bookId)
        const cookieHeader = (await cookies()).toString();
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_DEV_API_URL}/shelves/${shelfId}/books/${bookId}`, {}, {
            headers: {
                cookie: cookieHeader,
            },
            withCredentials: true
        }
        );
        console.log(res.data)
        return res.data

    } catch (err) {
        throw err
    }
};

export const updateBook = async ({ bookId, status, rating, readAt }: { bookId: string, status?: BookStatus, rating?: number, readAt?: string }) => {
    try {
        const cookieHeader = (await cookies()).toString();
        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_DEV_API_URL}/shelves/books/${bookId}`, {
            status, rating, readAt
        }, {
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