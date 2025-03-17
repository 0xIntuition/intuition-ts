import { useQuery } from '@tanstack/react-query'

export function usePoints(accountId?: string) {
  return useQuery({
    queryKey: ['get-points', accountId?.toLowerCase()],
    queryFn: async () => {
      if (!accountId) {
        return null
      }
      const response = await fetch(
        `/resources/get-points?accountId=${accountId.toLowerCase()}`,
      )
      const data = await response.json()
      return data.points
    },
    enabled: !!accountId,
    // This ensures we don't refetch on mount if we already have the data
    staleTime: 30000, // Consider data fresh for 30 seconds
  })
}
