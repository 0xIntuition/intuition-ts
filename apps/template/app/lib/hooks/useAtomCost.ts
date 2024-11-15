import { useQuery } from '@tanstack/react-query'
import { formatEther } from 'viem'
import { useMultivaultContract } from './useMultivaultContract'
import { MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { baseSepolia } from 'viem/chains'
import { formatBalance, formatDisplayBalance } from '@lib/utils/misc'

interface AtomCostResult {
  raw: bigint
  formatted: string
}

export function useAtomCost() {
  const contract = useMultivaultContract(MULTIVAULT_CONTRACT_ADDRESS, baseSepolia.id)

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
