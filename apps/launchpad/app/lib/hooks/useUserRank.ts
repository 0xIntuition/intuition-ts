import { useQuery } from '@tanstack/react-query'

interface UserRank {
  rank: number
  totalUsers: number
}

export function useUserRank(address?: string) {
  return useQuery({
    queryKey: ['get-user-rank', address?.toLowerCase()],
    queryFn: async () => {
      if (!address) {
        return null
      }

      const response = await fetch(
        `/resources/get-user-rank?address=${address.toLowerCase()}`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch user rank')
      }

      const data = await response.json()
      return data as UserRank
    },
    enabled: !!address,
    staleTime: 30000, // Consider data fresh for 30 seconds
  })
}
