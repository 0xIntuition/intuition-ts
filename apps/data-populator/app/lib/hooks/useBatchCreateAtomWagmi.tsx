import { CURRENT_ENV } from '@consts/general'
import { getChainEnvConfig } from '@lib/utils/environment'
import { GetContractReturnType } from 'viem'

import { useContractWriteAndWait } from './useContractWriteAndWait'
import { useMultivaultContract } from './useMultivaultContract'

export const useBatchCreateAtomWagmi = () => {
  const multivault = useMultivaultContract(
    getChainEnvConfig(CURRENT_ENV).chainId.toString(),
  ) as GetContractReturnType

  return useContractWriteAndWait({
    ...multivault,
    // @ts-ignore TODO: Fix type for useContractWriteAndWait
    functionName: 'batchCreateAtom',
  })
}
