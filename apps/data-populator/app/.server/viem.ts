import { multivaultAbi } from '@lib/abis/multivault'
import { transportsMap } from '@lib/utils/chains'
import { CURRENT_ENV, MULTIVAULT_CONTRACT_ADDRESS } from 'app/consts'
import { createPublicClient, getContract, PublicClient, type Abi } from 'viem'
import { base, baseSepolia } from 'viem/chains'

export const publicClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: CURRENT_ENV === 'development' ? baseSepolia : base,
  transport:
    CURRENT_ENV === 'development'
      ? transportsMap(baseSepolia.id)
      : transportsMap(base.id),
}) as PublicClient

export const getMultivaultContract = getContract({
  address: MULTIVAULT_CONTRACT_ADDRESS as `0x${string}`,
  abi: multivaultAbi as Abi,
  client: {
    public: publicClient,
  },
})

export const createMultiVaultContract = (contractAddress: string) =>
  ({
    address: contractAddress as `0x${string}`,
    abi: multivaultAbi as Abi,
  }) as const
