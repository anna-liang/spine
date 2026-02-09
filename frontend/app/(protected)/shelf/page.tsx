"use client"
import { ShelfPrivacy } from "@/types/library";
import { useState } from "react";
import { useShelves } from "@/app/queries/useShelves";
import { useShelf } from "@/app/queries/useShelf";
import { useCreateShelf } from "@/app/queries/useCreateShelf";
import { useUpdateShelf } from "@/app/queries/useUpdateShelf";
import { useQueryClient } from "@tanstack/react-query";
import { useAddBookToShelf } from "@/app/queries/useAddBookToShelf";
import { useRecommendations } from "@/app/queries/useRecommendations";

export default function Page() {
  const queryClient = useQueryClient()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [privacy, setPrivacy] = useState<ShelfPrivacy>(ShelfPrivacy.PRIVATE)
  const [error, setError] = useState('')
  const getShelves = useShelves()
  const createShelf = useCreateShelf()
  const updateShelf = useUpdateShelf()
  const addBookToShelf = useAddBookToShelf()
  const [shelfId, setShelfId] = useState('')
  const { data } = useShelf({ id: shelfId || undefined })
  const getRecommendations = useRecommendations()

  const handleCreateShelf = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      createShelf.mutate({ name, description, privacy })

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
        setError(err.message);
      } else {
        console.error(err)
        setError(`Unknown Error: ${err}`)
      }
    }
  }

  const handleUpdateShelf = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // await updateShelf({ name, description, privacy, id: '3eac5ad2-c2de-4348-8231-398f273e7f33' })
      updateShelf.mutate({ name, description, privacy, id: '3eac5ad2-c2de-4348-8231-398f273e7f33' })
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
        setError(err.message);
      } else {
        console.error(err)
        setError(`Unknown Error: ${err}`)
      }
    }
  }

  const handleGetShelves = async () => {
    try {
      await getShelves.refetch()
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
        setError(err.message);
      } else {
        console.error(err)
        setError(`Unknown Error: ${err}`)
      }
    }
  }

  const handleGetShelf = async () => {
    try {
      setShelfId('3eac5ad2-c2de-4348-8231-398f273e7f33')
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
        setError(err.message);
      } else {
        console.error(err)
        setError(`Unknown Error: ${err}`)
      }
    }
  }

  const handleSaveBook = () => {
    addBookToShelf.mutate({ shelfId: 'aaa96763-e8c5-4d03-aef1-83590ca0590e', bookId: 'nZk0AgAAQBAJ' })
  }

  const printQueryKeys = () => {
    const queries = queryClient.getQueryCache().getAll()
    console.log('Current queries:')
    queries.forEach(q => console.log(q.queryKey))
  }

  const handleGetRecommendations = async () => {
    try {
      await getRecommendations.refetch()
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
        setError(err.message);
      } else {
        console.error(err)
        setError(`Unknown Error: ${err}`)
      }
    }
  }
  // TODO: form validation and error handling
  return (
    <div className="flex flex-col">
      <button onClick={handleGetRecommendations}>Get Recommendations</button>
      <button onClick={printQueryKeys}>Print Query Keys</button>
      <p>CREATE SHELF:</p>
      <form onSubmit={handleCreateShelf}>
        <label>Name:</label><input name="name" value={name} type="text" onChange={(e) => setName(e.target.value)} required />
        <label>Description:</label><input name="description" value={description} onChange={(e) => setDescription(e.target.value)} required={false} />
        <label>Privacy:</label>
        <select name="privacy" value={privacy} onChange={(e) => setPrivacy(e.target.value as ShelfPrivacy)} required>
          <option value={ShelfPrivacy.PRIVATE}>{ShelfPrivacy.PRIVATE}</option>
          <option value={ShelfPrivacy.PUBLIC}>{ShelfPrivacy.PUBLIC}</option>
        </select>
        <button type="submit">Create Shelf</button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      <button onClick={handleGetShelves}>GET ALL SHELVES</button>
      <button onClick={handleGetShelf}>GET SHELF</button>
      <button onClick={handleSaveBook}>SAVE BOOK</button>
      <p>UPDATE SHELF:</p>
      <form onSubmit={handleUpdateShelf}>
        <label>Name:</label><input name="name" value={name} type="text" onChange={(e) => setName(e.target.value)} required={false} />
        <label>Description:</label><input name="description" value={description} onChange={(e) => setDescription(e.target.value)} required={false} />
        <label>Privacy:</label>
        <select name="privacy" value={privacy} onChange={(e) => setPrivacy(e.target.value as ShelfPrivacy)} required>
          <option value={ShelfPrivacy.PRIVATE}>{ShelfPrivacy.PRIVATE}</option>
          <option value={ShelfPrivacy.PUBLIC}>{ShelfPrivacy.PUBLIC}</option>
        </select>
        <button type="submit">Update Shelf</button>
      </form>
    </div>
  );
}
