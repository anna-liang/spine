import { useQuery } from '@tanstack/react-query'
import { getRecommendationsForShelf } from '@/api/recommendationsService'

export const useRecommendationsShelf = ({ shelfId }: { shelfId?: string }) => {
    return useQuery({
        queryKey: shelfId ? ['recommendations', 'shelf', shelfId] : ['recommendations', 'shelf', 'empty'],
        queryFn: () => getRecommendationsForShelf({ shelfId: shelfId! }),
        enabled: !!shelfId,
        staleTime: 5 * 60000
    })
}
