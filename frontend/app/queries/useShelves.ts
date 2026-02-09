import { useQuery } from '@tanstack/react-query'
import { getShelves } from '@/api/libraryService'
import { shelvesKey } from './shelvesKey'

export const useShelves = () => {
    return useQuery({
        queryKey: shelvesKey.lists(),
        queryFn: getShelves,
        staleTime: 5 * 60000
    })
}
