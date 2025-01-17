import { useQuery } from '@tanstack/react-query'

export function usePoints(accountId?: string) {
  return useQuery({
    queryKey: ['account-points', accountId],
    queryFn: async () => {
      if (!accountId) {
        return null
      }
      const response = await fetch(
        `/resources/get-points?accountId=${accountId}`,
      )
      const data = await response.json()
      return data.points
    },
    enabled: !!accountId,
  })
}
