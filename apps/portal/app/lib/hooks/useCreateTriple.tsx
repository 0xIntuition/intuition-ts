import { CURRENT_ENV } from 'consts'
import type { GetContractReturnType } from 'viem'

import { getChainEnvConfig } from '../utils/environment'
import { useContractWriteAndWait } from './useContractWriteAndWait'
import { useMultivaultContract } from './useMultivaultContract'

export const useCreateTriple = () => {
  const multivault = useMultivaultContract(
    getChainEnvConfig(CURRENT_ENV).chainId.toString(),
  ) as GetContractReturnType

  return useContractWriteAndWait({
    ...multivault,
    // @ts-ignore TODO: Fix type for useContractWriteAndWait
    functionName: 'createTriple',
  })
}
