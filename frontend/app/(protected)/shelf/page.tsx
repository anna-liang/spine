"use client"
import { createShelf } from "@/api/libraryService";
import { ShelfPrivacy } from "@/types/library";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [privacy, setPrivacy] = useState<ShelfPrivacy>(ShelfPrivacy.PRIVATE)
  const [error, setError] = useState('')

  const handleCreateShelf = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createShelf({ name, description, privacy })

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err)
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
    <div>
      <form onSubmit={handleCreateShelf}>
        <label>Name:</label><input name="name" value={name} type="text" onChange={(e) => setName(e.target.value)} required/>
        <label>Description:</label><input name="description" value={description} onChange={(e) => setDescription(e.target.value)} required={false}/>
        <label>Privacy:</label>
        <select name="privacy" value={privacy} onChange={(e) => setPrivacy(e.target.value as ShelfPrivacy)} required>
          <option value={ShelfPrivacy.PRIVATE}>{ShelfPrivacy.PRIVATE}</option>
          <option value={ShelfPrivacy.PUBLIC}>{ShelfPrivacy.PUBLIC}</option>
        </select>
        <button type="submit">Create Shelf</button>
      </form>
      { error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
