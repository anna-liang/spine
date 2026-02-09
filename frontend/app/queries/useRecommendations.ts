import { useQuery } from '@tanstack/react-query'
import { getRecommendations } from '@/api/recommendationsService'

export const useRecommendations = () => {
    return useQuery({
        queryKey: ['recommendations'],
        queryFn: getRecommendations,
        staleTime: 5 * 60000
    })
}
