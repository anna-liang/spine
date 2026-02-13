import { useQuery } from '@tanstack/react-query'
import { getRecommendationsForUser } from '@/api/recommendationsService'

export const useRecommendationsUser = () => {
    return useQuery({
        queryKey: ['recommendations', 'user'],
        queryFn: getRecommendationsForUser,
        staleTime: 5 * 60000
    })
}
