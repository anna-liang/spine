import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateShelf } from '@/api/libraryService'
import { shelvesKey } from './shelvesKey'
import { ShelfPrivacy } from '@/types/library'

export const useUpdateShelf = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            name,
            description,
            privacy
        }: {
            id: string
            name: string,
            description?: string,
            privacy: ShelfPrivacy
        }) => updateShelf({ id, name, description, privacy }),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({
                queryKey: shelvesKey.detail(id),
            })
            queryClient.invalidateQueries({
                queryKey: shelvesKey.lists(),
            })
        },
    })
}
