import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShelf } from '@/api/libraryService'
import { shelvesKey } from './shelvesKey'

export const useCreateShelf = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createShelf,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: shelvesKey.lists(),
            })
        },
    })
}
