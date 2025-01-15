import { CreateTripleLoaderData } from '@routes/resources+/create-triple'
import { useQuery } from '@tanstack/react-query'

export function useCreateTripleConfig() {
  return useQuery<CreateTripleLoaderData>({
    queryKey: ['create-triple-config'],
    queryFn: async () => {
      const response = await fetch('/resources/create-claim')
      if (!response.ok) {
        throw new Error('Failed to fetch create claim config')
      }
      return response.json()
    },
  })
}
