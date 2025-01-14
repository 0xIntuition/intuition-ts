import { GET_VAULT_DETAILS_RESOURCE_ROUTE } from '@consts/general'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { VaultDetailsType } from 'app/types'

export function useGetVaultDetails(
  contract: string,
  vaultId: string,
  counterVaultId?: string,
  options?: Partial<UseQueryOptions<VaultDetailsType>>,
) {
  return useQuery<VaultDetailsType>({
    queryKey: ['get-vault-details', contract, vaultId, counterVaultId],
    queryFn: async () => {
      const url = counterVaultId
        ? `${GET_VAULT_DETAILS_RESOURCE_ROUTE}?contract=${contract}&vaultId=${vaultId}&counterVaultId=${counterVaultId}`
        : `${GET_VAULT_DETAILS_RESOURCE_ROUTE}?contract=${contract}&vaultId=${vaultId}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch vault details')
      }
      return response.json()
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    enabled: options?.enabled !== undefined ? options.enabled : true,
    ...options,
  })
}
