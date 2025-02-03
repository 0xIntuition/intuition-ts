import { fetchRelicPoints } from '@lib/services/relics'
import { useQuery } from '@tanstack/react-query'

export function useRelicPoints(address?: string) {
  console.log('useRelicPoints hook called with address:', address)
  return useQuery({
    queryKey: ['get-relic-points', { address }],
    queryFn: () => {
      console.log('Query function executing with address:', address)
      return fetchRelicPoints(address || '')
    },
    enabled: !!address,
  })
}
