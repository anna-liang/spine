import { useQuery } from '@tanstack/react-query'
import { getShelves } from '@/api/libraryService'
import { shelvesKey } from './shelvesKey'

export const useShelves = () => {
    return useQuery({
        queryKey: shelvesKey.lists(),
        queryFn: getShelves,
        // enabled: false,
        // staleTime: 1000 * 60
    })
}
