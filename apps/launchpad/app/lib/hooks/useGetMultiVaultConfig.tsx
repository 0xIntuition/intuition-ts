import { GET_MULTIVAULT_CONFIG_RESOURCE_ROUTE } from '@consts/general'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { MultivaultConfig } from 'app/types'

export function useGetMultiVaultConfig(
  contract: string,
  options?: Partial<UseQueryOptions<MultivaultConfig>>,
) {
  return useQuery<MultivaultConfig>({
    queryKey: ['get-multivault-config', contract],
    queryFn: async () => {
      const url = `${GET_MULTIVAULT_CONFIG_RESOURCE_ROUTE}?contract=${contract}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch multivault config')
      }
      return response.json()
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    enabled: options?.enabled !== undefined ? options.enabled : true,
    ...options,
  })
}
