import { DEFAULT_CHAIN_ID, MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { formatBalance } from '@lib/utils/misc'
import { useQuery } from '@tanstack/react-query'

import { useMultivaultContract } from './useMultivaultContract'

interface AtomCostResult {
  raw: bigint
  formatted: string
}

export function useAtomCost() {
  const contract = useMultivaultContract(
    MULTIVAULT_CONTRACT_ADDRESS,
    DEFAULT_CHAIN_ID,
  )

  return useQuery<AtomCostResult>({
    queryKey: ['atomCost'],
    queryFn: async () => {
      if (!contract) {
        throw new Error('Contract not initialized')
      }

      try {
        const cost = (await contract.read.getAtomCost()) as bigint
        return {
          raw: cost,
          formatted: formatBalance(cost, 18),
        }
      } catch (error) {
        console.error('Error fetching atom cost:', error)
        throw error
      }
    },
    enabled: !!contract,
  })
}
