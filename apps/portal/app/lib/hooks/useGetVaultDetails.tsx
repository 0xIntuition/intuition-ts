import { GET_VAULT_DETAILS_RESOURCE_ROUTE } from '@consts/general'
import { useQuery } from '@tanstack/react-query'
import { VaultDetailsType } from 'app/types'

export function useGetVaultDetails(contract: string, vaultId: string) {
  return useQuery<VaultDetailsType>({
    queryKey: ['get-vault-details'],
    queryFn: async () => {
      const response = await fetch(
        `${GET_VAULT_DETAILS_RESOURCE_ROUTE}?contract=${contract}&vaultId=${vaultId}`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch vault details')
      }
      return response.json()
    },
  })
}
