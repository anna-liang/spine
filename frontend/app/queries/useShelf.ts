import { useQuery } from '@tanstack/react-query'
import { getShelf } from '@/api/libraryService'
import { shelvesKey } from './shelvesKey'

export const useShelf = ({ id }: { id?: string }) => {
    return useQuery({
        queryKey: id ? shelvesKey.detail(id) : ['collections', 'details', 'empty'],
        queryFn: () => getShelf({ id: id! }),
        enabled: !!id,
        staleTime: 5 * 60000,
    })
}
