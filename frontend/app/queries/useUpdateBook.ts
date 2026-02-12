import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBook } from '@/api/libraryService'
import { shelvesKey } from './shelvesKey'
import { BookStatus } from '@/types/library'

export const useUpdateBook = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            bookId,
            status,
            rating,
            readAt
        }: {
            bookId: string,
            status?: BookStatus,
            rating?: number,
            readAt?: string,
        }) => updateBook({ bookId, status, rating, readAt }),
        onSuccess: (_) => {
            queryClient.invalidateQueries({
                queryKey: shelvesKey.lists(),
            })
        },
    })
}
