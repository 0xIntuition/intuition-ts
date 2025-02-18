import { useQuery } from '@tanstack/react-query'

interface Epoch {
  id: number
  name: string
  description: string
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export function useGetCurrentEpoch() {
  return useQuery<{ epoch: Epoch | null }>({
    queryKey: ['current-epoch'],
    queryFn: async () => {
      const response = await fetch('/resources/get-current-epoch')
      if (!response.ok) {
        throw new Error('Failed to fetch current epoch')
      }
      return response.json()
    },
  })
}
