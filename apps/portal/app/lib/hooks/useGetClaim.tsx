import { GetClaimLoaderData } from '@routes/resources+/get-claim'
import { useQuery } from '@tanstack/react-query'

export function useGetClaim(vaultId?: string) {
  return useQuery<GetClaimLoaderData>({
    queryKey: ['get-claim', vaultId],
    queryFn: async () => {
      if (!vaultId) {
        throw new Error('No vault ID provided')
      }
      const response = await fetch(`/resources/get-claim?vaultId=${vaultId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch claim')
      }
      return response.json()
    },
    enabled: Boolean(vaultId),
  })
}
