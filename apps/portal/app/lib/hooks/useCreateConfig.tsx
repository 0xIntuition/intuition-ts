import {
  getAtomConfig,
  getAtomCost,
  getFees,
  getGeneralConfig,
  getTripleCost,
} from '@server/multivault'
import { useQuery } from '@tanstack/react-query'

export type CreateConfigData = {
  vaultId: string
  atomCost: string
  atomCreationFee: string
  tripleCost: string
  protocolFee: string
  entryFee: string
  feeDenominator: string
  minDeposit: string
}

export function useCreateConfig() {
  return useQuery<CreateConfigData>({
    queryKey: ['create-config'],
    queryFn: async () => {
      const [
        atomCost,
        tripleCost,
        [, atomCreationFee],
        [entryFee, , protocolFee],
        [, , feeDenominator, minDeposit],
      ] = await Promise.all([
        getAtomCost(),
        getTripleCost(),
        getAtomConfig(),
        getFees(),
        getGeneralConfig(),
      ])

      return {
        vaultId: '0',
        atomCost: atomCost.toString(),
        tripleCost: tripleCost.toString(),
        atomCreationFee: atomCreationFee.toString(),
        protocolFee: protocolFee.toString(),
        entryFee: entryFee.toString(),
        feeDenominator: feeDenominator.toString(),
        minDeposit: minDeposit.toString(),
      }
    },
  })
}
