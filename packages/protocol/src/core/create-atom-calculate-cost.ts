import { Address, PublicClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'

export type CreateAtomCalculateBaseCost = {
  address: Address
  publicClient: PublicClient
}

export async function createAtomCalculateBaseCost(
  config: CreateAtomCalculateBaseCost,
) {
  const { address, publicClient } = config

  const wagmiContract = {
    address,
    abi: EthMultiVaultAbi,
  } as const

  const resp = await publicClient.multicall({
    contracts: [
      {
        ...wagmiContract,
        functionName: 'getAtomCost',
        args: [],
      },
      {
        ...wagmiContract,
        functionName: 'getTripleCost',
        args: [],
      },
      {
        ...wagmiContract,
        functionName: 'atomConfig',
        args: [],
      },
      {
        ...wagmiContract,
        functionName: 'tripleConfig',
        args: [],
      },
      {
        ...wagmiContract,
        functionName: 'vaultFees',
        args: [BigInt(0)],
      },
      {
        ...wagmiContract,
        functionName: 'generalConfig',
        args: [],
      },
    ],
  })

  console.log(resp[0], 'resp[0]resp[0]')

  const atomCost = resp[0].result as bigint
  const atomWalletInitialDepositAmount =
    (resp[2]?.result?.[0] as bigint) || BigInt(0)
  const atomCreationProtocolFee = (resp[2]?.result?.[1] as bigint) || BigInt(0)
  console.log(atomCost, 'atomCost')
  return atomCost + atomWalletInitialDepositAmount + atomCreationProtocolFee
}
