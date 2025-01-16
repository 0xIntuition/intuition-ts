import { CreateTripleLoaderData } from '@routes/resources+/create-triple'
import { useQuery } from '@tanstack/react-query'

export function useCreateTripleConfig() {
  return useQuery<CreateTripleLoaderData>({
    queryKey: ['create-triple-config'],
    queryFn: async () => {
      const response = await fetch('/resources/create-triple')
      if (!response.ok) {
        throw new Error('Failed to fetch create triple config')
      }
      return response.json()
    },
  })
}
