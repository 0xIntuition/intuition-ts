import { CreateClaimLoaderData } from '@routes/resources+/create-claim'
import { useQuery } from '@tanstack/react-query'

export function useCreateClaimConfig() {
  return useQuery<CreateClaimLoaderData>({
    queryKey: ['create-claim-config'],
    queryFn: async () => {
      const response = await fetch('/resources/create-claim')
      if (!response.ok) {
        throw new Error('Failed to fetch create claim config')
      }
      return response.json()
    },
  })
}
