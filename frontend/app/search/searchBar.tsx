"use client"

import { InputGroup } from "@heroui/react";
import { SearchSm } from '@untitledui/icons'

interface SearchBarProps {
  handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  query: string,
}

export default function SearchBar({ handleSearch, handleOnChange, query }: SearchBarProps) {
  return (
    <div>
      <div className="flex h-30 w-80 items-center justify-center">
        <InputGroup fullWidth variant='primary' className='text-grey-400 bg-transparent rounded-sm'>
          <InputGroup.Input placeholder="Search books..." value={query} onChange={handleOnChange} onKeyDown={handleSearch} />
          <InputGroup.Suffix>
            <SearchSm className='size-5' />
          </InputGroup.Suffix>
        </InputGroup>
      </div>
    </div>
  );
}
