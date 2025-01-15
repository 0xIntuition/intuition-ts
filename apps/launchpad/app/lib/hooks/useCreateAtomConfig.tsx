import { useQuery } from '@tanstack/react-query'

export type CreateAtomConfigData = {
  vaultId: string
  atomCost: string
  atomCreationFee: string
  tripleCost: string
  protocolFee: string
  entryFee: string
  feeDenominator: string
  minDeposit: string
}

export function useCreateAtomConfig() {
  return useQuery<CreateAtomConfigData>({
    queryKey: ['create-config'],
    queryFn: async () => {
      const response = await fetch('/resources/create')
      if (!response.ok) {
        throw new Error('Failed to fetch create config')
      }
      return response.json()
    },
  })
}
