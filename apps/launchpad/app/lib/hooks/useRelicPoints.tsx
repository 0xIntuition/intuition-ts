import { useQuery } from '@tanstack/react-query'

export function useRelicPoints(address?: string) {
  return useQuery({
    queryKey: ['get-relic-points', address?.toLowerCase()],
    queryFn: async () => {
      if (!address) {
        return null
      }
      const response = await fetch(
        `/resources/get-relic-points?address=${address.toLowerCase()}`,
      )
      const data = await response.json()
      return data.relic_points
    },
    enabled: !!address,
    // This ensures we don't refetch on mount if we already have the data
    staleTime: 30000, // Consider data fresh for 30 seconds
  })
}
