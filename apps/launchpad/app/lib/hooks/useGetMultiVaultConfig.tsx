import { GET_MULTIVAULT_CONFIG_RESOURCE_ROUTE } from '@consts/general'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { MultivaultConfig } from 'app/types'

// Define a constant for the query key to ensure consistency
export const MULTIVAULT_CONFIG_QUERY_KEY = 'get-multivault-config'

export function useGetMultiVaultConfig(
  contract: string,
  options?: Partial<UseQueryOptions<MultivaultConfig>>,
) {
  return useQuery<MultivaultConfig>({
    queryKey: [MULTIVAULT_CONFIG_QUERY_KEY, contract],
    queryFn: async () => {
      const requestId = Math.random().toString(36).substring(7)
      console.log(
        `[useGetMultiVaultConfig] Fetching config for ${contract} (request: ${requestId})`,
      )

      const url = `${GET_MULTIVAULT_CONFIG_RESOURCE_ROUTE}?contract=${contract}`

      const response = await fetch(url)
      if (!response.ok) {
        console.error(
          `[useGetMultiVaultConfig] Error fetching config (request: ${requestId})`,
        )
        throw new Error('Failed to fetch multivault config')
      }

      console.log(
        `[useGetMultiVaultConfig] Successfully fetched config for ${contract} (request: ${requestId})`,
      )
      return response.json()
    },
    // Set staleTime to 5 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
    // Don't refetch on mount since we're prefetching in the route loaders
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    // Add retry for better error handling
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    enabled: options?.enabled !== undefined ? options.enabled : true,
    ...options,
  })
}
