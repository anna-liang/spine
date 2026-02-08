"use client"
import { addBookToShelf, getShelf, updateShelf } from "@/api/libraryService";
import { ShelfPrivacy } from "@/types/library";
import { useState } from "react";
import { useShelves } from "@/app/queries/useShelves";
import { useCreateShelf } from "@/app/queries/useCreateShelf";

export default function Page() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [privacy, setPrivacy] = useState<ShelfPrivacy>(ShelfPrivacy.PRIVATE)
  const [error, setError] = useState('')
  const { data } = useShelves()
  console.log('shelves', data)
  const createCollection = useCreateShelf()

  const handleCreateShelf = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      createCollection.mutate({ name, description, privacy })

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
      await updateShelf({ name, description, privacy, id: '3eac5ad2-c2de-4348-8231-398f273e7f33' })

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
      // const { data } = await getShelves.refetch()
      // console.log('get shelves', data)
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
      await getShelf({ id: '3eac5ad2-c2de-4348-8231-398f273e7f33' })
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

  const handleSaveBook = async () => {
    await addBookToShelf({ shelfId: '3eac5ad2-c2de-4348-8231-398f273e7f33', bookId: 'nZk0AgAAQBAJ' })
  }
  // TODO: form validation and error handling
  return (
    <div className="flex flex-col">
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
