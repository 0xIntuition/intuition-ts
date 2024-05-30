import type { GetContractReturnType } from 'viem'

import { CURRENT_ENV } from '../utils/constants'
import { getChainEnvConfig } from '../utils/environment'
import { useContractWriteAndWait } from './useContractWriteAndWait'
import { useMultivaultContract } from './useMultivaultContract'

export const useCreateIdentity = () => {
  const multivault = useMultivaultContract(
    getChainEnvConfig(CURRENT_ENV).chainId.toString(),
  ) as GetContractReturnType

  return useContractWriteAndWait({
    ...multivault,
    functionName: 'createAtom',
  })
}
