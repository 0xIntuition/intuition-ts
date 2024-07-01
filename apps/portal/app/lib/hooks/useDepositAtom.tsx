import type { GetContractReturnType } from 'viem'

import { CURRENT_ENV } from '../utils/constants'
import { getChainEnvConfig } from '../utils/environment'
import { useContractWriteAndWait } from './useContractWriteAndWait'
import { useMultivaultContract } from './useMultivaultContract'

export const useDepositAtom = (contract: string) => {
  const multivault = useMultivaultContract(
    contract,
    getChainEnvConfig(CURRENT_ENV).chainId,
  ) as GetContractReturnType

  return useContractWriteAndWait({
    ...multivault,
    functionName: 'depositAtom', // since only working with Atoms in Memekek
  })
}
